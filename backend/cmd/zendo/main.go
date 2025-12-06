// @title Zendo API
// @version 1.0
// @description Zendo API.
// @termsOfService http://zendo.com/terms/

// @contact.name API Support
// @contact.url http://zendo.com/support
// @contact.email support@zendo.com

// @license.name MIT
// @license.url https://opensource.org/licenses/MIT

// @host localhost:3001
// @BasePath /

// @securityDefinitions.apikey BearerAuth
// @in header
// @name Authorization

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
	"go.uber.org/zap"
)

func main() {
	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	defer stop()

	app, err := app.New(ctx)
	if err != nil {
		log.Fatal("unable to create app", zap.Error(err))
	}

	handlers := routes.LoadRoutes(app)
	srv := &http.Server{
		Addr:    fmt.Sprintf(":%d", app.Config.PORT),
		Handler: handlers,
	}

	go func() {
		app.Logger.Info("Server running on port", zap.Int("port", app.Config.PORT))
		if err := srv.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
			app.Logger.Fatal("Server failed", zap.Error(err))
		}
	}()

	<-ctx.Done()

	shutdownCtx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	if err := srv.Shutdown(shutdownCtx); err != nil {
		app.Logger.Fatal("Server forced to shutdown", zap.Error(err))
	}

	app.Close()
	app.Logger.Info("Server exited gracefully")
}
