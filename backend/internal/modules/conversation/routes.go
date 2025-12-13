package conversation

import (
	"net/http"
)

func RegisterRoutes(mux *http.ServeMux, h Handler) *http.ServeMux {
	mux.HandleFunc("GET /conversations/{id}", h.GetConversation)
	mux.HandleFunc("PATCH /conversations/{id}/assign", h.AssignAgent)
	mux.HandleFunc("PATCH /conversations/{id}/status", h.SetStatus)
	mux.HandleFunc("GET /conversations", h.ListOpenConversations)

	return mux
}
