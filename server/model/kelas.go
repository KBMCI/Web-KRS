package model

import (
	"time"
	"web-krs/request"

	"github.com/gin-gonic/gin"
)

type (
	Kelas struct {
		// gorm.Model
		ID uint `gorm:"primaryKey"`
		// KodeMatkul sebagai foreign key
		KodeMatkul  string        `json:"kode_matkul" gorm:"type:varchar(11)"`
		Nama        string        `json:"nama" gorm:"type:varchar(100)"`
		CreatedAt   time.Time     `json:"-"`
		UpdatedAt   time.Time     `json:"-"`
		Matkul      Matkul        `json:"-" gorm:"foreignKey:KodeMatkul;references:Kode"`
		JadwalKelas []JadwalKelas `json:"jadwal_kelas" gorm:"foreignKey:IDKelas;references:ID;constraint:OnDelete:CASCADE"`
	}

	JadwalKelas struct {
		ID         uint   `json:"id" gorm:"primaryKey"`
		IDKelas    uint   `json:"-"`
		Hari       string `json:"hari" gorm:"type:varchar(11)"`
		JamMulai   string `json:"jam_mulai" gorm:"type:varchar(11)"`
		JamSelesai string `json:"jam_selesai" gorm:"type:varchar(11)"`
		RuangKelas string `json:"ruang_kelas" gorm:"type:varchar(30)"`
		Kelas      Kelas  `json:"-" gorm:"foreignKey:IDKelas;references:ID"`
	}

	KelasRepository interface {
		Create(kelas *Kelas) (*Kelas, error)
		UpdateByKelasID(kelas *Kelas) (*Kelas, error)
		FindByID(id uint) (*Kelas, error)
		FindByJadwalID(idJadwal uint, idKelas uint) (*JadwalKelas, error)
		FindBySomeID(id []uint) ([]*Kelas, error)
		Fetch() ([]*Kelas, error)
		CountAllKelas() (int64, error)
		UpdateByJadwalID(jadwalKelas *JadwalKelas) (*JadwalKelas, error)
		Delete(kelas *Kelas) (*Kelas, error)
	}

	KelasService interface {
		StoreKelas(req *request.KelasRequest) (*Kelas, error)
		GetByID(id uint) (*Kelas, error)
		GetByIDJadwal(idJadwal uint, idKelas uint) (*JadwalKelas, error)
		FetchKelas() ([]*Kelas, error)
		CountAllKelas() (int64, error)
		EditKelas(idKelas uint, idJadwal uint, req *request.KelasRequest) (*Kelas, error)
		DestroyKelas(id uint) error
	}

	KelasHandler interface {
		Mount(group *gin.RouterGroup)
	}
)
