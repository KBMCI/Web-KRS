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
	api := r.httpServer.Group("/api")
	{
		api.GET("/", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{
				"message": "test success",
			})
		})

		api.GET("/seeder", func(ctx *gin.Context) {
			helper.SeederRefresh()

			helper.ResponseSuccessJson(ctx, "seeder success", "")
		})

		// user routes
		user := api.Group("/user")
		{
			// role user
			user.POST("/register", r.CreateUser)
			user.POST("/login", r.UserLogin)
			user.POST("/matkul", middleware.ValidateToken("user"), r.HasMatkul)
			user.GET("/matkul", middleware.ValidateToken("user"), r.MatkulUser)
			user.PATCH("/forgot", r.ForgotPassword)
			user.PATCH("/profile", middleware.ValidateToken("user"), r.UpdateProfile)
			// role admin
			user.POST("/register/admin", middleware.ValidateToken("admin"), r.CreateAdmin)
			user.GET("", middleware.ValidateToken("admin"), r.ReadAll)
			user.GET("/:id", middleware.ValidateToken("admin"), r.ReadByID)
			user.PATCH("/:id", middleware.ValidateToken("admin"), r.Update)
			user.DELETE("/:id", middleware.ValidateToken("admin"), r.Delete)
		}

		// fakultas routes
		fakultas := api.Group("/fakultas")
		{
			fakultasAdminGroup := fakultas.Group("", middleware.ValidateToken("admin"))
			fakultasUserGroup := fakultas.Group("", middleware.ValidateToken("user"))
			fakultasAdminGroup.POST("", r.StoreFakultasHandler)
			fakultasAdminGroup.PATCH("/:id", r.EditFakultasHandler)
			fakultasAdminGroup.GET("/:id", r.DetailFakultasHandler)
			fakultasUserGroup.GET("/:id/jam-kelas", r.DetailJamKelasFakultasHandler)
			fakultasAdminGroup.DELETE("/:id", r.DeleteFakultasHandler)
			fakultasAdminGroup.GET("", r.FetchFakultasHandler)
		}

		// prodi routes
		prodi := api.Group("/program-studi", middleware.ValidateToken("admin"))
		{
			prodi.POST("", r.StoreProdiHandler)
			prodi.PATCH("/:id", r.EditProdiHandler)
			prodi.GET("/:id", r.DetailProdiHandler)
			prodi.DELETE("/:id", r.DeleteProdiHandler)
			api.GET("program-studi", r.FetchProdiHandler)
		}

		// matkul routes
		matkul := api.Group("/matkul", middleware.ValidateToken("admin"))
		{
			matkul.POST("", r.StoreMatkulHandler)
			matkul.PATCH("/:id", r.EditMatkulHandler)
			matkul.GET("/:id", r.DetailMatkulHandler)
			matkul.DELETE("/:id", r.DeleteMatkulHandler)
			matkul.GET("", r.FetchMatkulHandler)
		}

		// kelas routes
		kelas := api.Group("/kelas", middleware.ValidateToken("admin"))
		{
			kelas.POST("", r.StoreKelasHandler)
			kelas.PATCH("/:id_kelas/jadwal/:id_jadwal", r.EditKelasHandler)
			kelas.GET("/:id", r.DetailKelasHandler)
			kelas.GET("/:id/jadwal/:id_jadwal", r.DetailJadwalKelasHandler)
			kelas.DELETE("/:id", r.DeleteKelasHandler)
			kelas.GET("", r.FetchKelasHandler)
		}

		// jam kelas routes
		jamKelas := api.Group("/jam-kelas")
		{
			jamKelas.POST("", r.StoreJamKelasHandler)
			jamKelas.GET("", r.FetchJamKelasHandler)
			jamKelas.GET("/:id", r.DetailJamKelasHandler)
			jamKelas.PATCH("/:id", r.EditJamKelasHandler)
			jamKelas.DELETE("/:id", r.DeleteJamKelasHandler)
		}

		// my plan routes
		myPlan := api.Group("/my-plan").Use(middleware.ValidateToken("user"))
		{
			myPlan.POST("", r.StorePlanHandler)
			myPlan.GET("", r.FetchPlanHandler)
			myPlan.PATCH("/:id_plan", r.EditPlanHandler)
			myPlan.DELETE("/:id_plan", r.DeletePlanHandler)
		}

		// random krs routes
		randomKrs := api.Group("/random-krs").Use(middleware.ValidateToken("user"))
		{
			randomKrs.GET("", r.FilterRandomKrsHandler)
		}

		// planning krs routes
		planningKrs := api.Group("/planning-krs").Use(middleware.ValidateToken("user"))
		{
			planningKrs.POST("", r.SuggestionKrs)
		}

		// dashboard routes
		dashboard := api.Group("/dashboard").Use(middleware.ValidateToken("user"))
		{
			dashboard.GET("", r.DashboardUserHandler)
		}

		// dashboard routes
		dashboardAdmin := api.Group("admin/dashboard").Use(middleware.ValidateToken("admin"))
		{
			dashboardAdmin.GET("", r.DashboardAdminHandler)
		}
	}
}

func (r *rest) Run() {
	if err := r.httpServer.Run(); err != nil {
		log.Fatal(err)
	}
}
