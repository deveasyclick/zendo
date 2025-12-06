package config

import (
	"fmt"

	"github.com/caarlos0/env/v11"
	"github.com/joho/godotenv"
)

type Config struct {
	DB_URL string `env:"DB_URL,required"`
	PORT   int    `env:"PORT" envDefault:"5000"`
	Env    string `env:"ENV" envDefault:"development"`
	AppURL string `env:"APP_URL" envDefault:"http://localhost:3001"`
}

func LoadConfig() (*Config, error) {
	if err := godotenv.Load(); err != nil {
		return nil, err
	}

	cfg := Config{}

	err := env.Parse(&cfg) // 👈 Parse environment variables into `Config`
	if err != nil {
		return nil, fmt.Errorf("unable to parse ennvironment variables: %e", err)
	}
	return &cfg, nil
}
