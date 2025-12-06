package middleware

import (
	"context"
	"net/http"

	"github.com/rs/xid"
	"go.uber.org/zap"
)

type loggerKey struct{}
type requestIDKey struct{}

func RequestLogger(logger *zap.Logger) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			requestID := r.Header.Get("X-Request-ID")
			if requestID == "" {
				requestID = xid.New().String()
			}

			// Create request-scoped logger with request ID
			reqLogger := logger.With(
				zap.String("request_id", requestID),
				zap.String("method", r.Method),
				zap.String("path", r.URL.Path),
				zap.String("remote_addr", r.RemoteAddr),
			)

			// Attach logger and request ID to context
			ctx := context.WithValue(r.Context(), requestIDKey{}, requestID)
			ctx = context.WithValue(ctx, loggerKey{}, reqLogger)

			// Set response header
			w.Header().Set("X-Request-ID", requestID)

			// Log request start
			reqLogger.Info("request received")

			// Call next handler
			next.ServeHTTP(w, r.WithContext(ctx))
		})
	}
}
