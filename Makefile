# Makefile for Zendo project
# --------------------------

MIGRATIONS_DIR := ./backend/migrations
BACKEND_DIR    := ./backend
FRONTEND_DIR   := ./frontend

DB_URL     ?= postgres://postgres:password@localhost:5432/zendo?sslmode=disable

.PHONY: dev api front back db lint swagger tools migrate-up migrate-down migrate-status migrate-new help

# ----------------------------------
# Main Targets
# ----------------------------------

# Start all services (DB + backend + frontend)
dev: db api front
	@echo "✅ All services running."

# Start Dockerized DB + Redis
db:
	docker compose up -d
	@echo "✅ Postgres and Redis are up."

# Start backend locally with live reload
api:
	cd $(BACKEND_DIR) && air
	@echo "✅ Go backend running with live reload."

# Start frontend apps
front:
	cd $(FRONTEND_DIR) && pnpm dev 
	@echo "✅ Frontend apps running."

# Lint backend
lint:
	cd $(BACKEND_DIR) && golangci-lint run
	@echo "✅ Go linting completed."

# Generate Swagger docs
swagger:
	cd $(BACKEND_DIR) && swag init --output docs --generalInfo cmd/zendo/main.go
	@echo "✅ Swagger docs generated."

# ----------------------------------
# Migrations
# ----------------------------------

migrate-up:
	goose -dir $(MIGRATIONS_DIR) postgres "$(DB_URL)" up

migrate-down:
	goose -dir $(MIGRATIONS_DIR) postgres "$(DB_URL)" down

migrate-status:
	goose -dir $(MIGRATIONS_DIR) postgres "$(DB_URL)" status

migrate-new:
	@read -p "Migration name: " name; \
	goose -dir $(MIGRATIONS_DIR) create $$name sql

# ----------------------------------
# Tools
# ----------------------------------

tools:
	cd $(BACKEND_DIR) && \
	go install github.com/sqlc-dev/sqlc/cmd/sqlc@latest && \
	go install github.com/pressly/goose/v3/cmd/goose@latest && \
	go install github.com/air-verse/air@latest
	@echo "✅ Dev tools installed."

# ----------------------------------
# Help
# ----------------------------------

help:
	@echo "Usage:"
	@echo "  make dev             Start all services"
	@echo "  make db              Start Postgres + Redis"
	@echo "  make api             Run backend with live reload"
	@echo "  make front           Run frontend dev server"
	@echo "  make lint            Run golangci-lint"
	@echo "  make swagger         Generate Swagger docs"
	@echo "  make migrate-up      Apply all pending migrations"
	@echo "  make migrate-down    Rollback last migration"
	@echo "  make migrate-status  Show migration status"
	@echo "  make migrate-new     Create a new migration"
	@echo "  make tools           Install sqlc and goose"
