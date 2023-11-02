package model

import (
	"time"
	"web-krs/request"

	"github.com/gin-gonic/gin"
)

type (
	Matkul struct {
		ID             uint         `json:"id" gorm:"primaryKey"`
		Kode           string       `json:"kode_matkul" gorm:"unique;type:varchar(11)"`
		ProgramStudiID uint         `json:"id_program_studi"`
		Nama           string       `json:"nama" gorm:"type:varchar(100)"`
		TahunKurikulum int16        `json:"tahun_kurikulum"`
		Sks            int8         `json:"sks"`
		CreatedAt      time.Time    `json:"-"`
		UpdatedAt      time.Time    `json:"-"`
		Kelas          []Kelas      `json:"-" gorm:"foreignKey:KodeMatkul;references:Kode;constraint:OnDelete:CASCADE"` // Relationship: One-to-Many (One course has many classes)
		ProgramStudi   ProgramStudi `json:"program_studi"`
	}

	MatkulRepository interface {
		Create(matkul *Matkul) (*Matkul, error)
		UpdateByID(matkul *Matkul) (*Matkul, error)
		FindByID(id uint) (*Matkul, error)
		FindBySomeID(id []uint) ([]*Matkul, error)
		Delete(matkul *Matkul) (*Matkul, error)
		Fetch() ([]*Matkul, error)
	}

	MatkulService interface {
		StoreMatkul(req *request.MatkulRequest) (*Matkul, error)
		EditMatkul(id uint, req *request.MatkulRequest) (*Matkul, error)
		GetByID(id uint) (*Matkul, error)
		DestroyMatkul(id uint) error
		FetchMatkul() ([]*Matkul, error)
	}

	MatkulHandler interface {
		Mount(group *gin.RouterGroup)
	}
)
