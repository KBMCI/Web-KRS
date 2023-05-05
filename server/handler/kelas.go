package handler

import (
	"errors"
	"net/http"
	"strconv"
	"web-krs/helper"
	"web-krs/model"
	"web-krs/request"
	"web-krs/response"

	"github.com/gin-gonic/gin"
)

type kelasHandler struct {
	kelasService model.KelasService
}

func NewKelasHandler(kelasService model.KelasService) model.KelasHandler {
	return &kelasHandler{kelasService: kelasService}
}

func (h *kelasHandler) Mount(group *gin.RouterGroup) {
	group.POST("", h.StoreKelasHandler) // create
	group.PATCH("/:id_kelas/jadwal/:id_jadwal", h.EditKelasHandler) //update
	group.GET("/:id", h.DetailKelasHandler) //getById
	group.DELETE("/:id", h.DeleteKelasHandler) //delete
	group.GET("", h.FetchKelasHandler) //getAll
}

func (h *kelasHandler) StoreKelasHandler(c *gin.Context) {
	role := c.MustGet("role").(string)
	if role != "admin" {
		helper.ResponseWhenFailOrError(c, http.StatusUnauthorized, errors.New("your role is not admin"))
		return
	}
	
	var req request.KelasRequest

	err := c.ShouldBindJSON(&req)
	if err != nil {
		helper.ResponseValidationErrorJson(c, "Error binding struct", err.Error())
		return
	}

	kelas, err := h.kelasService.StoreKelas(&req)
	if err != nil {
		helper.ResponseErrorJson(c, http.StatusBadRequest, err)
		return
	}

	kelasResponse := response.ConvertToKelasResponse(*kelas)

	helper.ResponseSuccessJson(c, "success", kelasResponse)
}

func (h *kelasHandler) EditKelasHandler(c *gin.Context) {
	role := c.MustGet("role").(string)
	if role != "admin" {
		helper.ResponseWhenFailOrError(c, http.StatusUnauthorized, errors.New("your role is not admin"))
		return
	}

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
	
	kelas, err := h.kelasService.EditKelas(uint(idKelasUint), uint(idJadwalUint), &req)
	if err != nil {
		helper.ResponseErrorJson(c, http.StatusUnprocessableEntity, err)
		return
	}

	kelasResponse := response.ConvertToKelasResponse(*kelas)

	helper.ResponseSuccessJson(c, "success", kelasResponse)
}

func (h *kelasHandler) DetailKelasHandler(c *gin.Context) {
	role := c.MustGet("role").(string)
	if role != "admin" {
		helper.ResponseWhenFailOrError(c, http.StatusUnauthorized, errors.New("your role is not admin"))
		return
	}

	id := c.Param("id")
	idUint, _ := strconv.ParseUint(id, 10, 32)

	kelas, err := h.kelasService.GetByID(uint(idUint))
	if err != nil {
		helper.ResponseErrorJson(c, http.StatusBadRequest, err)
		return
	}

	kelasResponse := response.ConvertToKelasResponseDetail(*kelas)

	helper.ResponseSuccessJson(c, "", kelasResponse)
}

func (h *kelasHandler) DeleteKelasHandler(c *gin.Context) {
	role := c.MustGet("role").(string)
	if role != "admin" {
		helper.ResponseWhenFailOrError(c, http.StatusUnauthorized, errors.New("your role is not admin"))
		return
	}

	id := c.Param("id")
	idUint, _ := strconv.ParseUint(id, 10, 32)

	err := h.kelasService.DestroyKelas(uint(idUint))
	if err != nil {
		helper.ResponseErrorJson(c, http.StatusUnprocessableEntity, err)
		return
	}

	helper.ResponseSuccessJson(c, "success", "")
}

func (h *kelasHandler) FetchKelasHandler(c *gin.Context) {
	role := c.MustGet("role").(string)
	if role != "admin" {
		helper.ResponseWhenFailOrError(c, http.StatusUnauthorized, errors.New("your role is not admin"))
		return
	}
	
	kelasList, err := h.kelasService.FetchKelas()
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
