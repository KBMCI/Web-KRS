package handler

import (
	"errors"
	"net/http"
	"strconv"
	"web-krs/helper"
	"web-krs/request"
	"web-krs/response"

	"github.com/gin-gonic/gin"
)

func (r *rest) StoreMatkulHandler(c *gin.Context) {
	role := c.MustGet("role").(string)
	if role != "admin" {
		helper.ResponseWhenFailOrError(c, http.StatusUnauthorized, errors.New("your role is not admin"))
		return
	}

	var req request.MatkulRequest

	err := c.ShouldBindJSON(&req)
	if err != nil {
		helper.ResponseValidationErrorJson(c, "Error binding struct", err.Error())
		return
	}

	matkul, err := r.service.Matkul.StoreMatkul(&req)
	if err != nil {
		helper.ResponseErrorJson(c, http.StatusBadRequest, err)
		return
	}

	MatkulResponse := response.ConvertToMatkulResponse(*matkul)

	helper.ResponseSuccessJson(c, "success", MatkulResponse)
}

func (r *rest) EditMatkulHandler(c *gin.Context) {
	role := c.MustGet("role").(string)
	if role != "admin" {
		helper.ResponseWhenFailOrError(c, http.StatusUnauthorized, errors.New("your role is not admin"))
		return
	}

	var req request.MatkulRequest

	err := c.ShouldBindJSON(&req)
	if err != nil {
		helper.ResponseValidationErrorJson(c, "Error binding struct", err.Error())
		return
	}

	id := c.Param("id")
	idUint, _ := strconv.ParseUint(id, 10, 32)

	matkul, err := r.service.Matkul.EditMatkul(uint(idUint), &req)
	if err != nil {
		helper.ResponseErrorJson(c, http.StatusUnprocessableEntity, err)
		return
	}

	MatkulResponse := response.ConvertToMatkulResponse(*matkul)

	helper.ResponseSuccessJson(c, "success", MatkulResponse)
}

func (r *rest) DetailMatkulHandler(c *gin.Context) {
	role := c.MustGet("role").(string)
	if role != "admin" {
		helper.ResponseWhenFailOrError(c, http.StatusUnauthorized, errors.New("your role is not admin"))
		return
	}

	id := c.Param("id")
	idUint, _ := strconv.ParseUint(id, 10, 32)

	matkul, err := r.service.Matkul.GetByID(uint(idUint))
	if err != nil {
		helper.ResponseErrorJson(c, http.StatusBadRequest, err)
		return
	}

	helper.ResponseSuccessJson(c, "", matkul)
}

func (r *rest) DeleteMatkulHandler(c *gin.Context) {
	role := c.MustGet("role").(string)
	if role != "admin" {
		helper.ResponseWhenFailOrError(c, http.StatusUnauthorized, errors.New("your role is not admin"))
		return
	}

	id := c.Param("id")
	idUint, _ := strconv.ParseUint(id, 10, 32)

	err := r.service.Matkul.DestroyMatkul(uint(idUint))
	if err != nil {
		helper.ResponseErrorJson(c, http.StatusUnprocessableEntity, err)
		return
	}

	helper.ResponseSuccessJson(c, "delete success", "")
}

func (r *rest) FetchMatkulHandler(c *gin.Context) {
	role := c.MustGet("role").(string)
	if role != "admin" {
		helper.ResponseWhenFailOrError(c, http.StatusUnauthorized, errors.New("your role is not admin"))
		return
	}

	matkulList, err := r.service.Matkul.FetchMatkul()
	if err != nil {
		helper.ResponseErrorJson(c, http.StatusInternalServerError, err)
		return
	}

	helper.ResponseSuccessJson(c, "success", matkulList)
}
