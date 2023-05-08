package model

import (
	"time"

	"github.com/gin-gonic/gin"
)

type (
	Plan struct {
		ID        uint      `gorm:"primaryKey"`
		CreatedAt time.Time `json:"-"`
		UpdatedAt time.Time `json:"-"`
		Users     []*User   `gorm:"many2many:user_plans;"`
		Kelas     []*Kelas  `gorm:"many2many:plan_kelas;"`
	}

	PlanRepository interface {
		Create(user *User, plan *Plan) (*Plan, error)
		Fetch() ([]*Plan, error)
		FindByIdUser(idUser uint) ([]*Plan, error)
	}

	PlanService interface {
		StorePlan(idUser uint, idKelas []uint) ([]*Kelas, error)
		GetByIdUser(idUser uint) ([]*Plan, error)
	}

	PlanHandler interface {
		Mount(group *gin.RouterGroup)
	}
)
