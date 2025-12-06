package middleware

import (
	"context"
	"net"
	"net/http"
	"strings"
	"sync"
	"time"

	"golang.org/x/time/rate"
)

// context key
type rateLimitKey struct{}

// global limiter map per instance of middleware (correct)
type ipLimiterStore struct {
	limiters sync.Map // map[string]*rate.Limiter
}

// RateLimiterMiddleware enforces per-IP rate limiting
func RateLimiterMiddleware(rps float64, burst int) func(http.Handler) http.Handler {
	store := &ipLimiterStore{}

	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			ip := realIP(r)

			limiterIface, _ := store.limiters.LoadOrStore(ip, rate.NewLimiter(rate.Limit(rps), burst))
			limiter := limiterIface.(*rate.Limiter)

			// AllowN(time, amount)
			if !limiter.AllowN(time.Now(), 1) {
				http.Error(w, "Rate limit exceeded", http.StatusTooManyRequests)
				return
			}

			// attach limiter to context
			ctx := context.WithValue(r.Context(), rateLimitKey{}, limiter)
			next.ServeHTTP(w, r.WithContext(ctx))
		})
	}
}

// Extract real client IP from headers or RemoteAddr
func realIP(r *http.Request) string {
	// X-Forwarded-For (comma-separated list)
	if xff := r.Header.Get("X-Forwarded-For"); xff != "" {
		parts := strings.Split(xff, ",")
		return strings.TrimSpace(parts[0])
	}

	// Fallback: RemoteAddr contains "ip:port"
	host, _, err := net.SplitHostPort(r.RemoteAddr)
	if err == nil {
		return host
	}

	return r.RemoteAddr
}

// Access limiter if needed
func LimiterFromContext(ctx context.Context) *rate.Limiter {
	if l, ok := ctx.Value(rateLimitKey{}).(*rate.Limiter); ok {
		return l
	}
	return nil
}
