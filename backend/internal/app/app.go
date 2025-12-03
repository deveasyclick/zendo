package app

import (
	"context"
	"log"

	"github.com/deveasyclick/zendo/backend/internal/config"
	"github.com/deveasyclick/zendo/backend/internal/db"
)

type App struct {
	DB     *db.DB
	Config *config.Config
}

func New(ctx context.Context) (*App, error) {
	cfg, err := config.LoadConfig()
	if err != nil {
		log.Fatalf("Unable to load configuration: %v", err)
	}

	newDB, err := db.NewDB(ctx, cfg.DB_URL)
	if err != nil {
		log.Fatalf("Unable to connect to database: %v", err)
	}

	app := &App{
		Config: cfg,
		DB:     newDB,
	}

	return app, nil
}

func (a *App) Close() {
	a.DB.Pool.Close()
}
