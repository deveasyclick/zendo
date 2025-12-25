package message

import "errors"

const (
	ErrMessageCreateFailed = "MESSAGE_CREATE_FAILED"
	ErrMessageListFailed   = "MESSAGE_LIST_FAILED"
	ErrMessageDeleteFailed = "MESSAGE_DELETE_FAILED"
	ErrInvalidSenderType   = "INVALID SENDER TYPE"
)

var ErrConversationClosedOrNotFound = errors.New("conversation closed or not found")
