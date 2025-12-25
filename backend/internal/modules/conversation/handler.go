package conversation

import (
	"encoding/json"
	"net/http"

	"github.com/deveasyclick/zendo/backend/internal/shared/response"
	"github.com/deveasyclick/zendo/backend/internal/shared/response/apierrors"
	"github.com/deveasyclick/zendo/backend/pkg/conv"
	"go.uber.org/zap"
)

type assignAgentReq struct {
	AgentID int64 `json:"agent_id"`
}

type setStatusReq struct {
	Status string `json:"status"`
}

type handler struct {
	svc    Service
	logger *zap.Logger
}

type Handler interface {
	GetConversation(w http.ResponseWriter, r *http.Request)
	AssignAgent(w http.ResponseWriter, r *http.Request)
	SetStatus(w http.ResponseWriter, r *http.Request)
	ListOpenConversations(w http.ResponseWriter, r *http.Request)
}

func NewHandler(svc Service, logger *zap.Logger) *handler {
	return &handler{svc: svc, logger: logger}
}

// @Summary Get a conversation
// @Description Retrieves a conversation by ID
// @Tags Conversations
// @Produce json
// @Param id path int true "Conversation ID"
// @Success 200 {object} response.SuccessResponse
// @Failure 400 {object} response.ErrorResponse
// @Failure 500 {object} response.ErrorResponse
// @Router /conversations/{id} [get]
func (h *handler) GetConversation(w http.ResponseWriter, r *http.Request) {
	id, err := conv.StringToInt64(r.PathValue("id"))
	if err != nil {
		response.WriteError(w, http.StatusBadRequest, apierrors.ErrBadRequest, "invalid id", err)
		return
	}

	conversation, err := h.svc.GetConversation(r.Context(), id)
	if err != nil {
		h.logger.Error(ErrGetConversationFailed, zap.Error(err))
		response.WriteError(w, http.StatusInternalServerError, apierrors.ErrInternal, "failed to get conversation", nil)
		return
	}

	response.WriteJSON(w, http.StatusOK, conversation)
}

// @Summary Assign an agent to a conversation
// @Description Assigns an agent to an existing conversation
// @Tags Conversations
// @Accept json
// @Produce json
// @Param id path int true "Conversation ID"
// @Param assignAgentReq body assignAgentReq true "Agent ID"
// @Success 200 {object} response.SuccessResponse
// @Failure 400 {object} response.ErrorResponse
// @Failure 500 {object} response.ErrorResponse
// @Router /conversations/{id}/assign [patch]
func (h *handler) AssignAgent(w http.ResponseWriter, r *http.Request) {
	id, err := conv.StringToInt64(r.PathValue("id"))
	if err != nil {
		response.WriteError(w, http.StatusBadRequest, apierrors.ErrBadRequest, "invalid id", err)
		return
	}

	var body assignAgentReq
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		h.logger.Error(ErrAssignAgentFailed, zap.Error(err))
		response.WriteError(w, http.StatusBadRequest, apierrors.ErrBadRequest, "invalid request body", nil)
		return
	}

	conversation, err := h.svc.AssignAgent(r.Context(), id, body.AgentID)
	if err != nil {
		h.logger.Error(ErrAssignAgentFailed, zap.Error(err))
		response.WriteError(w, http.StatusInternalServerError, ErrAssignAgentFailed, "failed to assign agent", nil)
		return
	}

	response.WriteJSON(w, http.StatusOK, conversation)
}

// @Summary Update conversation status
// @Description Updates the status of a conversation (e.g., open, closed)
// @Tags Conversations
// @Accept json
// @Produce json
// @Param id path int true "Conversation ID"
// @Param setStatusReq body setStatusReq true "New status"
// @Success 200 {object} response.SuccessResponse
// @Failure 400 {object} response.ErrorResponse
// @Failure 500 {object} response.ErrorResponse
// @Router /conversations/{id}/status [patch]
func (h *handler) SetStatus(w http.ResponseWriter, r *http.Request) {
	id, err := conv.StringToInt64(r.PathValue("id"))
	if err != nil {
		response.WriteError(w, http.StatusBadRequest, apierrors.ErrBadRequest, "invalid id", err)
		return
	}

	var body setStatusReq
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		h.logger.Error(ErrSetConversationStatusFailed, zap.Error(err))
		response.WriteError(w, http.StatusBadRequest, apierrors.ErrBadRequest, "invalid request body", nil)
		return
	}

	err = h.svc.SetConversationStatus(r.Context(), id, body.Status)
	if err != nil {
		h.logger.Error(ErrSetConversationStatusFailed, zap.Error(err))
		response.WriteError(w, http.StatusInternalServerError, ErrSetConversationStatusFailed, "failed to set conversation status", nil)
		return
	}

	response.WriteJSON(w, http.StatusOK, map[string]string{"Message": "Status updated"})
}

// @Summary List open conversations
// @Description Returns a list of currently open conversations
// @Tags Conversations
// @Produce json
// @Success 200 {object} response.SuccessResponse
// @Failure 500 {object} response.ErrorResponse
// @Router /conversations [get]
func (h *handler) ListOpenConversations(w http.ResponseWriter, r *http.Request) {
	conversations, err := h.svc.ListOpenConversations(r.Context())
	if err != nil {
		h.logger.Error(ErrListOpenConversationsFailed, zap.Error(err))
		response.WriteError(w, http.StatusInternalServerError, ErrListOpenConversationsFailed, "failed to list open conversations", nil)
		return
	}

	response.WriteJSON(w, http.StatusOK, conversations)
}
