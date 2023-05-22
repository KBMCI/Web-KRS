package model

import "github.com/gin-gonic/gin"

type (
	DashboardService interface {
		GetDashboard(idUser uint) ([]*Matkul, []*Plan, error)
	}

	DashboardHandler interface {
		Mount(group *gin.RouterGroup)
	}
)