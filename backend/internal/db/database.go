package db

import (
	"context"

	"github.com/jackc/pgx/v5/pgxpool"
)

type DB struct {
	Pool    *pgxpool.Pool
	Queries *Queries
}

func NewDB(ctx context.Context, dbUrl string) (*DB, error) {
	pool, err := pgxpool.New(ctx, dbUrl)
	if err != nil {
		return nil, err
	}
	defer pool.Close()

	return &DB{Pool: pool, Queries: New(pool)}, nil
}
