package main

import (
	"fmt"
	"log"
	"net/http"
	"web-krs/config"
	"web-krs/model"
	"web-krs/repository"

	"github.com/gin-gonic/gin"
)

type (
	server struct {
		httpServer *gin.Engine
		cfg        config.Config
	}

	Server interface {
		Run()
	}
)

func InitServer(cfg config.Config) Server {
	r := gin.Default()

	return &server{
		httpServer: r,
		cfg:        cfg,
	}
}

func (s *server) Run() {
	s.httpServer.GET("", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{
			"status":  "success",
			"message": "api connected",
		})
	})

	fakultasRepo := repository.NewFakultasRepository(s.cfg)

	// fakultas := model.Fakultas{
	// 	Nama: "Fakultas Peternakan",
	// }

	// data, _ := fakultasRepo.Create(&fakultas)
	// fakultasRepo.UpdateById(3, &fakultas)

	data, _ := fakultasRepo.Fetch()

	s.httpServer.GET("/test", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{
			"success": true,
			"message": "success",
			"data":    data,
		})
	})

	port := fmt.Sprintf(":%d", s.cfg.ServerPort())
	err := s.httpServer.Run(port)
	if err != nil {
		log.Fatal(err)
	}
}
