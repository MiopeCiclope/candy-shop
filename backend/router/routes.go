package router

import (
	"github.com/gin-gonic/gin"

	"github.com/miopeciclope/candy-shop/backend/controllers"
	"github.com/miopeciclope/candy-shop/backend/middlewares"
)

func SetupRouter() *gin.Engine {
	router := gin.Default()
	router.Use(middlewares.ErrorHandler())

  candyController := &controllers.CandyController{}
	apiGroup := router.Group("/api")

	apiGroup.GET("/status", candyController.HealthCheck)
	return router
}
