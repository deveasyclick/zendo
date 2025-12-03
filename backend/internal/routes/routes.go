package routes

import (
	"net/http"

	"github.com/deveasyclick/zendo/backend/internal/app"
	"github.com/deveasyclick/zendo/backend/internal/modules/conversation"
)

func LoadRoutes(app *app.App) *http.ServeMux {
	mux := http.NewServeMux()
	svc := conversation.NewService(app.DB.Queries)
	hdl := conversation.NewHandler(svc)
	conversation.RegisterRoutes(mux, hdl)
	return mux
}
