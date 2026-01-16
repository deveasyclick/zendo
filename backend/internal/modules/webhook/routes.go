package webhook

import (
	"net/http"
)

func RegisterRoutes(mux *http.ServeMux, h Handler) *http.ServeMux {
	mux.HandleFunc("POST /webhooks/clerk", h.HandleClerkEvents)

	return mux
}
