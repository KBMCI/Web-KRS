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
}