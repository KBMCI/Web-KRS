package main

import (
	"time"
	"web-krs/entity"

	"github.com/gin-gonic/gin"
)

func main() {
	a := entity.Kelas{
		Id:         1,
		NamaKelas:  "A",
		Hari:       "Senin",
		JamMulai:   "07.00",
		JamSelesai: "08.39",
		RuangKelas: "F4.2",
		Matkul:     "Pengembangan Aplikasi Web",
		CreatedAt:  time.Now(),
		UpdatedAt:  time.Now(),
	}
	b := entity.Kelas{
		Id:         2,
		NamaKelas:  "B",
		Hari:       "Selasa",
		JamMulai:   "07.00",
		JamSelesai: "07.49",
		RuangKelas: "G1.2",
		Matkul:     "Pengembangan Aplikasi Web",
		CreatedAt:  time.Now(),
		UpdatedAt:  time.Now(),
	}
	kelas := [][]entity.Kelas{{ a,b }}

	app := gin.Default()
	app.GET("/test", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"data": kelas,
			"status": "success",
		})
	})
	app.Run()
}