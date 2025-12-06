package middleware

import (
	"context"
	"net/http"
	"strings"
	"sync"
	"time"

	"golang.org/x/time/rate"
)

type rateLimitKey struct{}

// RateLimiterMiddleware returns a middleware that enforces rate limiting per IP
func RateLimiterMiddleware(rps float64, burst int, next http.Handler) http.Handler {
	limiters := &sync.Map{} // IP -> *rate.Limiter

	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ip := realIP(r)

		limiter, _ := limiters.LoadOrStore(ip, rate.NewLimiter(rate.Limit(rps), burst))
		rl := limiter.(*rate.Limiter)

		// Fixed: AllowN takes (time.Time, int) - no context
		if !rl.AllowN(time.Now(), 1) {
			http.Error(w, "Rate limit exceeded", http.StatusTooManyRequests)
			return
		}

		// Attach limiter to context for per-request access if needed
		ctx := context.WithValue(r.Context(), rateLimitKey{}, rl)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

func realIP(r *http.Request) string {
	if xff := r.Header.Get("X-Forwarded-For"); xff != "" {
		// Return first IP in chain
		if idx := strings.IndexByte(xff, ','); idx > 0 {
			return strings.TrimSpace(xff[:idx])
		}
		return strings.TrimSpace(xff)
	}
	return r.RemoteAddr
}

// Helper to get limiter from context (optional)
func LimiterFromContext(ctx context.Context) *rate.Limiter {
	if l, ok := ctx.Value(rateLimitKey{}).(*rate.Limiter); ok {
		return l
	}
	return nil
}
