package handler

import (
	"net/http"
	"web-krs/helper"
	"web-krs/model"
	"web-krs/request"
	"web-krs/response"

	"github.com/gin-gonic/gin"
)

type planHandler struct {
	planService model.PlanService
}

func NewPlandHandler(planService model.PlanService) model.PlanHandler {
	return &planHandler{planService: planService}
}

// Mount implements model.PlanHandler
func (p *planHandler) Mount(group *gin.RouterGroup) {
	group.POST("", p.StorePlanHandler)
	group.GET("", p.FetchPlanHandler)
}

func (p *planHandler) StorePlanHandler(c *gin.Context)  {
	idUser := c.MustGet("id").(float64)
	
	var req request.PlanRequest
	
	err := c.ShouldBindJSON(&req)
	if err != nil {
		helper.ResponseValidationErrorJson(c, "Error binding struct", err.Error())
		return 
	}

	kelas, err := p.planService.StorePlan(uint(idUser), req.IdKelas);
	if err != nil {
		helper.ResponseErrorJson(c, http.StatusBadRequest, err)
		return
	}

	helper.ResponseSuccessJson(c, "", kelas)
}

func (p *planHandler) FetchPlanHandler(c *gin.Context)  {
	idUser := c.MustGet("id").(float64)

	planList, err := p.planService.GetByIdUser(uint(idUser))
	if err != nil {
		helper.ResponseErrorJson(c, http.StatusInternalServerError, err)
		return
	}

	var planResponse []response.PlanResponse
	for _, p := range planList {
		planResponse = append(planResponse, response.ConvertToPlanResponse(*p))
	}

	helper.ResponseSuccessJson(c, "success", planResponse)
}