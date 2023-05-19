package handler

import (
	"net/http"
	"web-krs/helper"
	"web-krs/model"
	"web-krs/request"

	"github.com/gin-gonic/gin"
)

type planningKrsHandler struct {
	planningKrsService model.PlanningKrsService
}

func NewPlanningKrsHandler(planningKrsService model.PlanningKrsService) model.PlanningKrsHandler {
	return &planningKrsHandler{planningKrsService: planningKrsService}
}

func (h *planningKrsHandler) Mount(group *gin.RouterGroup) {
	group.POST("", h.SuggestionKrs)
}

func (h *planningKrsHandler) SuggestionKrs(c *gin.Context) {
	idUser  := c.MustGet("id").(float64)

	var req request.SuggestionRequest

	err := c.ShouldBindJSON(&req)
	if err != nil {
		helper.ResponseValidationErrorJson(c, "Error binding struct", err.Error())
		return
	}

	Random, err := h.planningKrsService.Suggestion(uint(idUser), req.IdKelas)
	if err != nil {
		helper.ResponseErrorJson(c, http.StatusBadRequest, err)
		return
	}

	helper.ResponseSuccessJson(c, "success", Random)

}