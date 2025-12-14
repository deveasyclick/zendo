package message

import (
	"context"
	"fmt"

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
	return &service{q: q}
}

func (s service) CreateMessage(ctx context.Context, dto CreateMessageDTO) (db.Message, error) {
	conversationId := dto.ConversationID
	if conversationId != nil {
		exists, err := s.conversationService.CheckOpenConversationById(ctx, db.FindOpenConversationByIdParams{
			WebsiteID: &dto.WebsiteID,
		})

		if err != nil {
			return db.Message{}, err
		}

		if !exists {
			return db.Message{}, fmt.Errorf("conversation not found or closed")
		}
	}

	if dto.ConversationID == nil {
		conversation, err := s.conversationService.FindOpenConversation(ctx, db.FindOpenConversationParams{
			WebsiteID: &dto.WebsiteID,
			VisitorID: &dto.VisitorID,
		})
		if err != nil {
			return db.Message{}, err
		}

		if conversation.ID == 0 {
			conversation, err = s.conversationService.CreateConversation(ctx, dto.VisitorID)
			if err != nil {
				return db.Message{}, err
			}
		}
		conversationId = &conversation.ID
	}

	return s.q.CreateMessage(ctx, db.CreateMessageParams{
		ConversationID: *conversationId,
		SenderType:     dto.SenderType,
		SenderID:       &dto.VisitorID,
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
