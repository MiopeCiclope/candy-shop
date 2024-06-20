package router

import (
	"github.com/gin-gonic/gin"

	. "github.com/miopeciclope/candy-shop/backend/controllers"
	. "github.com/miopeciclope/candy-shop/backend/middlewares"
	. "github.com/miopeciclope/candy-shop/backend/services"
)

func SetupRouter(candyService ICandyService) *gin.Engine {
	router := gin.Default()
	router.Use(ErrorHandler())

	candyController := CandyController{
		CandyService: candyService,
	}

	apiGroup := router.Group("/api")

	apiGroup.GET("/status", candyController.HealthCheck)
	apiGroup.GET("/candy", candyController.GetAllCandy)

	return router
}
