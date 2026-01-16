package webhook

type WebhookEvent struct {
	ID string `json:"id" example:"evt_123456"`

	Type string `json:"type" example:"user.created"`

	Data map[string]interface{} `json:"data"`

	CreatedAt string `json:"created_at" example:"2025-08-26T18:00:00Z"`

	WebhookID string `json:"webhook_id" example:"wh_987654"`
}

type ClerkEmail struct {
	ID           string `json:"id" mapstructure:"id"`
	EmailAddress string `json:"email_address" mapstructure:"email_address"`
	Verified     bool   `json:"verified" mapstructure:"verified"`
}

type ClerkUser struct {
	ID             string       `mapstructure:"id" json:"id"`
	FirstName      string       `mapstructure:"first_name" json:"first_name"`
	LastName       string       `mapstructure:"last_name" json:"last_name"`
	EmailAddresses []ClerkEmail `mapstructure:"email_addresses" json:"email_addresses"`
}