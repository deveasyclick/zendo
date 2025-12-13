package message

import (
	"encoding/json"
	"net/http"

	"github.com/deveasyclick/zendo/backend/internal/db"
	"github.com/deveasyclick/zendo/backend/internal/shared/response"
	"github.com/deveasyclick/zendo/backend/pkg/conv"
	"go.uber.org/zap"
)

type Handler interface {
	CreateMessage(w http.ResponseWriter, r *http.Request)
	ListMessagesByConversation(w http.ResponseWriter, r *http.Request)
	DeleteMessage(w http.ResponseWriter, r *http.Request)
}

type handler struct {
	s      Service
	logger *zap.Logger
}

// CreateMessage godoc
//
// @Summary      Create a new message
// @Description  Create a message in a conversation
// @Tags         Messages
// @Accept       json
// @Produce      json
// @Param        request  body      db.CreateMessageParams  true  "Create message payload"
// @Success      201      {object}  response.SuccessResponse
// @Failure      400      {object}  response.ErrorResponse
// @Failure      500      {object}  response.ErrorResponse
// @Router       /messages [post]
// @Security BearerAuth
func (h handler) CreateMessage(w http.ResponseWriter, r *http.Request) {
	var req db.CreateMessageParams
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		h.logger.Error(ErrMessageCreateFailed, zap.Error(err))
		response.WriteError(w, http.StatusBadRequest, ErrMessageCreateFailed, "failed to create message", err)
		return
	}

	msg, err := h.s.CreateMessage(r.Context(), req)
	if err != nil {
		h.logger.Error(ErrMessageCreateFailed, zap.Error(err))
		response.WriteError(w, http.StatusBadRequest, ErrMessageCreateFailed, "failed to create message", nil)
		return
	}

	response.WriteJSON(w, http.StatusCreated, msg)
}

// ListMessagesByConversation godoc
//
// @Summary      List messages
// @Description  Get all messages for a specific conversation
// @Tags         Messages
// @Accept       json
// @Produce      json
// @Param        conversationId  path      int  true  "Conversation ID"
// @Success      200      {object}  response.SuccessResponse
// @Failure      400      {object}  response.ErrorResponse
// @Failure      500      {object}  response.ErrorResponse
// @Router       /conversations/{conversationId}/messages [get]
// @Security BearerAuth
func (h handler) ListMessagesByConversation(w http.ResponseWriter, r *http.Request) {
	conversationId, err := conv.StringToInt64(r.PathValue("conversationId"))
	if err != nil {
		response.WriteError(w, http.StatusBadRequest, ErrMessageListFailed, "invalid conversation id", err)
		return
	}

	messages, err := h.s.ListMessagesByConversation(r.Context(), int32(conversationId))
	if err != nil {
		h.logger.Error(ErrMessageListFailed, zap.Error(err))
		response.WriteError(w, http.StatusInternalServerError, ErrMessageListFailed, "failed to fetch messages", nil)
		return
	}

	response.WriteJSON(w, http.StatusOK, messages)
}

// DeleteMessage godoc
//
// @Summary      Delete a message
// @Description  Delete a message by ID
// @Tags         Messages
// @Accept       json
// @Produce      json
// @Param        id   path      int  true  "Message ID"
// @Success      200      {object}  int64
// @Failure      400      {object}  response.ErrorResponse
// @Failure      500      {object}  response.ErrorResponse
// @Router       /messages/{id} [delete]
// @Security BearerAuth
func (h handler) DeleteMessage(w http.ResponseWriter, r *http.Request) {
	messageId, err := conv.StringToInt64(r.PathValue("id"))
	if err != nil {
		response.WriteError(w, http.StatusBadRequest, ErrMessageListFailed, "invalid message id", err)
		return
	}

	err = h.s.DeleteMessage(r.Context(), int32(messageId))
	if err != nil {
		h.logger.Error(ErrMessageDeleteFailed, zap.Error(err))
		response.WriteError(w, http.StatusInternalServerError, ErrMessageDeleteFailed, "failed to delete", nil)
		return
	}

	response.WriteJSON(w, http.StatusOK, messageId)
}

func NewHandler(s Service, logger *zap.Logger) Handler {
	return &handler{s: s, logger: logger}
}
