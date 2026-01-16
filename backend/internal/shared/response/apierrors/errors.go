package apierrors

import "errors"

var (
	ErrInternal          = errors.New("internal server error")
	ErrBadRequest        = errors.New("bad request")
	ErrDecodeRequestBody = errors.New("error decoding request body")
)

var (
	ErrCodeBadRequest = "BAD_REQUEST"
	ErrCodeInternal   = "INTERNAL_SERVER_ERROR"
)
