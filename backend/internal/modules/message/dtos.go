package message

import (
	"fmt"
	"net/http"

	"github.com/deveasyclick/zendo/backend/internal/validator"
)

type CreateMessageDTO struct {
	Content        string  `json:"content" validate:"required,min=1"`
	WebsiteID      int32   `json:"websiteId" validate:"required,gt=0"`
	VisitorID      string  `json:"visitorId" validate:"required_if=SenderType visitor"`
	AgentID        *string `json:"agentId" validate:"required_if=SenderType agent"`
	ConversationID *int32  `json:"conversationId" validate:"omitempty,gt=0"`
	SenderType     string  `json:"senderType" validate:"required,oneof=visitor agent bot"`
}

func ValidateCreateMessageBody(w http.ResponseWriter, r *http.Request) (*CreateMessageDTO, error) {
	var dto CreateMessageDTO
	if errors := validator.ValidateRequest(r, &dto); errors != nil {
		validator.WriteValidationResponse(w, errors)
		return nil, fmt.Errorf("invalid request body")
	}

	return &dto, nil
}
