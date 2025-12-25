package response

import (
	"encoding/json"
	"log"
	"net/http"
)

type ErrorResponse struct {
	Error   string `json:"error"`
	Code    string `json:"code"`
	Details any    `json:"details,omitempty"`
}

type SuccessResponse struct {
	Message string `json:"message"`
	Status  int    `json:"status"`
	Data    any    `json:"data"`
}

func WriteJSON(w http.ResponseWriter, status int, payload any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)

	if err := json.NewEncoder(w).Encode(SuccessResponse{Data: payload, Message: "success", Status: status}); err != nil {
		log.Printf("json encode error: %v", err)
		http.Error(w, "internal server error", http.StatusInternalServerError)
		return
	}
}

func WriteError(w http.ResponseWriter, status int, code string, msg string, details any) {
	WriteJSON(w, status, ErrorResponse{
		Error:   msg,
		Code:    code,
		Details: details,
	})
}

func WriteOK(w http.ResponseWriter, data any) {
	WriteJSON(w, http.StatusOK, data)
}
