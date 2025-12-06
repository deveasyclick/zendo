package routes

import (
	"net/http"

	"github.com/deveasyclick/zendo/backend/internal/app"
	"github.com/deveasyclick/zendo/backend/internal/middleware"
	"github.com/deveasyclick/zendo/backend/internal/modules/conversation"
	"go.uber.org/zap"
)

func LoadRoutes(app *app.App) http.Handler {
	mux := http.NewServeMux()

	svc := conversation.NewService(app.DB.Queries)
	hdl := conversation.NewHandler(svc)
	conversation.RegisterRoutes(mux, hdl)
	handler := applyMiddlewares(mux, app.Logger)

	return handler
}

func applyMiddlewares(handler http.Handler, logger *zap.Logger) http.Handler {
	handler = middleware.RequestLogger(logger)(handler)
	handler = middleware.Recovery(logger)(handler)
	handler = middleware.CORSMiddleware([]string{"https://yourfrontend.com"})(handler)
	handler = middleware.RateLimiterMiddleware(10.0, 20, handler)

	return handler
}
