package main

import (
	"log"
	"web-krs/config"

	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	config := config.NewConfig()
	config.Database()
	server := InitServer(config)
	
	server.Run()
}