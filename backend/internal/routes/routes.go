package routes

import (
	"fmt"
	"net/http"
	"net/url"

	"github.com/deveasyclick/zendo/backend/docs"
	"github.com/deveasyclick/zendo/backend/internal/app"
	"github.com/deveasyclick/zendo/backend/internal/middleware"
	"github.com/deveasyclick/zendo/backend/internal/modules/conversation"
	swagger "github.com/swaggo/http-swagger"
	"go.uber.org/zap"
)

func LoadRoutes(app *app.App) http.Handler {
	mux := http.NewServeMux()

	svc := conversation.NewService(app.DB.Queries)
	hdl := conversation.NewHandler(svc)
	conversation.RegisterRoutes(mux, hdl)

	if app.Config.Env == "development" {
		parsedURL, err := url.Parse(app.Config.AppURL)
		if err != nil {
			app.Logger.Error("failed to parse app url", zap.String("error", err.Error()))
		}
		fmt.Println("host", parsedURL)
		docs.SwaggerInfo.Host = parsedURL.Host
		app.Logger.Info("serving swagger docs", zap.String("url", fmt.Sprintf("%s/swagger/doc.json", app.Config.AppURL)))
		mux.Handle("/swagger/", swagger.Handler(
			swagger.URL(fmt.Sprintf("%s/swagger/doc.json", app.Config.AppURL)),
		))
	}

	handler := applyMiddlewares(mux, app.Logger)

	return handler
}

func applyMiddlewares(handler http.Handler, logger *zap.Logger) http.Handler {
	handler = middleware.Recovery(logger)(handler)
	handler = middleware.RateLimiterMiddleware(10.0, 20)(handler)
	handler = middleware.CORSMiddleware([]string{"https://yourfrontend.com"})(handler)
	handler = middleware.RequestLogger(logger)(handler)

	return handler
}
