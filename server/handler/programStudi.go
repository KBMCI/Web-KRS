package handler

import (
	"net/http"
	"strconv"
	"web-krs/helper"
	"web-krs/request"
	"web-krs/response"

	"github.com/gin-gonic/gin"
)

func (r *rest) StoreProdiHandler(c *gin.Context) {
	var req request.ProgramStudiRequest

	err := c.ShouldBindJSON(&req)
	if err != nil {
		helper.ResponseValidationErrorJson(c, http.StatusBadRequest, err.Error(), nil)
		return
	}

	programStudi, err := r.service.ProgramStudi.StoreProgramStudi(&req)
	if err != nil {
		helper.ResponseValidationErrorJson(c, http.StatusBadRequest, err.Error(), nil)
		return
	}

	prodiResponse := response.ConvertToProdiResponseDetail(*programStudi)

	helper.ResponseSuccessJson(c, "success", prodiResponse)
}

func (r *rest) EditProdiHandler(c *gin.Context) {
	var req request.ProgramStudiRequest

	err := c.ShouldBindJSON(&req)
	if err != nil {
		helper.ResponseValidationErrorJson(c, http.StatusBadRequest, err.Error(), nil)
		return
	}

	id := c.Param("id")
	idUint, _ := strconv.ParseUint(id, 10, 32)

	programStudi, err := r.service.ProgramStudi.EditProgramStudi(uint(idUint), &req)
	if err != nil {
		helper.ResponseValidationErrorJson(c, http.StatusUnprocessableEntity, err.Error(), nil)
		return
	}

	prodiResponse := response.ConvertToProdiResponseDetail(*programStudi)
	prodiResponse.Fakultas.ID = req.FakultasID

	helper.ResponseSuccessJson(c, "success", prodiResponse)
}

func (r *rest) DetailProdiHandler(c *gin.Context) {
	id := c.Param("id")
	idUint, _ := strconv.ParseUint(id, 10, 32)

	programStudi, err := r.service.ProgramStudi.GetByID(uint(idUint))
	if err != nil {
		helper.ResponseValidationErrorJson(c, http.StatusBadRequest, err.Error(), nil)
	}

	prodiResponse := response.ConvertToProdiResponseDetail(*programStudi)

	helper.ResponseSuccessJson(c, "", prodiResponse)
}

func (r *rest) DeleteProdiHandler(c *gin.Context) {
	id := c.Param("id")
	idUint, _ := strconv.ParseUint(id, 10, 32)

	err := r.service.ProgramStudi.DestroyProgramStudi(uint(idUint))
	if err != nil {
		helper.ResponseValidationErrorJson(c, http.StatusUnprocessableEntity, err.Error(), nil)
		return
	}

	helper.ResponseSuccessJson(c, "success", nil)
}

func (r *rest) FetchProdiHandler(c *gin.Context) {
	prodiList, err := r.service.ProgramStudi.FetchProgramStudi()
	if err != nil {
		helper.ResponseValidationErrorJson(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}

	var prodiResponses []response.ProdiResponseDetail

	for _, p := range prodiList {
		prodiResponse := response.ConvertToProdiResponseDetail(*p)

		prodiResponses = append(prodiResponses, prodiResponse)
	}

	helper.ResponseSuccessJson(c, "success", prodiResponses)
}
