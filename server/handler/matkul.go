package handler

import (
	"net/http"
	"strconv"
	"web-krs/helper"
	"web-krs/request"
	"web-krs/response"

	"github.com/gin-gonic/gin"
)

func (r *rest) StoreMatkulHandler(c *gin.Context) {
	var req request.MatkulRequest

	err := c.ShouldBindJSON(&req)
	if err != nil {
		helper.ResponseValidationErrorJson(c, http.StatusBadRequest, err.Error(), nil)
		return
	}

	matkul, err := r.service.Matkul.StoreMatkul(&req)
	if err != nil {
		helper.ResponseValidationErrorJson(c, http.StatusBadRequest, err.Error(), nil)
		return
	}

	MatkulResponse := response.ConvertToMatkulResponse(*matkul)

	helper.ResponseSuccessJson(c, "success", MatkulResponse)
}

func (r *rest) EditMatkulHandler(c *gin.Context) {
	var req request.MatkulRequest

	err := c.ShouldBindJSON(&req)
	if err != nil {
		helper.ResponseValidationErrorJson(c, http.StatusBadRequest, err.Error(), nil)
		return
	}

	id := c.Param("id")
	idUint, _ := strconv.ParseUint(id, 10, 32)

	matkul, err := r.service.Matkul.EditMatkul(uint(idUint), &req)
	if err != nil {
		helper.ResponseValidationErrorJson(c, http.StatusUnprocessableEntity, err.Error(), nil)
		return
	}

	MatkulResponse := response.ConvertToMatkulResponse(*matkul)

	helper.ResponseSuccessJson(c, "success", MatkulResponse)
}

func (r *rest) DetailMatkulHandler(c *gin.Context) {
	id := c.Param("id")
	idUint, _ := strconv.ParseUint(id, 10, 32)

	matkul, err := r.service.Matkul.GetByID(uint(idUint))
	if err != nil {
		helper.ResponseValidationErrorJson(c, http.StatusBadRequest, err.Error(), nil)
		return
	}

	helper.ResponseSuccessJson(c, "", matkul)
}

func (r *rest) DeleteMatkulHandler(c *gin.Context) {
	id := c.Param("id")
	idUint, _ := strconv.ParseUint(id, 10, 32)

	err := r.service.Matkul.DestroyMatkul(uint(idUint))
	if err != nil {
		helper.ResponseValidationErrorJson(c, http.StatusUnprocessableEntity, err.Error(), nil)
		return
	}

	helper.ResponseSuccessJson(c, "delete success", "")
}

func (r *rest) FetchMatkulHandler(c *gin.Context) {
	matkulList, err := r.service.Matkul.FetchMatkul()
	if err != nil {
		helper.ResponseValidationErrorJson(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}

	helper.ResponseSuccessJson(c, "success", matkulList)
}
