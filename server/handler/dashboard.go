package handler

import (
	"net/http"
	"web-krs/helper"
	"web-krs/response"

	"github.com/gin-gonic/gin"
)

func (r *rest) DashboardHandler(c *gin.Context) {
	idUser := c.MustGet("id").(float64)

	user, getPlansUser, err := r.service.Dashboard.GetDashboard(uint(idUser))
	if err != nil {
		helper.ResponseValidationErrorJson(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}

	var planResponse []response.PlanResponse
	for _, p := range getPlansUser {
		planResponse = append(planResponse, response.ConvertToPlanResponse(*p))
	}

	dashboardResponse := response.ConvertToDashboardResponse(user, planResponse)

	helper.ResponseSuccessJson(c, "success", dashboardResponse)
}
