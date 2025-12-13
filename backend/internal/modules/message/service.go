package message

import (
	"context"

	"github.com/deveasyclick/zendo/backend/internal/db"
)

type Service interface {
	CreateMessage(ctx context.Context, arg db.CreateMessageParams) (db.Message, error)
	ListMessagesByConversation(ctx context.Context, conversationID int32) ([]db.Message, error)
	DeleteMessage(ctx context.Context, id int32) error
}

type service struct {
	q *db.Queries
}

func NewService(q *db.Queries) *service {
	return &service{q: q}
}

func (s service) CreateMessage(ctx context.Context, arg db.CreateMessageParams) (db.Message, error) {
	return s.q.CreateMessage(ctx, arg)
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
