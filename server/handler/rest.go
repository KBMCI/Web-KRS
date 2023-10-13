package handler

import (
	"log"
	"net/http"
	"web-krs/helper"
	"web-krs/middleware"
	"web-krs/service"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

type (
	rest struct {
		httpServer *gin.Engine
		service    *service.Service
	}
)

func Init(service *service.Service) *rest {
	r := gin.Default()

	rest := &rest{
		httpServer: r,
		service:    service,
	}

	r.Use(cors.New(cors.Config{
		AllowAllOrigins:  true,
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Length", "Content-Type", "Authorization"},
		AllowCredentials: true,
	}))

	rest.RegisterMiddlewareAndRoutes()

	return rest
}

func (r *rest) RegisterMiddlewareAndRoutes() {
	r.httpServer.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "test success",
		})
	})

	r.httpServer.GET("/seeder", func(ctx *gin.Context) {
		helper.SeederRefresh()

		helper.ResponseSuccessJson(ctx, "seeder success", "")
	})

	// middlewareUser := r.httpServer.Group("")
	// middlewareUser.Use(middleware.ValidateToken())

	// user routes
	user := r.httpServer.Group("/user")
	{
		// role user
		user.POST("/register", r.CreateUser)
		user.POST("/login", r.UserLogin)
		user.PUT("/forgot", r.ForgotPassword)
		user.POST("/matkul", r.HasMatkul, middleware.ValidateToken())
		user.PUT("/profile", r.UpdateProfile, middleware.ValidateToken())
		// role admin
		user.POST("/register/admin", r.CreateAdmin)
		user.GET("", r.ReadAll, middleware.ValidateToken())
		user.GET("/:id", r.ReadByID, middleware.ValidateToken())
		user.PUT("/:id", r.Update, middleware.ValidateToken())
		user.DELETE("/:id", r.Delete, middleware.ValidateToken())
	}

	// matkul routes
	matkul := r.httpServer.Group("/matkul", middleware.ValidateToken())
	{
		matkul.POST("", r.StoreMatkulHandler)
		matkul.PATCH("/:id", r.EditMatkulHandler)
		matkul.GET("/:id", r.DetailMatkulHandler)
		matkul.DELETE("/:id", r.DeleteMatkulHandler)
		matkul.GET("", r.FetchMatkulHandler)
	}

	// kelas routes
	kelas := r.httpServer.Group("/kelas", middleware.ValidateToken())
	{
		kelas.POST("", r.StoreKelasHandler)
		kelas.PATCH("/:id_kelas/jadwal/:id_jadwal", r.EditKelasHandler)
		kelas.GET("/:id", r.DetailKelasHandler)
		kelas.GET("/:id/jadwal/:id_jadwal", r.DetailJadwalKelasHandler)
		kelas.DELETE("/:id", r.DeleteKelasHandler)
		kelas.GET("", r.FetchKelasHandler)
	}

	// jam kelas routes
	jamKelas := r.httpServer.Group("/jam-kelas")
	{
		jamKelas.POST("", r.StoreJamKelasHandler)
		jamKelas.GET("", r.FetchJamKelasHandler)
		jamKelas.GET("/:id", r.DetailJamKelasHandler)
		jamKelas.PATCH("/:id", r.EditJamKelasHandler)
		jamKelas.DELETE("/:id", r.DeleteJamKelasHandler)
	}

	// my plan routes
	myPlan := r.httpServer.Group("/my-plan").Use(middleware.ValidateToken())
	{
		myPlan.POST("", r.StorePlanHandler)
		myPlan.GET("", r.FetchPlanHandler)
		myPlan.PATCH("/:id_plan", r.EditPlanHandler)
		myPlan.DELETE("/:id_plan", r.DeletePlanHandler)
	}

	// random krs routes
	randomKrs := r.httpServer.Group("/random-krs").Use(middleware.ValidateToken())
	{
		randomKrs.GET("", r.FilterRandomKrsHandler)
	}

	// planning krs routes
	planningKrs := r.httpServer.Group("/planning-krs").Use(middleware.ValidateToken())
	{
		planningKrs.POST("", r.SuggestionKrs)
	}

	// dashboard routes
	dashboard := r.httpServer.Group("/dashboard").Use(middleware.ValidateToken())
	{
		dashboard.GET("", r.DashboardHandler)
	}
}

func (r *rest) Run() {
	if err := r.httpServer.Run(); err != nil {
		log.Fatal(err)
	}
}
