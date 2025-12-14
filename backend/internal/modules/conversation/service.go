package conversation

import (
	"context"

	"github.com/deveasyclick/zendo/backend/internal/db"
)

type CreateChatInput struct {
	UserID  int64  `json:"user_id"`
	Message string `json:"message"`
}

type Service interface {
	CreateConversation(ctx context.Context, visitorID string) (db.Conversation, error)
	AssignAgent(ctx context.Context, convID int64, agentID int64) (db.Conversation, error)
	SetConversationStatus(ctx context.Context, convID int64, status string) error
	GetConversation(ctx context.Context, convID int64) (db.Conversation, error)
	FindOpenConversation(ctx context.Context, arg db.FindOpenConversationParams) (db.Conversation, error)
	ListOpenConversations(ctx context.Context) ([]db.Conversation, error)
	CheckOpenConversationById(ctx context.Context, arg db.FindOpenConversationByIdParams) (bool, error)
}

type service struct {
	q *db.Queries
}

func NewService(q *db.Queries) *service {
	return &service{q: q}
}

func (s *service) FindOpenConversation(ctx context.Context, arg db.FindOpenConversationParams) (db.Conversation, error) {
	return s.q.FindOpenConversation(ctx, db.FindOpenConversationParams{
		WebsiteID: arg.WebsiteID,
		VisitorID: arg.VisitorID,
	})
}

func (s *service) CheckOpenConversationById(ctx context.Context, arg db.FindOpenConversationByIdParams) (bool, error) {
	exists, err := s.q.FindOpenConversationById(ctx, arg)
	if err != nil {
		return false, err
	}

	return exists == 1, nil
}

func (s *service) CreateConversation(ctx context.Context, visitorID string) (db.Conversation, error) {
	return s.q.CreateConversation(ctx, &visitorID)
}

func (s *service) AssignAgent(ctx context.Context, convID int64, agentID int64) (db.Conversation, error) {
	return s.q.AssignAgent(ctx, db.AssignAgentParams{
		ID:      int32(convID),
		AgentID: &agentID,
	})
}

func (s *service) SetConversationStatus(ctx context.Context, convID int64, status string) error {
	return s.q.UpdateConversationStatus(ctx, db.UpdateConversationStatusParams{
		ID:     int32(convID),
		Status: status,
	})
}

func (s *service) GetConversation(ctx context.Context, convID int64) (db.Conversation, error) {
	return s.q.GetConversation(ctx, int32(convID))
}

func (s *service) ListOpenConversations(ctx context.Context) ([]db.Conversation, error) {
	return s.q.ListConversationsByStatus(ctx, "open")
}
