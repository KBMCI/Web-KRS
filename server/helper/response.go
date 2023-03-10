package helper

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

func ResponseErrorJson(c *gin.Context, message string, detail interface{}) {
 c.JSON(http.StatusBadRequest, gin.H{
	"message": message,
	"status": true,
	"data": detail,
 })
}

func ResponseSuccessJson(c *gin.Context, message string, detail interface{})  {

	if message == "" {
		message = "Success"
	}
	
	c.JSON(http.StatusOK, gin.H{
		"message": message,
		"status": true,
		"data": detail,
	})
}

func ResponeValidationError(c *gin.Context, err error)  {
	errorMessages := []string{}
		for _, e := range err.(validator.ValidationErrors) {
			errorMessage := fmt.Sprintf("Error on field %s, condition: %s", e.Field(), e.ActualTag())
			errorMessages = append(errorMessages, errorMessage)
		}

		c.JSON(http.StatusBadRequest, gin.H{
			"massage": false,
			"data": errorMessages,
			})
}


