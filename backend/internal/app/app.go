package app

import (
	"context"
	"fmt"

	"github.com/deveasyclick/zendo/backend/internal/config"
	"github.com/deveasyclick/zendo/backend/internal/db"
	"go.uber.org/zap"
)

type App struct {
	DB     *db.DB
	Config *config.Config
	Logger *zap.Logger
}

func New(ctx context.Context) (*App, error) {
	cfg, err := config.LoadConfig()
	if err != nil {
		return nil, fmt.Errorf("Unable to load configuration: %v", err)
	}

	newDB, err := db.NewDB(ctx, cfg.DB_URL)
	if err != nil {
		return nil, fmt.Errorf("Unable to connect to database: %v", err)
	}
	logger, err := zap.NewProduction()
	if err != nil {
		return nil, fmt.Errorf("Unable to create logger: %v", err)
	}

	err = db.AutoMigrate(cfg, logger)
	if err != nil {
		return nil, fmt.Errorf("Unable to apply migrations: %v", err)
	}

	app := &App{
		Config: cfg,
		DB:     newDB,
		Logger: logger,
	}

	return app, nil
}

func (a *App) Close() {
	a.DB.Pool.Close()
	a.Logger.Sync()
}
