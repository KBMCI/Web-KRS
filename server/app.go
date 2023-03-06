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

type server struct {
	httpServer *gin.Engine
	cfg config.Config
}

type Server interface {
	Run()
}

func InitServer(cfg config.Config) Server {
	route := gin.Default()

	route.Use(cors.New(cors.Config{
		AllowAllOrigins:  true,
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Length", "Content-Type", "Authorization"},
		AllowCredentials: true,
	}))

	return &server{
		httpServer: route,
		cfg: cfg,
	}
}

func (s *server) Run()  {


	s.httpServer.GET("/test", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
		  "message": "test success",
		})
	})

	userRepository := repository.NewUserRepositoty(s.cfg)
	userService := service.NewUserService(userRepository)
	userHandler := handler.NewUserHandler(userService)
	userGroup := s.httpServer.Group("/user")
	userHandler.Mount(userGroup)

	if err := s.httpServer.Run(); err != nil {
		log.Fatal(err)
	}



}