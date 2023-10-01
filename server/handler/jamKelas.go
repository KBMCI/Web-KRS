package handler

import (
	"net/http"
	"strconv"
	"web-krs/helper"
	"web-krs/model"
	"web-krs/request"
	"web-krs/response"

	"github.com/gin-gonic/gin"
)

type jamKelasHandler struct {
	jamKelasService model.JamKelasService
}

func NewJamKelasHandler(jamKelasService model.JamKelasService) model.JamKelasHandler {
	return &jamKelasHandler{jamKelasService: jamKelasService}
}

func (j *jamKelasHandler) Mount(group *gin.RouterGroup) {
	group.POST("", j.StoreJamKelasHandler) // create
	group.GET("", j.FetchJamKelasHandler) //getAll
	group.GET("/:id", j.DetailJamKelasHandler) //getById
	group.PATCH("/:id", j.EditJamKelasHandler) //update
	group.DELETE("/:id", j.DeleteJamKelasHandler) //delete
}

// Belum melalui middleware
func (h *jamKelasHandler) StoreJamKelasHandler(c *gin.Context) {
	// role := c.MustGet("role").(string)
	// if role != "admin" {
	// 	helper.ResponseWhenFailOrError(c, http.StatusUnauthorized, errors.New("your role is not admin"))
	// 	return
	// }

	var req request.JamKelasRequest

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

	jamKelas, err := h.jamKelasService.StoreJamKelas(&req)
	if err !=nil {
		helper.ResponseErrorJson(c, http.StatusBadRequest, err)
		return
	}

	helper.ResponseSuccessJson(c, "success", jamKelas)
}

func (j *jamKelasHandler) FetchJamKelasHandler(c *gin.Context) {
	// role := c.MustGet("role").(string)
	// if role != "admin" {
	// 	helper.ResponseWhenFailOrError(c, http.StatusUnauthorized, errors.New("your role is not admin"))
	// 	return
	// }
	
	jamKelasList, err := j.jamKelasService.FetchJamKelas()
	if err != nil {
		helper.ResponseErrorJson(c, http.StatusInternalServerError, err)
		return
	}

	jamKelasListResponse := []response.JamKelasResponse{}

	for _, j := range jamKelasList {
		jamKelasListResponse = append(jamKelasListResponse, response.ConvertToJamKelasResponse(j))
	}

	helper.ResponseSuccessJson(c, "success", jamKelasListResponse)
}

func (j *jamKelasHandler) DetailJamKelasHandler(c *gin.Context) {
	// role := c.MustGet("role").(string)
	// if role != "admin" {
	// 	helper.ResponseWhenFailOrError(c, http.StatusUnauthorized, errors.New("your role is not admin"))
	// 	return
	// }
	
	id := c.Param("id")
	idUint, _ := strconv.ParseUint(id, 10, 32)

	jamKelas, err := j.jamKelasService.GetByID(uint(idUint))
	if err != nil {
		helper.ResponseErrorJson(c, http.StatusBadRequest, err)
		return
	}

	helper.ResponseSuccessJson(c, "", jamKelas)
}

func (j *jamKelasHandler) EditJamKelasHandler(c *gin.Context) {
	// role := c.MustGet("role").(string)
	// if role != "admin" {
	// 	helper.ResponseWhenFailOrError(c, http.StatusUnauthorized, errors.New("your role is not admin"))
	// 	return
	// }
	
	var req request.JamKelasRequest

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

	jamKelas, err := j.jamKelasService.EditJamKelas(uint(idUint), &req)
	if err != nil {
		helper.ResponseErrorJson(c, http.StatusUnprocessableEntity, err)
		return
	}

	helper.ResponseSuccessJson(c, "success", jamKelas)
}

func (j *jamKelasHandler) DeleteJamKelasHandler(c *gin.Context) {
	// role := c.MustGet("role").(string)
	// if role != "admin" {
	// 	helper.ResponseWhenFailOrError(c, http.StatusUnauthorized, errors.New("your role is not admin"))
	// 	return
	// }
	
	id := c.Param("id")
	idUint, _ := strconv.ParseUint(id, 10, 32)

	err := j.jamKelasService.DestroyJamKelas(uint(idUint))
	if err != nil {
		helper.ResponseErrorJson(c, http.StatusUnprocessableEntity, err)
		return
	}

	helper.ResponseSuccessJson(c, "delete success", "")
}