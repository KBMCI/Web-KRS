package main

import (
	"log"
	"web-krs/config"
	"github.com/joho/godotenv"
)

func main() {
	
	err := godotenv.Load(".env")

	if err != nil {
		log.Fatal("Error")
	}

	config := config.NewConfig()
	server := InitServer(config)

	server.Run()
	// route := gin.Default()

	// userRepository := repository.NewUserRepositoty(config)
	// userService := service.NewUserService(userRepository)
	// userHandler := handler.NewUserHandler(userService)

	// group := route.Group("/user")

	// group.GET("/")
	// group.POST("/create", userHandler.CreateUser)
	// group.PUT("/update")
	// group.DELETE("/delete")

	
	
}