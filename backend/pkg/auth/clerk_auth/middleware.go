package clerk_auth

import (
	"context"
	"net/http"

	"github.com/clerk/clerk-sdk-go/v2"
	clerkHttp "github.com/clerk/clerk-sdk-go/v2/http"
)

func customClaimsConstructor(ctx context.Context) any {
	return CustomSessionClaims{}
}

func withCustomClaimsConstructor(params *clerkHttp.AuthorizationParams) error {
	params.VerifyParams.CustomClaimsConstructor = customClaimsConstructor
	return nil
}

func ValidateJWT(opts ...clerkHttp.AuthorizationOption) func(http.Handler) http.Handler {
	// Extract custom claims from the request
	opts = append(opts, withCustomClaimsConstructor)
	return func(next http.Handler) http.Handler {
		return clerkHttp.WithHeaderAuthorization(opts...)(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			claims, ok := clerk.SessionClaimsFromContext(r.Context())
			if !ok || claims == nil {
				w.WriteHeader(http.StatusUnauthorized)
				w.Write([]byte(`{"message": "unauthorized"}`))
				return
			}

			next.ServeHTTP(w, r)
		}))
	}
}
