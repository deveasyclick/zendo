package webhook

import (
	"net/http"

	"github.com/deveasyclick/zendo/backend/internal/config"
	"github.com/deveasyclick/zendo/backend/internal/shared/response"
	"github.com/deveasyclick/zendo/backend/internal/shared/response/apierrors"
	"go.uber.org/zap"
)

type handler struct {
	svc    WebhookService
	logger *zap.Logger
	cfg    config.Config
}

type Handler interface {
	HandleClerkEvents(w http.ResponseWriter, r *http.Request)
}

func NewHandler(svc WebhookService, logger *zap.Logger, cfg config.Config) *handler {
	return &handler{svc: svc, logger: logger, cfg: cfg}
}

// HandleClerkEvents godoc
// @Summary      Receive Clerk webhook events
// @Description  Handles incoming webhook events from Clerk. The request body must match the WebhookEvent structure.
// @Tags         webhooks
// @Accept       json
// @Produce      json
// @Param        event  body      FullWebhookEvent  true  "Webhook Event Payload"
// @Success      200    {string}  string               "OK"
// @Failure      400    {object}  apperrors.APIErrorResponse
// @Failure      401    {object}  apperrors.APIErrorResponse
// @Failure      500    {object}  apperrors.APIErrorResponse
// @Router       /webhooks/clerk [post]
// @BasePath /
func (h *handler) HandleClerkEvents(w http.ResponseWriter, r *http.Request) {
	if h.cfg.ClerkWebhookSigningSecret == "" {
		h.logger.Error("missing clerk webhook signing secret")
		response.WriteJSON(w, http.StatusOK, nil)
		response.WriteError(w, http.StatusInternalServerError, apierrors.ErrInternal, "missing clerk webhook signing secret", nil)
		return
	}

	event, err := h.svc.VerifyWebhook(h.cfg.ClerkWebhookSigningSecret, r)
	if err != nil {
		h.logger.Error("error verifying clerk webhook", zap.Error(err))
		response.WriteError(w, http.StatusBadRequest, apierrors.ErrBadRequest, "clerk webhook verification failed", err)
		return
	}

	h.logger.Info("Handling webhook event", zap.Any("event", &event))

	err = h.svc.HandleEvent(r.Context(), event)
	if err != nil {
		// TODO: Send slack alert
		h.logger.Error("Error handling clerk webhook event", zap.String("event", event.Type), zap.Error(err))
		response.WriteError(w, http.StatusInternalServerError, apierrors.ErrInternal, "clerk webhook failed", err)
		return
	}

	response.WriteJSON(w, http.StatusOK, nil)
}
