package visitor

import (
	"net/http"

	"github.com/deveasyclick/zendo/backend/internal/shared/response"
	"go.uber.org/zap"
)

type Handler interface {
	CreateVisitor(w http.ResponseWriter, r *http.Request)
}

type handler struct {
	s      Service
	logger *zap.Logger
}

// CreateVisitor godoc
//
// @Summary      Create a new visitor
// @Description  Create a visitor
// @Tags         Visitors
// @Accept       json
// @Produce      json
// @Param        payload  body  CreateVisitorDTO  true  "Create visitor payload"
// @Success      201      {object}  response.SuccessResponse
// @Failure      400      {object}  response.ErrorResponse
// @Failure      500      {object}  response.ErrorResponse
// @Router       /visitors [post]
// @Security BearerAuth
func (h handler) CreateVisitor(w http.ResponseWriter, r *http.Request) {
	req, err := ValidateCreateVisitorBody(w, r)
	if err != nil {
		return
	}

	msg, err := h.s.CreateVisitor(r.Context(), *req)
	if err != nil {
		h.logger.Error(ErrVisitorCreateFailed, zap.Error(err))
		response.WriteError(
			w,
			http.StatusInternalServerError,
			ErrVisitorCreateFailed,
			"failed to create visitor",
			nil,
		)

		return
	}

	response.WriteJSON(w, http.StatusCreated, msg)
}

func NewHandler(s Service, logger *zap.Logger) Handler {
	return &handler{s: s, logger: logger}
}
