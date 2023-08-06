package handler

import (
	"net/http"
	"strings"
	"web-krs/helper"
	"web-krs/model"
	"web-krs/response"

	"github.com/gin-gonic/gin"
)

type randomKrsHandler struct {
	randomKrsService model.RandomKrsService
	planService      model.PlanService
}

func NewRandomKrsHandler(randomKrsService model.RandomKrsService, planService model.PlanService) model.RandomKrsHandler {
	return &randomKrsHandler{
		randomKrsService: randomKrsService,
		planService:      planService,
	}
}

// Mount implements model.RandomKrsHandler
func (r *randomKrsHandler) Mount(group *gin.RouterGroup) {
	group.GET("/", r.FilterRandomKrsHandler)
}

func (r *randomKrsHandler) FetchRandomKrsHandler(c *gin.Context) {
	idUser := c.MustGet("id").(float64)
	
	randomKrsList, err := r.randomKrsService.FetchRandomKrs(uint(idUser))
	if err != nil {
		helper.ResponseErrorJson(c, http.StatusInternalServerError, err)
		return
	}

	randomKrsResponse := response.ConvertFormatRandomKrsToReponseRandomKrs(r.planService, uint(idUser), randomKrsList)

	helper.ResponseSuccessJson(c, "success", randomKrsResponse)
}

func (r *randomKrsHandler) FilterRandomKrsHandler(c *gin.Context) {
	idUser := c.MustGet("id").(float64)
	
	kelasQueries := c.QueryArray("kelas[]")
	jadwalQueries := c.QueryArray("jadwal[]")

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

	filterKrsList, err := r.randomKrsService.FilterRandomKrs(uint(idUser), filterJadwals, filterKelas)
	if err != nil {
		helper.ResponseErrorJson(c, http.StatusInternalServerError, err)
		return
	}

	randomKrsResponse := response.ConvertFormatRandomKrsToReponseRandomKrs(r.planService, uint(idUser), filterKrsList)

	helper.ResponseSuccessJson(c, "success", randomKrsResponse)
}
