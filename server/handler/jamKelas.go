package handler

import (
	"net/http"
	"strconv"
	"web-krs/helper"
	"web-krs/request"
	"web-krs/response"

	"github.com/gin-gonic/gin"
)

func (r *rest) StoreJamKelasHandler(c *gin.Context) {
	var req request.JamKelasRequest

	err := c.ShouldBindJSON(&req)
	if err != nil {
		helper.ResponseValidationErrorJson(c, http.StatusBadRequest, err.Error(), nil)
		return
	}

	jamKelas, err := r.service.JamKelas.StoreJamKelas(&req)
	if err != nil {
		helper.ResponseValidationErrorJson(c, http.StatusBadRequest, err.Error(), nil)
		return
	}

	helper.ResponseSuccessJson(c, "success", jamKelas)
}

func (r *rest) FetchJamKelasHandler(c *gin.Context) {
	jamKelasList, err := r.service.JamKelas.FetchJamKelas()
	if err != nil {
		helper.ResponseValidationErrorJson(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}

	jamKelasListResponse := []response.JamKelasResponse{}

	for _, j := range jamKelasList {
		jamKelasListResponse = append(jamKelasListResponse, response.ConvertToJamKelasResponse(j))
	}

	helper.ResponseSuccessJson(c, "success", jamKelasListResponse)
}

func (r *rest) DetailJamKelasHandler(c *gin.Context) {
	id := c.Param("id")
	idUint, _ := strconv.ParseUint(id, 10, 32)

	jamKelas, err := r.service.JamKelas.GetByID(uint(idUint))
	if err != nil {
		helper.ResponseValidationErrorJson(c, http.StatusBadRequest, err.Error(), nil)
		return
	}

	helper.ResponseSuccessJson(c, "", jamKelas)
}

func (r *rest) EditJamKelasHandler(c *gin.Context) {
	var req request.JamKelasRequest

	err := c.ShouldBindJSON(&req)
	if err != nil {
		helper.ResponseValidationErrorJson(c, http.StatusBadRequest, err.Error(), nil)
		return
	}

	id := c.Param("id")
	idUint, _ := strconv.ParseUint(id, 10, 32)

	jamKelas, err := r.service.JamKelas.EditJamKelas(uint(idUint), &req)
	if err != nil {
		helper.ResponseValidationErrorJson(c, http.StatusUnprocessableEntity, err.Error(), nil)
		return
	}

	helper.ResponseSuccessJson(c, "success", jamKelas)
}

func (r *rest) DeleteJamKelasHandler(c *gin.Context) {
	id := c.Param("id")
	idUint, _ := strconv.ParseUint(id, 10, 32)

	err := r.service.JamKelas.DestroyJamKelas(uint(idUint))
	if err != nil {
		helper.ResponseValidationErrorJson(c, http.StatusUnprocessableEntity, err.Error(), nil)
		return
	}

	helper.ResponseSuccessJson(c, "delete success", "")
}
