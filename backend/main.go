package main

import (
	"log"
	"os"

	"github.com/joho/godotenv"
	"github.com/miopeciclope/candy-shop/backend/router"
	. "github.com/miopeciclope/candy-shop/backend/services"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file")
	}

	port := os.Getenv("PORT")
	if port == "" {
		log.Fatalf("PORT environment variable not set")
	}

	candyService := &CandyService{}
	r := router.SetupRouter(candyService)

	r.Run(":" + port)
}
