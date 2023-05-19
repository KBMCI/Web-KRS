package model

import "github.com/gin-gonic/gin"

type (
	PlanningKrsService interface {
		Suggestion(id uint, idKelas []uint) ([][]RandomKrs, error)
	}

	PlanningKrsHandler interface {
		Mount(group *gin.RouterGroup)
	}
)