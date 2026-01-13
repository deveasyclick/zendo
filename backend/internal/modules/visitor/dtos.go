package visitor

import (
	"fmt"
	"net/http"

	"github.com/deveasyclick/zendo/backend/internal/validator"
)

type CreateVisitorDTO struct {
	IPAddress string `json:"ipAddress" validate:"required,min=6"`
	UserAgent string `json:"userAgent" validate:"required,min=2"`
	State     string `json:"state" validate:"required,min=1"`
	Country   string `json:"country" validate:"required,min=1"`
	WebsiteID int32  `json:"websiteId" validate:"required,gt=0"`
}

func ValidateCreateVisitorBody(w http.ResponseWriter, r *http.Request) (*CreateVisitorDTO, error) {
	var dto CreateVisitorDTO
	if errors := validator.ValidateRequest(r, &dto); errors != nil {
		validator.WriteValidationResponse(w, errors)
		return nil, fmt.Errorf("invalid request body")
	}

	return &dto, nil
}
