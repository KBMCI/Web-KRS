package handler

import (
	"net/http"
	"web-krs/helper"
	"web-krs/model"
	"web-krs/response"

	"github.com/gin-gonic/gin"
)

type dashboardHandler struct {
	dashboardService model.DashboardService
}

func NewDashboardHandler(dasboadService model.DashboardService) model.DashboardHandler {
	return &dashboardHandler{dashboardService: dasboadService}
}

func (h *dashboardHandler) Mount(group *gin.RouterGroup) {
	group.GET("", h.DashboardHandler)
}

func (h *dashboardHandler) DashboardHandler(c *gin.Context) {
	idUser := c.MustGet("id").(float64)

	fetchMatkul, getPlansUser, err := h.dashboardService.GetDashboard(uint(idUser))
	if err != nil {
		helper.ResponseErrorJson(c, http.StatusInternalServerError, err)
		return
	}

	var planResponse []response.PlanResponse
	for _, p := range getPlansUser {
		planResponse = append(planResponse, response.ConvertToPlanResponse(*p))
	}

	helper.ResponseSuccessJson(c, "success", gin.H{
		"matkuls": fetchMatkul,
		"user_plans": planResponse,
	})
}