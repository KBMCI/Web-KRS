package handler

import (
	"net/http"
	"strconv"
	"web-krs/helper"
	"web-krs/request"

	"github.com/gin-gonic/gin"
)

func (r *rest) StoreFakultasHandler(c *gin.Context) {
	var req request.FakultasRequest

	err := c.ShouldBindJSON(&req)
	if err != nil {
		helper.ResponseValidationErrorJson(c, http.StatusBadRequest, "Error binding struct", err.Error())
		return
	}

	fakultas, err := r.service.Fakultas.StoreFakultas(&req)
	if err != nil {
		helper.ResponseValidationErrorJson(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}

	helper.ResponseSuccessJson(c, "success", fakultas)
}

func (r *rest) EditFakultasHandler(c *gin.Context) {
	var req request.FakultasRequest

	err := c.ShouldBindJSON(&req)
	if err != nil {
		helper.ResponseValidationErrorJson(c, http.StatusBadRequest, err.Error(), nil)
		return
	}

	id := c.Param("id")
	idUint, _ := strconv.ParseUint(id, 10, 32)

	fakultas, err := r.service.Fakultas.EditFakultas(uint(idUint), &req)
	if err != nil {
		helper.ResponseValidationErrorJson(c, http.StatusUnprocessableEntity, err.Error(), nil)
		return
	}

	helper.ResponseSuccessJson(c, "success", fakultas)
}

func (r *rest) DetailFakultasHandler(c *gin.Context) {
	id := c.Param("id")
	idUint, _ := strconv.ParseUint(id, 10, 32)

	fakultas, err := r.service.Fakultas.GetByID(uint(idUint))
	if err != nil {
		helper.ResponseValidationErrorJson(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}

	helper.ResponseSuccessJson(c, "", fakultas)
}

func (r *rest) FetchFakultasHandler(c *gin.Context) {
	fakultasList, err := r.service.Fakultas.FetchFakultas()
	if err != nil {
		helper.ResponseValidationErrorJson(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}

	helper.ResponseSuccessJson(c, "success", fakultasList)
}

func (r *rest) DeleteFakultasHandler(c *gin.Context) {
	id := c.Param("id")
	idUint, _ := strconv.ParseUint(id, 10, 32)

	err := r.service.Fakultas.DestroyFakultas(uint(idUint))
	if err != nil {
		helper.ResponseValidationErrorJson(c, http.StatusUnprocessableEntity, err.Error(), nil)
		return
	}

	helper.ResponseSuccessJson(c, "success", "")
}
