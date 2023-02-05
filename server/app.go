package main

import (
	"fmt"
	"log"
	"net/http"
	"web-krs/config"

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



	port := fmt.Sprintf(":%d", s.cfg.ServerPort())
	err := s.httpServer.Run(port)
	if err != nil {
		log.Fatal(err)
	}
}
