package helper

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func ResponseSuccessJson(c *gin.Context, message string, data interface{}) {
	
	if message == "" {
		message = "success"
	}

	c.JSON(http.StatusOK, gin.H{
		"message": message,
		"success": true,
		"data": data,
	})
}

func ResponseValidationErrorJson(c *gin.Context, code int, message string, detail interface{}) {
	c.JSON(code, gin.H{
		"message": message,
		"success": false,
		"data": detail,
	})
}
