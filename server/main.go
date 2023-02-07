package main

import (
	"log"
	"web-krs/config"
	"fmt"
	"github.com/joho/godotenv"
)

func main() {
	
	err := godotenv.Load(".env")

	if err != nil {
		log.Fatal("Error")
	}

	config := config.NewConfig()

	fmt.Println(config)

	
}