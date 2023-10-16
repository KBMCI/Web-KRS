package handler

import (
	"net/http"
	"strconv"
	"web-krs/helper"
	"web-krs/request"
	"web-krs/response"

	"github.com/gin-gonic/gin"
)

func (r *rest) StoreKelasHandler(c *gin.Context) {
	var req request.KelasRequest

	err := c.ShouldBindJSON(&req)
	if err != nil {
		helper.ResponseValidationErrorJson(c, "Error binding struct", err.Error())
		return
	}

	kelas, err := r.service.Kelas.StoreKelas(&req)
	if err != nil {
		helper.ResponseErrorJson(c, http.StatusBadRequest, err)
		return
	}

	kelasResponse := response.ConvertToKelasResponse(*kelas)

	helper.ResponseSuccessJson(c, "success", kelasResponse)
}

func (r *rest) EditKelasHandler(c *gin.Context) {
	var req request.KelasRequest

	err := c.ShouldBindJSON(&req)
	if err != nil {
		helper.ResponseValidationErrorJson(c, "Error binding struct", err.Error())
		return
	}

	idKelas := c.Param("id_kelas")
	idKelasUint, _ := strconv.ParseUint(idKelas, 10, 32)

	idJadwal := c.Param("id_jadwal")
	idJadwalUint, _ := strconv.ParseUint(idJadwal, 10, 32)

	kelas, err := r.service.Kelas.EditKelas(uint(idKelasUint), uint(idJadwalUint), &req)
	if err != nil {
		helper.ResponseErrorJson(c, http.StatusUnprocessableEntity, err)
		return
	}

	kelasResponse := response.ConvertToKelasResponse(*kelas)

	helper.ResponseSuccessJson(c, "success", kelasResponse)
}

func (r *rest) DetailKelasHandler(c *gin.Context) {
	id := c.Param("id")
	idUint, _ := strconv.ParseUint(id, 10, 32)

	kelas, err := r.service.Kelas.GetByID(uint(idUint))
	if err != nil {
		helper.ResponseErrorJson(c, http.StatusBadRequest, err)
		return
	}

	kelasResponse := response.ConvertToKelasResponseDetail(*kelas)

	helper.ResponseSuccessJson(c, "", kelasResponse)
}

func (r *rest) DetailJadwalKelasHandler(c *gin.Context) {
	idKelas := c.Param("id")
	idKelasUint, _ := strconv.ParseUint(idKelas, 10, 32)

	idJadwal := c.Param("id_jadwal")
	idJadwalUint, _ := strconv.ParseUint(idJadwal, 10, 32)

	jadwal, err := r.service.Kelas.GetByIDJadwal(uint(idJadwalUint), uint(idKelasUint))
	if err != nil {
		helper.ResponseErrorJson(c, http.StatusBadRequest, err)
		return
	}

	jadwalResponse := response.ConvertToJadwalResponse(*jadwal)

	helper.ResponseSuccessJson(c, "", jadwalResponse)
}

func (r *rest) DeleteKelasHandler(c *gin.Context) {
	id := c.Param("id")
	idUint, _ := strconv.ParseUint(id, 10, 32)

	err := r.service.Kelas.DestroyKelas(uint(idUint))
	if err != nil {
		helper.ResponseErrorJson(c, http.StatusUnprocessableEntity, err)
		return
	}

	helper.ResponseSuccessJson(c, "success", "")
}

func (r *rest) FetchKelasHandler(c *gin.Context) {
	kelasList, err := r.service.Kelas.FetchKelas()
	if err != nil {
		helper.ResponseErrorJson(c, http.StatusInternalServerError, err)
		return
	}

	var kelasResponses []response.KelasResponseDetail

	for _, k := range kelasList {
		kelasResponse := response.ConvertToKelasResponseDetail(*k)

		kelasResponses = append(kelasResponses, kelasResponse)
	}

	helper.ResponseSuccessJson(c, "success", kelasResponses)
}
