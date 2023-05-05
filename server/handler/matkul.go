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

type matkulHandler struct {
	matkulService model.MatkulService
}

func NewMatkulHandler(matkulService model.MatkulService) model.MatkulHandler {
	return &matkulHandler{matkulService: matkulService}
}

func (h *matkulHandler) Mount(group *gin.RouterGroup) {
	group.POST("", h.StoreMatkulHandler) // create
	group.PATCH("/:id", h.EditMatkulHandler) //update
	group.GET("/:id", h.DetailMatkulHandler) //getById
	group.DELETE("/:id", h.DeleteMatkulHandler) //delete
	group.GET("", h.FetchMatkulHandler) //getAll
}

func (h *matkulHandler) StoreMatkulHandler(c *gin.Context) {
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

	// error tidak terdeteksi
	if err != nil {
		helper.ResponseValidatorErrorJson(c, err)
		return
	}

	matkul, err := h.matkulService.StoreMatkul(&req)
	if err !=nil {
		helper.ResponseErrorJson(c, http.StatusBadRequest, err)
		return
	}

	MatkulResponse := response.ConvertToMatkulResponse(*matkul)

	helper.ResponseSuccessJson(c, "success", MatkulResponse)
}

func (h *matkulHandler) EditMatkulHandler(c *gin.Context) {
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

	if err != nil {
		helper.ResponseValidatorErrorJson(c, err)
		return
	}

	id := c.Param("id")
	idUint, _ := strconv.ParseUint(id, 10, 32)

	matkul, err := h.matkulService.EditMatkul(uint(idUint), &req)
	if err != nil {
		helper.ResponseErrorJson(c, http.StatusUnprocessableEntity, err)
		return
	}

	MatkulResponse := response.ConvertToMatkulResponse(*matkul)

	helper.ResponseSuccessJson(c, "success", MatkulResponse)
}

func (h *matkulHandler) DetailMatkulHandler(c *gin.Context) {
	role := c.MustGet("role").(string)
	if role != "admin" {
		helper.ResponseWhenFailOrError(c, http.StatusUnauthorized, errors.New("your role is not admin"))
		return
	}
	
	id := c.Param("id")
	idUint, _ := strconv.ParseUint(id, 10, 32)

	matkul, err := h.matkulService.GetByID(uint(idUint))
	if err != nil {
		helper.ResponseErrorJson(c, http.StatusBadRequest, err)
		return
	}

	helper.ResponseSuccessJson(c, "", matkul)
}

func (h *matkulHandler) DeleteMatkulHandler(c *gin.Context) {
	role := c.MustGet("role").(string)
	if role != "admin" {
		helper.ResponseWhenFailOrError(c, http.StatusUnauthorized, errors.New("your role is not admin"))
		return
	}
	
	id := c.Param("id")
	idUint, _ := strconv.ParseUint(id, 10, 32)

	err := h.matkulService.DestroyMatkul(uint(idUint))
	if err != nil {
		helper.ResponseErrorJson(c, http.StatusUnprocessableEntity, err)
		return
	}

	helper.ResponseSuccessJson(c, "delete success", "")
}

func (h *matkulHandler) FetchMatkulHandler(c *gin.Context) {
	role := c.MustGet("role").(string)
	if role != "admin" {
		helper.ResponseWhenFailOrError(c, http.StatusUnauthorized, errors.New("your role is not admin"))
		return
	}
	
	matkulList, err := h.matkulService.FetchMatkul()
	if err != nil {
		helper.ResponseErrorJson(c, http.StatusInternalServerError, err)
		return
	}

	helper.ResponseSuccessJson(c, "success", matkulList)
}