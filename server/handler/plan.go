package handler

import (
	"net/http"
	"strconv"
	"web-krs/helper"
	"web-krs/request"
	"web-krs/response"

	"github.com/gin-gonic/gin"
)

func (r *rest) StorePlanHandler(c *gin.Context) {
	idUser := c.MustGet("id").(float64)

	var req request.PlanRequest

	err := c.ShouldBindJSON(&req)
	if err != nil {
		helper.ResponseValidationErrorJson(c, http.StatusBadRequest, err.Error(), nil)
		return
	}

	kelas, err := r.service.Plan.StorePlan(uint(idUser), req.IdKelas)
	if err != nil {
		helper.ResponseValidationErrorJson(c, http.StatusBadRequest, err.Error(), nil)
		return
	}

	helper.ResponseSuccessJson(c, "", kelas)
}

func (r *rest) FetchPlanHandler(c *gin.Context) {
	idUser := c.MustGet("id").(float64)

	planList, err := r.service.Plan.GetByIdUser(uint(idUser))
	if err != nil {
		helper.ResponseValidationErrorJson(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}

	var planResponse []response.PlanResponse
	for _, p := range planList {
		planResponse = append(planResponse, response.ConvertToPlanResponse(*p))
	}

	helper.ResponseSuccessJson(c, "success", planResponse)
}

func (r *rest) EditPlanHandler(c *gin.Context) {
	idUser := c.MustGet("id").(float64)
	idPlan := c.Param("id_plan")
	idPlanUint, _ := strconv.ParseUint(idPlan, 10, 32)

	var req request.PlanRequest

	err := c.ShouldBindJSON(&req)
	if err != nil {
		helper.ResponseValidationErrorJson(c, http.StatusBadRequest, err.Error(), nil)
		return
	}

	kelas, err := r.service.Plan.EditPlan(uint(idUser), uint(idPlanUint), req.IdKelas)
	if err != nil {
		helper.ResponseValidationErrorJson(c, http.StatusBadRequest, err.Error(), nil)
		return
	}

	helper.ResponseSuccessJson(c, "", kelas)
}

func (r *rest) DeletePlanHandler(c *gin.Context) {
	idUser := c.MustGet("id").(float64)
	idPlan := c.Param("id_plan")
	idPlanUint, _ := strconv.ParseUint(idPlan, 10, 32)

	err := r.service.Plan.DestroyPlan(uint(idUser), uint(idPlanUint))
	if err != nil {
		helper.ResponseValidationErrorJson(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}

	helper.ResponseSuccessJson(c, "delete success", "")
}
