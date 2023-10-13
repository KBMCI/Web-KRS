package handler

import (
	"net/http"
	"web-krs/helper"
	"web-krs/request"

	"github.com/gin-gonic/gin"
)

func (r *rest) SuggestionKrs(c *gin.Context) {
	idUser := c.MustGet("id").(float64)

	var req request.SuggestionRequest

	err := c.ShouldBindJSON(&req)
	if err != nil {
		helper.ResponseValidationErrorJson(c, "Error binding struct", err.Error())
		return
	}

	Random, err := r.service.PlanningKrs.Suggestion(uint(idUser), req.IdKelas)
	if err != nil {
		helper.ResponseErrorJson(c, http.StatusBadRequest, err)
		return
	}

	helper.ResponseSuccessJson(c, "success", Random)

}
