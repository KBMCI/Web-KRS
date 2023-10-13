package main

import (
	"log"
	"web-krs/config"
	"web-krs/handler"
	"web-krs/repository"
	"web-krs/service"

	"github.com/joho/godotenv"
)

func main() {

	err := godotenv.Load(".env")

	if err != nil {
		log.Fatal("Error")
	}

	config := config.NewConfig()

	// init repository
	repo := repository.Init(config.Database())

	// init service
	service := service.Init(repo)

	// init handler
	rest := handler.Init(service)
	rest.Run()
}
