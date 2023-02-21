package handler

import (
	"net/http"
	"strconv"
	"web-krs/helper"
	"web-krs/model"
	"web-krs/request"

	"github.com/gin-gonic/gin"
)

type matkulHandler struct {
	matkulService model.MatkulService
}

type MatkulHandler interface {
	Mount(group *gin.RouterGroup)
}

func NewMatkulHandler(matkulService model.MatkulService) MatkulHandler {
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

	matkul, err := h.matkulService.StoreMatkul(&req)
	if err !=nil {
		helper.ResponseErrorJson(c, http.StatusBadRequest, err)
		return
	}

	helper.ResponseSuccessJson(c, "success", matkul)
}

func (h *matkulHandler) EditMatkulHandler(c *gin.Context) {
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

	idString := c.Param("id")
	id, _ := strconv.Atoi(idString)

	matkul, err := h.matkulService.EditMatkul(id, &req)
	if err != nil {
		helper.ResponseErrorJson(c, http.StatusUnprocessableEntity, err)
		return
	}

	helper.ResponseSuccessJson(c, "success edit", matkul)
}

func (h *matkulHandler) DetailMatkulHandler(c *gin.Context) {
	idString := c.Param("id")
	id, _ := strconv.Atoi(idString)

	matkul, err := h.matkulService.GetByID(id)
	if err != nil {
		helper.ResponseErrorJson(c, http.StatusBadRequest, err)
		return
	}

	helper.ResponseSuccessJson(c, "", matkul)
}

func (h *matkulHandler) DeleteMatkulHandler(c *gin.Context) {
	idString := c.Param("id")
	id, _ := strconv.Atoi(idString)

	err := h.matkulService.DestroyMatkul(id)
	if err != nil {
		helper.ResponseErrorJson(c, http.StatusUnprocessableEntity, err)
		return
	}

	helper.ResponseSuccessJson(c, "delete success", "")
}

func (h *matkulHandler) FetchMatkulHandler(c *gin.Context) {
	matkulList, err := h.matkulService.FetchMatkul()
	if err != nil {
		helper.ResponseErrorJson(c, http.StatusInternalServerError, err)
		return
	}

	helper.ResponseSuccessJson(c, "success", matkulList)
}