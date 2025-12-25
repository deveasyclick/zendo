package message

import (
	"net/http"
)

func RegisterRoutes(mux *http.ServeMux, h Handler) *http.ServeMux {
	mux.HandleFunc("POST /messages", h.CreateMessage)
	mux.HandleFunc("GET /messages/conversations/{conversationId}", h.ListMessagesByConversation)
	mux.HandleFunc("DELETE /messages/{id}", h.DeleteMessage)

	return mux
}
