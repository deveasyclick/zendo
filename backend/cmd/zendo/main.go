package main

import (
	"context"
	"errors"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/deveasyclick/zendo/backend/internal/app"
	"github.com/deveasyclick/zendo/backend/internal/routes"
)

func main() {
	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	defer stop()

	app, err := app.New(ctx)
	if err != nil {
		log.Fatalf("unable to create app: %v", err)
	}

	handlers := routes.LoadRoutes(app)
	srv := &http.Server{
		Addr:    fmt.Sprintf(":%d", app.Config.PORT),
		Handler: handlers,
	}

	go func() {
		log.Println("Server running on port", app.Config.PORT)
		if err := srv.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
			log.Fatalf("Server failed: %v", err)
		}
	}()

	<-ctx.Done()

	shutdownCtx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	if err := srv.Shutdown(shutdownCtx); err != nil {
		log.Fatalf("Server forced to shutdown: %v", err)
	}
}
