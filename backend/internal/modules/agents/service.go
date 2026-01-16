package agents

import (
	"context"

	"github.com/deveasyclick/zendo/backend/internal/db"
)

type Agent interface {
	Create(ctx context.Context, args db.CreateAgentParams) (db.Agent, error)
	FindByEmail(ctx context.Context, email string) (db.Agent, error)
}

type service struct {
	q db.Queries
}

func NewService(q db.Queries) Agent {
	return &service{
		q: q,
	}
}

func (s *service) Create(ctx context.Context, args db.CreateAgentParams) (db.Agent, error) {
	return s.q.CreateAgent(ctx, args)
}

func (s *service) FindByEmail(ctx context.Context, email string) (db.Agent, error) {
	return s.q.FindByEmail(ctx, email)
}
