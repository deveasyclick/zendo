package webhook

import "errors"

var (
	ErrEmailNotFoundInWebhook = errors.New("email not found in webhook")
	ErrAgentAlreadyExists     = errors.New("agent already exists")
)
