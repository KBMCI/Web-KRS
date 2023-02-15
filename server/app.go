package main

import (
	"net/http"
	"web-krs/config"
	"web-krs/repository"
	"web-krs/service"

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

	return &server{
		httpServer: route,
		cfg: cfg,
	}
}

func (s *server) Run()  {

	
	s.httpServer.GET("", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{
			"status" : true,
			"message" : "success",
		}) 
	})

	userRepository := repository.NewUserRepositoty(s.cfg)
	userService := service.NewUserService(userRepository)
	data, _ := userService.ReadAll()

	s.httpServer.GET("/", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{
			"success": true,
			"message": "success",
			"data":    data,
		})
	})

}