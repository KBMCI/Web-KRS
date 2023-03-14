package main

import (
	"log"
	"net/http"
	"web-krs/config"
	"web-krs/handler"
	"web-krs/repository"
	"web-krs/service"
	"github.com/gin-contrib/cors"
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
	
	r.Use(cors.New(cors.Config{
		AllowAllOrigins:  true,
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Length", "Content-Type", "Authorization"},
		AllowCredentials: true,
	}))

	return &server{
		httpServer: r,
		cfg:		cfg,
	}
}

func(s *server) Run() {

	s.httpServer.GET("/", func(c *gin.Context) {
		s.cfg.Database()
		c.JSON(http.StatusOK, gin.H{
		  "message": "test success",
		})
	})

	matkulRepo := repository.NewMatkulRepository(s.cfg)
	matkulService := service.NewMatkulService(matkulRepo)
	matkulHandler := handler.NewMatkulHandler(matkulService)
	matkulGroup := s.httpServer.Group("/matkul")
	matkulHandler.Mount(matkulGroup)

	kelasRepo := repository.NewKelasRepository(s.cfg)
	kelasService := service.NewKelasService(kelasRepo)
	kelasHandler := handler.NewKelasHandler(kelasService)
	kelasGroup := s.httpServer.Group("/kelas")
	kelasHandler.Mount(kelasGroup)

	userRepository := repository.NewUserRepositoty(s.cfg)
	userService := service.NewUserService(userRepository)
	userHandler := handler.NewUserHandler(userService)
	userGroup := s.httpServer.Group("/user")
	userHandler.Mount(userGroup)

	if err := s.httpServer.Run(); err != nil {
		log.Fatal(err)
	}
}
