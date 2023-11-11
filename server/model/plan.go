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
		Users     []*User   `gorm:"many2many:user_plans;constraint:OnDelete:CASCADE"`
		Kelas     []*Kelas  `gorm:"many2many:plan_kelas;constraint:OnDelete:CASCADE"`
	}

	PlanRepository interface {
		Create(user *User, plan *Plan) (*Plan, error)
		Fetch() ([]*Plan, error)
		FindByIdPlan(idPlan uint) (*Plan, error) 
		FindByIdUser(idUser uint) ([]*Plan, error)
		CountAllPlan() (int64, error)
		DeletePlan(user *User, plan *Plan) error
	}

	PlanService interface {
		StorePlan(idUser uint, idKelas []uint) ([]*Kelas, error)
		GetByIdUser(idUser uint) ([]*Plan, error)
		CountAllPlan() (int64, error)
		EditPlan(idUser uint, idPlan uint, idKelas []uint) ([]*Kelas, error)
		DestroyPlan(idUser uint, idPlan uint) error
	}

	PlanHandler interface {
		Mount(group *gin.RouterGroup)
	}
)
