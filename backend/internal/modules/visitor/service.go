package visitor

import (
	"context"

	"github.com/deveasyclick/zendo/backend/internal/db"
)

type Service interface {
	CreateVisitor(ctx context.Context, dto CreateVisitorDTO) (db.Visitor, error)
}

type service struct {
	q *db.Queries
}

func NewService(q *db.Queries) *service {
	return &service{q: q}
}

func (s service) CreateVisitor(ctx context.Context, dto CreateVisitorDTO) (db.Visitor, error) {
	return s.q.CreateVisitor(ctx, db.CreateVisitorParams{
		IpAddress: &dto.IPAddress,
		State:     &dto.State,
		Country:   &dto.Country,
		WebsiteID: &dto.WebsiteID,
		UserAgent: &dto.UserAgent,
	})
}

func (s *service) GetVisitor(ctx context.Context, id string) (db.Visitor, error) {
	return s.q.GetVisitor(ctx, id)
}
