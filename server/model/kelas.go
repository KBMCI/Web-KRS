package model

import (
	"time"
	"web-krs/request"

	"github.com/gin-gonic/gin"
)

type (
	Kelas struct {
		// gorm.Model
		ID        	uint        `gorm:"primaryKey"`
		// KodeMatkul sebagai foreign key
		KodeMatkul	string		`json:"kode_matkul" gorm:"type:varchar(11)"`
		Nama 		string 		`json:"nama" gorm:"type:varchar(100)"`
		RuangKelas 	string 		`json:"ruang_kelas" gorm:"type:varchar(30)"`
		Hari		string 		`json:"hari" gorm:"type:varchar(11)"`
		JamMulai	string 		`json:"jam_mulai" gorm:"type:varchar(11)"`
		JamSelesai	string 		`json:"jam_selesai" gorm:"type:varchar(11)"`
		CreatedAt 	time.Time	`json:"-"`	
		UpdatedAt 	time.Time	`json:"-"`	
		Matkul		Matkul		`gorm:"foreignKey:KodeMatkul;references:KodeMatkul"`
	}

	KelasRepository interface {
		Create(kelas *Kelas) (*Kelas, error)
		UpdateByID(kelas *Kelas) (*Kelas, error)
		FindByID(id uint) (*Kelas, error)
		Delete(kelas *Kelas) (*Kelas, error)
		Fetch() ([]*Kelas, error)
	}

	KelasService interface {
		StoreKelas(req *request.KelasRequest) (*Kelas, error)
		EditKelas(id uint, req *request.KelasRequest) (*Kelas, error)
		GetByID(id uint) (*Kelas, error)
		DestroyKelas(id uint) error
		FetchKelas() ([]*Kelas, error)
	}

	KelasHandler interface {
		Mount(group *gin.RouterGroup)
	}
)