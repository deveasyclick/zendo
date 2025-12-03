package conversation

import (
	"encoding/json"
	"net/http"

	"github.com/deveasyclick/zendo/backend/internal/shared/response"
	"github.com/deveasyclick/zendo/backend/internal/shared/response/apierrors"
	"github.com/deveasyclick/zendo/backend/pkg/conv"
)

type createConversationReq struct {
	VisitorID string `json:"visitor_id"`
}

type assignAgentReq struct {
	AgentID int64 `json:"agent_id"`
}

type setStatusReq struct {
	Status string `json:"status"`
}

type handler struct {
	svc Service
}

type Handler interface {
	CreateConversation(w http.ResponseWriter, r *http.Request)
	GetConversation(w http.ResponseWriter, r *http.Request)
	AssignAgent(w http.ResponseWriter, r *http.Request)
	SetStatus(w http.ResponseWriter, r *http.Request)
	ListOpenConversations(w http.ResponseWriter, r *http.Request)
}

func NewHandler(svc Service) *handler {
	return &handler{svc: svc}
}

func (h *handler) CreateConversation(w http.ResponseWriter, r *http.Request) {
	var body createConversationReq
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		response.WriteError(w, http.StatusBadRequest, apierrors.ErrBadRequest, "invalid request body", nil)
		return
	}

	conversation, err := h.svc.CreateConversation(r.Context(), body.VisitorID)
	if err != nil {
		response.WriteError(w, http.StatusInternalServerError, apierrors.ErrInternal, "failed to create conversation", nil)
		return
	}

	response.WriteJSON(w, http.StatusCreated, response.SuccessResponse{Data: conversation})
}

// GET /conversations/{id}
func (h *handler) GetConversation(w http.ResponseWriter, r *http.Request) {
	id, err := conv.StringToInt64(r.PathValue("id"))
	if err != nil {
		response.WriteError(w, http.StatusBadRequest, apierrors.ErrBadRequest, "invalid id", nil)
		return
	}

	conversation, err := h.svc.GetConversation(r.Context(), id)
	if err != nil {
		response.WriteError(w, http.StatusInternalServerError, apierrors.ErrInternal, "failed to get conversation", nil)
		return
	}

	response.WriteJSON(w, http.StatusOK, response.SuccessResponse{Data: conversation})
}

// PATCH /conversations/{id}/assign

func (h *handler) AssignAgent(w http.ResponseWriter, r *http.Request) {
	id, err := conv.StringToInt64(r.PathValue("id"))
	if err != nil {
		response.WriteError(w, http.StatusBadRequest, apierrors.ErrBadRequest, "invalid id", nil)
		return
	}

	var body assignAgentReq
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		response.WriteError(w, http.StatusBadRequest, apierrors.ErrBadRequest, "invalid request body", nil)
		return
	}

	conversation, err := h.svc.AssignAgent(r.Context(), id, body.AgentID)
	if err != nil {
		response.WriteError(w, http.StatusInternalServerError, ErrAssignAgentFailed, "failed to assign agent", nil)
		return
	}

	response.WriteJSON(w, http.StatusOK, response.SuccessResponse{Data: conversation})
}

// PATCH /conversations/{id}/status
func (h *handler) SetStatus(w http.ResponseWriter, r *http.Request) {
	id, err := conv.StringToInt64(r.PathValue("id"))
	if err != nil {
		response.WriteError(w, http.StatusBadRequest, apierrors.ErrBadRequest, "invalid id", nil)
		return
	}

	var body setStatusReq
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		response.WriteError(w, http.StatusBadRequest, apierrors.ErrBadRequest, "invalid request body", nil)
		return
	}

	err = h.svc.SetConversationStatus(r.Context(), id, body.Status)
	if err != nil {
		response.WriteError(w, http.StatusInternalServerError, ErrSetConversationStatusFailed, "failed to set conversation status", nil)
		return
	}

	response.WriteJSON(w, http.StatusOK, response.SuccessResponse{Data: "status updated"})
}

// GET /conversations
func (h *handler) ListOpenConversations(w http.ResponseWriter, r *http.Request) {
	conversations, err := h.svc.ListOpenConversations(r.Context())
	if err != nil {
		response.WriteError(w, http.StatusInternalServerError, ErrListOpenConversationsFailed, "failed to list open conversations", nil)
		return
	}

	response.WriteJSON(w, http.StatusOK, response.SuccessResponse{Data: conversations})
}
