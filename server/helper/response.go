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

func ResponseValidationErrorJson(c *gin.Context, message string, detail interface{}) {
	c.JSON(http.StatusBadRequest, gin.H{
		"message": message,
		"success": false,
		"data": detail,
	})
}

func ResponseErrorJson(c *gin.Context, code int, err error) {
	c.JSON(code, gin.H{
		"error": err.Error(),
	})
}

func ResponseWhenFailOrError(c *gin.Context, code int, err error)  {
	c.JSON(code, gin.H{
		"success": false,
		"message": err.Error(),
	 })
}
