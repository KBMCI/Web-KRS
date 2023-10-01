package model

import (
	"web-krs/request"

	"github.com/gin-gonic/gin"
)

type (
	JamKelas struct {
		ID         uint   `json:"id" gorm:"primaryKey"`
		JamMulai   string `json:"jam_mulai" gorm:"type:varchar(5)"`
		JamSelesai string `json:"jam_selesai" gorm:"type:varchar(5)"`
	}

	JamKelasRepository interface {
		Create(jamKelas *JamKelas) (*JamKelas, error)
		UpdateByID(jamKelas *JamKelas) (*JamKelas, error)
		FindByID(id uint) (*JamKelas, error)
		Delete(jamKelas *JamKelas) (*JamKelas, error)
		Fetch() ([]*JamKelas, error)
	}

	JamKelasService interface {
		StoreJamKelas(req *request.JamKelasRequest) (*JamKelas, error)
		EditJamKelas(id uint, req *request.JamKelasRequest) (*JamKelas, error)
		GetByID(id uint) (*JamKelas, error)
		DestroyJamKelas(id uint) error
		FetchJamKelas() ([]*JamKelas, error)
	}

	JamKelasHandler interface {
		Mount(group *gin.RouterGroup)
	}
)