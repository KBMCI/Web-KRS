package middleware

import (
	"errors"
	"net/http"
	"os"
	"time"
	"web-krs/helper"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

func GenerateToken(id uint, role string) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id": int(id),
		"role": role,
		"exp": time.Now().Add(time.Minute * 15).Unix(),
	})

	signedToken, err := token.SignedString([]byte(os.Getenv("SECRET_KEY")))
	if err != nil {
		return "", err
	}
	return signedToken, nil
}

func ValidateToken() gin.HandlerFunc {
	return func (c *gin.Context)  {
		bearerToken := c.Request.Header.Get("Authorization")
		if bearerToken == "" {
			helper.ResponseWhenFailOrError(c, http.StatusUnauthorized, errors.New("token not found"))
			c.Abort()
			return
		}

		bearerToken = bearerToken[7:] // menghilangkan Bearer
		tokenExtract, err := jwt.Parse(bearerToken, func (token *jwt.Token) (interface{}, error) {
			_, ok := token.Method.(*jwt.SigningMethodHMAC)
			if !ok {
				return nil, jwt.ErrSignatureInvalid
			}
		
			return []byte(os.Getenv("SECRET_KEY")), nil
		})
		if err != nil {
			helper.ResponseWhenFailOrError(c, http.StatusUnauthorized, err)
			c.Abort()
			return
		}
		if claims, ok := tokenExtract.Claims.(jwt.MapClaims); ok && tokenExtract.Valid {
			userId := claims["id"]
			userRole := claims["role"]
			c.Set("id", userId)
			c.Set("role", userRole)
			c.Next()
			return
		}
		helper.ResponseWhenFailOrError(c, http.StatusForbidden, errors.New("invalid token"))
		c.Abort()
	}
}
