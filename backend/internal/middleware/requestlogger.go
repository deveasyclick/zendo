package middleware

import (
	"context"
	"net/http"
	"time"

	"github.com/rs/xid"
	"go.uber.org/zap"
)

type loggerKey struct{}
type requestIDKey struct{}

func RequestLogger(logger *zap.Logger) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			start := time.Now()

			requestID := r.Header.Get("X-Request-ID")
			if requestID == "" {
				requestID = xid.New().String()
			}

			clientIP := realIP(r)

			ww := &responseWriter{ResponseWriter: w, status: http.StatusOK}
			// Create request-scoped logger with request ID
			reqLogger := logger.With(
				zap.String("request_id", requestID),
				zap.String("method", r.Method),
				zap.String("path", r.URL.Path),
				zap.String("ip", clientIP),
			)

			// Attach logger and request ID to context
			ctx := context.WithValue(r.Context(), requestIDKey{}, requestID)
			ctx = context.WithValue(ctx, loggerKey{}, reqLogger)

			// Set response header
			ww.Header().Set("X-Request-ID", requestID)

			// Log request start
			reqLogger.Info("request received")

			// Call next handler
			next.ServeHTTP(ww, r.WithContext(ctx))

			reqLogger.Info("request completed",
				zap.Int("status", ww.status),
				zap.Int("size", ww.size),
				zap.Duration("duration", time.Since(start)),
			)
		})
	}
}

type responseWriter struct {
	http.ResponseWriter
	status int
	size   int
}

func (w *responseWriter) WriteHeader(code int) {
	w.status = code
	w.ResponseWriter.WriteHeader(code)
}

func (w *responseWriter) Write(b []byte) (int, error) {
	n, err := w.ResponseWriter.Write(b)
	w.size += n
	return n, err
}
