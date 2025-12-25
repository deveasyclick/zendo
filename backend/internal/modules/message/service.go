package message

import (
	"context"
	"database/sql"
	"errors"

	"github.com/deveasyclick/zendo/backend/internal/db"
	"github.com/deveasyclick/zendo/backend/internal/modules/conversation"
)

type Service interface {
	CreateMessage(ctx context.Context, dto CreateMessageDTO) (db.Message, error)
	ListMessagesByConversation(ctx context.Context, conversationID int32) ([]db.Message, error)
	DeleteMessage(ctx context.Context, id int32) error
}

type service struct {
	q                   *db.Queries
	conversationService conversation.Service
}

func NewService(q *db.Queries, conversationService conversation.Service) *service {
	return &service{q: q, conversationService: conversationService}
}

func (s service) CreateMessage(ctx context.Context, dto CreateMessageDTO) (db.Message, error) {
	var conversationID int32
	// Case 1: conversationId explicitly provided → validate it
	if dto.ConversationID != nil {
		exists, err := s.conversationService.CheckOpenConversationById(
			ctx,
			db.FindOpenConversationByIdParams{
				ID:        *dto.ConversationID,
				WebsiteID: &dto.WebsiteID,
			},
		)
		if err != nil && !errors.Is(err, sql.ErrNoRows) {
			return db.Message{}, err
		}

		if !exists {
			return db.Message{}, ErrConversationClosedOrNotFound
		}

		conversationID = *dto.ConversationID
	} else {
		// Case 2: no conversationId → find or create open conversation
		conversation, err := s.conversationService.FindOpenConversation(
			ctx,
			db.FindOpenConversationParams{
				WebsiteID: &dto.WebsiteID,
				VisitorID: &dto.VisitorID,
			},
		)

		if err != nil {
			if errors.Is(err, sql.ErrNoRows) {
				conversation, err = s.conversationService.CreateConversation(ctx, dto.VisitorID)
				if err != nil {
					return db.Message{}, err
				}
			} else {
				return db.Message{}, err
			}
		}

		conversationID = conversation.ID
	}

	// Resolve sender ID safely
	var senderID *string
	switch dto.SenderType {
	case "visitor":
		senderID = &dto.VisitorID

	case "agent":
		senderID = dto.AgentID

	case "bot":
		// senderID remains nil (system message)

	default:
		return db.Message{}, errors.New(ErrInvalidSenderType)

	}

	return s.q.CreateMessage(ctx, db.CreateMessageParams{
		ConversationID: conversationID,
		SenderType:     dto.SenderType,
		SenderID:       senderID,
		WebsiteID:      &dto.WebsiteID,
		Content:        dto.Content,
	})
}

func (s *service) GetMessage(ctx context.Context, id int32) (db.Message, error) {
	return s.q.GetMessage(ctx, id)
}

func (s *service) ListMessagesByConversation(
	ctx context.Context,
	conversationID int32,
) ([]db.Message, error) {
	return s.q.ListMessagesByConversation(ctx, conversationID)
}

func (s *service) DeleteMessage(ctx context.Context, id int32) error {
	return s.q.DeleteMessage(ctx, id)
}
