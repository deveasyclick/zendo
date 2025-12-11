package db

import (
	"context"
	"database/sql"

	"github.com/deveasyclick/zendo/backend/internal/config"
	"github.com/jackc/pgx/v5/pgxpool"
	_ "github.com/jackc/pgx/v5/stdlib"
	"github.com/pressly/goose/v3"
	"go.uber.org/zap"
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

func AutoMigrate(cfg *config.Config, logger *zap.Logger) error {
	if cfg.Env != "production" {
		sqlDB, err := sql.Open("pgx", cfg.DB_URL)
		if err != nil {
			return err
		}
		defer sqlDB.Close()

		goose.SetDialect("postgres")
		if err := goose.Up(sqlDB, "migrations"); err != nil {
			return err
		}
		logger.Info("migrations applied successfully")
	} else {
		logger.Info("production environment: skipping automatic migrations")
	}
	return nil
}
