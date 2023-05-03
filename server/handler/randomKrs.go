package handler

import (
	"net/http"
	"strings"
	"web-krs/helper"
	"web-krs/model"

	"github.com/gin-gonic/gin"
)

type randomKrsHandler struct {
	randomKrsService model.RandomKrsService
}


func NewRandomKrsHandler(randomKrsService model.RandomKrsService) model.RandomKrsHandler {
	return &randomKrsHandler{
		randomKrsService: randomKrsService,
	}
}

// Mount implements model.RandomKrsHandler
func (r *randomKrsHandler) Mount(group *gin.RouterGroup) {
	group.GET("", r.FetchRandomKrsHandler) //getAll
	group.GET("/filter", r.FilterRandomKrsHandler) //getByFilter
}

func (r *randomKrsHandler) FetchRandomKrsHandler(c *gin.Context)  {
	randomKrsList, err := r.randomKrsService.FetchRandomKrs()
	if err != nil {
		helper.ResponseErrorJson(c, http.StatusInternalServerError, err)
		return
	}

	helper.ResponseSuccessJson(c, "success", randomKrsList)
}

func (r *randomKrsHandler) FilterRandomKrsHandler(c *gin.Context)  {
	kelasQueries := c.QueryArray("kelas")
	jadwalQueries := c.QueryArray("jadwal")

	var filterKelas []model.FilterKelas
	var filterJadwals []model.FilterJadwal

	for _, kelasQuery := range kelasQueries {
		filterKelas = append(filterKelas, model.FilterKelas{
			NamaMatkul: strings.Split(kelasQuery, "-")[0],
			NamaKelas:  strings.Split(kelasQuery, "-")[1],
		})
	}

	for _, jadwalQuery := range jadwalQueries {
		filterJadwals = append(filterJadwals, model.FilterJadwal{
			Hari:       strings.Split(jadwalQuery, "-")[0],
			JamMulai:   strings.Split(jadwalQuery, "-")[1],
			JamSelesai: strings.Split(jadwalQuery, "-")[2],
		})
	}

	filterKrsList, err := r.randomKrsService.FilterRandomKrs(filterJadwals, filterKelas)
	if err != nil {
		helper.ResponseErrorJson(c, http.StatusInternalServerError, err)
		return 
	}
	
	helper.ResponseSuccessJson(c, "success", filterKrsList)
}