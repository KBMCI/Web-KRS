package middleware

import (
	"net/http"
	"os"
	"time"
	"web-krs/helper"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

func GenerateToken(id uint, role string) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id":   int(id),
		"role": role,
		"exp":  time.Now().Add(time.Hour * 6).Unix(),
	})

	signedToken, err := token.SignedString([]byte(os.Getenv("SECRET_KEY")))
	if err != nil {
		return "", err
	}
	return signedToken, nil
}

func ValidateToken(roleParam string) gin.HandlerFunc {
	return func(c *gin.Context) {
		bearerToken := c.Request.Header.Get("Authorization")
		if bearerToken == "" {
			helper.ResponseValidationErrorJson(c, http.StatusUnauthorized, "token not found", nil)
			c.Abort()
			return
		}

		bearerToken = bearerToken[7:] // menghilangkan Bearer
		tokenExtract, err := jwt.Parse(bearerToken, tokenExtract)
		if err != nil {
			helper.ResponseValidationErrorJson(c, http.StatusUnauthorized, err.Error(), nil)
			c.Abort()
			return
		}
		if claims, ok := tokenExtract.Claims.(jwt.MapClaims); ok && tokenExtract.Valid {
			userId := claims["id"]
			roleClaim := claims["role"]

			if roleParam == "admin" {
				if roleClaim == "admin" {
					c.Set("id", userId)
					c.Next()
					return
				} else {
					helper.ResponseValidationErrorJson(c, http.StatusUnauthorized, "invalid token", nil)
					c.Abort()
					return
				}
			} else if roleParam == "user" {
				c.Set("id", userId)
				c.Next()
			}

			return
		}
		helper.ResponseValidationErrorJson(c, http.StatusForbidden, "invalid token", nil)
		c.Abort()
	}
}

func tokenExtract(token *jwt.Token) (interface{}, error) {
	if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
		return nil, jwt.ErrSignatureInvalid
	}

	return []byte(os.Getenv("SECRET_KEY")), nil
}
