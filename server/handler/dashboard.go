package handler

import (
	"net/http"
	"web-krs/helper"
	"web-krs/response"

	"github.com/gin-gonic/gin"
)

func (r *rest) DashboardHandler(c *gin.Context) {
	idUser := c.MustGet("id").(float64)

	fetchMatkul, getPlansUser, err := r.service.Dashboard.GetDashboard(uint(idUser))
	if err != nil {
		helper.ResponseValidationErrorJson(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}

	var planResponse []response.PlanResponse
	for _, p := range getPlansUser {
		planResponse = append(planResponse, response.ConvertToPlanResponse(*p))
	}

	helper.ResponseSuccessJson(c, "success", gin.H{
		"matkuls":    fetchMatkul,
		"user_plans": planResponse,
	})
}
