package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/miopeciclope/candy-shop/backend/models"
)

type CandyController struct{}

func (cc *CandyController) HealthCheck(c *gin.Context) {
	response := models.Response{
		IsSuccessful: true,
		Data:         "I'm running",
	}

	c.JSON(http.StatusOK, response)
}
