package main

import (
	"log"
	"net/http"
	"web-krs/config"
	"web-krs/handler"
	"web-krs/repository"
	"web-krs/service"

	"github.com/gin-gonic/gin"
)

type (
	server struct {
		httpServer *gin.Engine
		cfg			config.Config
	}

	Server interface {
		Run()
	}
)

func InitServer(cfg config.Config) Server {
	r := gin.Default()
	
	return &server{
		httpServer: r,
		cfg:		cfg,
	}
}

func(s *server) Run() {

	s.httpServer.GET("/test", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
		  "message": "test success",
		})
	})

	matkulRepo := repository.NewMatkulRepository(s.cfg)
	matkulService := service.NewMatkulService(matkulRepo)
	matkulHandler := handler.NewMatkulHandler(matkulService)
	matkulGroup := s.httpServer.Group("/matkul")
	matkulHandler.Mount(matkulGroup)

	if err := s.httpServer.Run(); err != nil {
		log.Fatal(err)
	}
}
