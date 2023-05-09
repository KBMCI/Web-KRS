package model

import (
	"github.com/gin-gonic/gin"
)

type (
	RandomKrs struct {
		ID          uint          `json:"id"`
		NamaMatkul  string        `json:"nama_matkul"`
		NamaKelas   string        `json:"nama_kelas"`
		JadwalKelas []JadwalKelas `json:"jadwal_kelas"`
	}

	FilterJadwal struct {
		Hari       string
		JamMulai   string
		JamSelesai string
	}

	FilterKelas struct {
		NamaMatkul string
		NamaKelas  string
	}

	RandomKrsService interface {
		FetchRandomKrs(idUser uint) ([][]RandomKrs, error)
		FilterRandomKrs(idUser uint, filterJadwal []FilterJadwal, filterKelas []FilterKelas) ([][]RandomKrs, error)
	}

	RandomKrsHandler interface {
		Mount(group *gin.RouterGroup)
	}
)
