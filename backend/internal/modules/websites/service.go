package agents

import (
	"context"

	"github.com/deveasyclick/zendo/backend/internal/db"
)

type Website interface {
	Create(ctx context.Context, args db.CreateWebsiteParams) (db.Website, error)
}

type service struct {
	q db.Queries
}

func NewService(q db.Queries) Website {
	return &service{
		q: q,
	}
}

func (s *service) Create(ctx context.Context, args db.CreateWebsiteParams) (db.Website, error) {
	return s.q.CreateWebsite(ctx, args)
}
