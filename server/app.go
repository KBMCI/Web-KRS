package main

import (
	"log"
	"net/http"
	"web-krs/config"
	"web-krs/handler"
	"web-krs/helper"
	"web-krs/middleware"
	"web-krs/repository"
	"web-krs/service"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type (
	server struct {
		httpServer *gin.Engine
		database   *gorm.DB
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
		database:   cfg.Database(),
	}
}

func (s *server) Run() {

	s.httpServer.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "test success",
		})
	})

	s.httpServer.GET("/seeder", func(ctx *gin.Context) {
		helper.SeederRefresh(s.database)

		helper.ResponseSuccessJson(ctx, "seeder success", "")
	})

	matkulRepo := repository.NewMatkulRepository(s.database)
	matkulService := service.NewMatkulService(matkulRepo)
	matkulHandler := handler.NewMatkulHandler(matkulService)
	matkulGroup := s.httpServer.Group("/matkul")
	matkulGroup.Use(middleware.ValidateToken())
	matkulHandler.Mount(matkulGroup)

	kelasRepo := repository.NewKelasRepository(s.database)
	kelasService := service.NewKelasService(kelasRepo)
	kelasHandler := handler.NewKelasHandler(kelasService)
	kelasGroup := s.httpServer.Group("/kelas")
	kelasGroup.Use(middleware.ValidateToken())
	kelasHandler.Mount(kelasGroup)

	jamkelasRepo := repository.NewJamKelasRepository(s.database)
	jamkelasService := service.NewJamKelasService(jamkelasRepo)
	jamkelasHandler := handler.NewJamKelasHandler(jamkelasService)
	jamkelasGroup := s.httpServer.Group("/jam-kelas")
	// jamkelasGroup.Use(middleware.ValidateToken())
	jamkelasHandler.Mount(jamkelasGroup)

	userRepository := repository.NewUserRepositoty(s.database)
	userService := service.NewUserService(userRepository)
	userHandler := handler.NewUserHandler(userService)
	userGroup := s.httpServer.Group("/user")
	userHandler.Mount(userGroup)

	myPlanRepository := repository.NewPlanRepository(s.database)
	myPlanService := service.NewPlanService(myPlanRepository, kelasRepo, userRepository)
	myPlanHandler := handler.NewPlandHandler(myPlanService)
	myPlanGroup := s.httpServer.Group("/my-plan")
	myPlanGroup.Use(middleware.ValidateToken())
	myPlanHandler.Mount(myPlanGroup)

	randomKrsService := service.NewRandomKrsService(userRepository, matkulRepo, kelasRepo)
	randomKrsHandler := handler.NewRandomKrsHandler(randomKrsService, myPlanService)
	randomKrsGroup := s.httpServer.Group("/random-krs")
	randomKrsGroup.Use(middleware.ValidateToken())
	randomKrsHandler.Mount(randomKrsGroup)

	planningKrsService := service.NewPlanningKrsService(randomKrsService)
	planningKrsHandler := handler.NewPlanningKrsHandler(planningKrsService)
	planningKrsGroup := s.httpServer.Group("/planning-krs")
	planningKrsGroup.Use(middleware.ValidateToken())
	planningKrsHandler.Mount(planningKrsGroup)

	dashboardService := service.NewDashboardService(matkulService, myPlanService)
	dashboardHandler := handler.NewDashboardHandler(dashboardService)
	dashboardGroup := s.httpServer.Group("/dashboard")
	dashboardGroup.Use(middleware.ValidateToken())
	dashboardHandler.Mount(dashboardGroup)

	if err := s.httpServer.Run(); err != nil {
		log.Fatal(err)
	}
}
