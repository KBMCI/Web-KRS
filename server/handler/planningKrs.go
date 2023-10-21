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
		helper.ResponseValidationErrorJson(c, http.StatusBadRequest, err.Error(), nil)
		return
	}

	Random, err := r.service.PlanningKrs.Suggestion(uint(idUser), req.IdKelas)
	if err != nil {
		helper.ResponseValidationErrorJson(c, http.StatusBadRequest, err.Error(), nil)
		return
	}

	helper.ResponseSuccessJson(c, "success", Random)

}
