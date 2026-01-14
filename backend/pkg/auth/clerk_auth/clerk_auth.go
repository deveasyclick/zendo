package clerk_auth

import (
	"context"
	"encoding/json"
	"fmt"
	"strconv"

	"github.com/clerk/clerk-sdk-go/v2"
	"github.com/clerk/clerk-sdk-go/v2/user"
)

type CustomSessionClaims struct {
	OrgID   string `json:"org_id,omitempty"`
	UserID  string `json:"user_id,omitempty"`
	ClerkId string
}
type ContextUser struct {
	ID      uint64
	Org     uint64
	ClerkID string
}

type ClerkAuth interface {
	GetCustomClaims(ctx context.Context) (*CustomSessionClaims, error)
	ClerkIDFromContext(ctx context.Context) (string, bool)
	UserFromContext(ctx context.Context) (*ContextUser, error)
	SetOrg(ctx context.Context, clerkID string, orgID string) error
	DeleteUser(ctx context.Context, userClerkID string) error
}

type client struct{}

func NewAuth() ClerkAuth {
	return &client{}
}

func Init(secret string) {
	clerk.SetKey(secret)
}

func (c *client) GetCustomClaims(ctx context.Context) (*CustomSessionClaims, error) {
	claims, ok := clerk.SessionClaimsFromContext(ctx)
	if !ok {
		return nil, fmt.Errorf("no session claims found in context")
	}
	customClaims, ok := claims.Custom.(*CustomSessionClaims)
	if !ok {
		return nil, fmt.Errorf("invalid or missing custom claims")
	}

	return &CustomSessionClaims{
		UserID:  customClaims.UserID,
		OrgID:   customClaims.OrgID,
		ClerkId: claims.Subject,
	}, nil
}

func (c *client) ClerkIDFromContext(ctx context.Context) (string, bool) {
	claims, ok := clerk.SessionClaimsFromContext(ctx)
	if !ok {
		return "", false
	}
	return claims.Subject, false
}

func (c *client) UserFromContext(ctx context.Context) (*ContextUser, error) {
	claims, err := c.GetCustomClaims(ctx)
	if err != nil {
		return nil, err
	}

	userID, err := strconv.ParseUint(claims.UserID, 10, strconv.IntSize)
	if err != nil {
		return nil, err
	}

	var orgId uint64
	if claims.OrgID != "" {
		orgId, err = strconv.ParseUint(claims.OrgID, 10, strconv.IntSize)
		if err != nil {
			return nil, err
		}
	}

	user := &ContextUser{
		ID:      userID,
		ClerkID: claims.ClerkId,
		Org:     orgId,
	}

	return user, nil
}

func (s *client) SetOrg(ctx context.Context, clerkID string, orgID string) error {
	dataBytes, _ := json.Marshal(map[string]string{
		"org_id": orgID,
	})
	raw := json.RawMessage(dataBytes)
	_, err := user.UpdateMetadata(ctx, clerkID, &user.UpdateMetadataParams{PublicMetadata: &raw})

	return err
}

// func (s *client) SetRoleAndExternalID(ctx context.Context, userClerkID string, externalID string, role model.Role) error {
// 	dataBytes, _ := json.Marshal(map[string]model.Role{
// 		"role": role,
// 	})
// 	raw := json.RawMessage(dataBytes)
// 	_, err := user.Update(ctx, userClerkID, &user.UpdateParams{ExternalID: &externalID, PublicMetadata: &raw})

// 	return err
// }

func (s *client) DeleteUser(ctx context.Context, userClerkID string) error {
	_, err := user.Delete(ctx, userClerkID)
	return err
}
