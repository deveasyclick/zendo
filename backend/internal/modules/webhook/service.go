package webhook

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"

	"github.com/deveasyclick/zendo/backend/internal/db"
	"github.com/deveasyclick/zendo/backend/internal/shared/constants"
	"github.com/deveasyclick/zendo/backend/pkg/svix"
	"github.com/go-viper/mapstructure/v2"
	"go.uber.org/zap"
)

type agentService interface {
	Create(ctx context.Context, args db.CreateAgentParams) (db.Agent, error)
	FindByEmail(ctx context.Context, email string) (db.Agent, error)
}

type service struct {
	agentSvc      agentService
	logger        *zap.Logger
	eventHandlers map[string]func(context.Context, map[string]interface{}) error
}

type WebhookService interface {
	VerifyWebhook(secret string, r *http.Request) (*WebhookEvent, error)
	HandleEvent(ctx context.Context, event *WebhookEvent) error
}

func NewService(as agentService, clerkauth clerkAuth, logger *zap.Logger) WebhookService {
	s := &service{agentSvc: as, clerkauth: clerkauth, logger: logger}

	s.eventHandlers = map[string]func(context.Context, map[string]interface{}) error{
		"user.created": s.createAdmin,
	}

	return s
}

func (s *service) HandleEvent(ctx context.Context, event *WebhookEvent) error {
	if handler, ok := s.eventHandlers[event.Type]; ok {
		return handler(ctx, event.Data)
	}

	s.logger.Info("Ignoring unknown webhook event type", zap.String("type", event.Type))
	return nil
}

func (s *service) createAdmin(ctx context.Context, data map[string]interface{}) error {
	var adminData ClerkUser
	if err := mapstructure.Decode(data, &adminData); err != nil {
		s.logger.Error("error decoding request body", zap.Error(err))
		return err
	}

	if len(adminData.EmailAddresses) <= 0 || adminData.EmailAddresses[0].EmailAddress == "" {
		s.logger.Error("email not found")
		return ErrEmailNotFoundInWebhook
	}

	email := adminData.EmailAddresses[0].EmailAddress

	admin, err := s.agentSvc.FindByEmail(ctx, email)
	if err != nil {
		s.logger.Error("error finding  admin", zap.String("email", email), zap.Error(err))
		return err
	}

	if admin.ID != 0 {
		s.logger.Error("admin already exists")
		return ErrAgentAlreadyExists
	}

	dbAgent, err := s.agentSvc.Create(ctx, db.CreateAgentParams{
		ClerkID: adminData.ID,
		Name:    fmt.Sprintf("%s %s", adminData.FirstName, adminData.LastName),
		Email:   email,
		Role:    string(constants.ROLEADMIN),
	})

	if err != nil {
		s.logger.Error("error creating admin in db", zap.String("admin id", adminData.ID), zap.Error(err))
		return err
	}

	s.logger.Info("admin created", zap.Int32("ID", dbAgent.ID))
	return nil
}

func (s *service) VerifyWebhook(secret string, r *http.Request) (*WebhookEvent, error) {
	wh, err := svix.GetWebhookVerifier(secret)
	if err != nil {
		return nil, err
	}

	// Read and validate the request body
	body, err := io.ReadAll(r.Body)
	if err != nil {
		return nil, err
	}

	defer r.Body.Close()

	// Create a new reader with the body for verification
	r.Body = io.NopCloser(bytes.NewBuffer(body))

	// Create headers for verification
	headers := http.Header{}
	headers.Set("svix-id", r.Header.Get("svix-id"))
	headers.Set("svix-timestamp", r.Header.Get("svix-timestamp"))
	headers.Set("svix-signature", r.Header.Get("svix-signature"))

	// Verify the webhook
	err = wh.Verify(body, headers)
	if err != nil {
		return nil, err
	}

	// Parse the webhook event
	event := WebhookEvent{}
	if err := json.Unmarshal(body, &event); err != nil {
		return nil, err
	}

	return &event, nil
}
