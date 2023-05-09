package handler

import (
	"net/http"
	"strconv"
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
	group.PATCH("/:id_plan", p.EditPlanHandler)
	group.DELETE("/:id_plan", p.DeletePlanHandler)
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

func (p *planHandler) EditPlanHandler(c *gin.Context) {
	idUser := c.MustGet("id").(float64)
	idPlan := c.Param("id_plan")
	idPlanUint, _ := strconv.ParseUint(idPlan, 10, 32)

	var req request.PlanRequest
	
	err := c.ShouldBindJSON(&req)
	if err != nil {
		helper.ResponseValidationErrorJson(c, "Error binding struct", err.Error())
		return 
	}

	kelas, err := p.planService.EditPlan(uint(idUser), uint(idPlanUint), req.IdKelas)
	if err != nil {
		helper.ResponseErrorJson(c, http.StatusBadRequest, err)
		return
	}

	helper.ResponseSuccessJson(c, "", kelas)
}

func (p *planHandler) DeletePlanHandler(c *gin.Context) {
	idUser := c.MustGet("id").(float64)
	idPlan := c.Param("id_plan")
	idPlanUint, _ := strconv.ParseUint(idPlan, 10, 32)

	err := p.planService.DestroyPlan(uint(idUser), uint(idPlanUint))
	if err != nil {
		helper.ResponseErrorJson(c, http.StatusInternalServerError, err)
		return
	}

	helper.ResponseSuccessJson(c, "delete success", "")
}