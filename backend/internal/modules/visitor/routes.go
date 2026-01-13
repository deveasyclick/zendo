package visitor

import (
	"net/http"
)

func RegisterRoutes(mux *http.ServeMux, h Handler) *http.ServeMux {
	mux.HandleFunc("POST /visitors", h.CreateVisitor)

	return mux
}
