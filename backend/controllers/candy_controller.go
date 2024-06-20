package controllers

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"

	. "github.com/miopeciclope/candy-shop/backend/models"
	. "github.com/miopeciclope/candy-shop/backend/services"
)

type CandyController struct {
	CandyService ICandyService
}

func (cc *CandyController) HealthCheck(c *gin.Context) {
	response := Response{
		IsSuccessful: true,
		Data:         "I'm running",
	}

	c.JSON(http.StatusOK, response)
}

func (cc *CandyController) GetAllCandy(c *gin.Context) {
	candyList, err := cc.CandyService.GetAllCandy()

	if err != nil {
		log.Fatalf(err.Error())
	  c.JSON(http.StatusInternalServerError, err)
	}

	response := Response{
		IsSuccessful: true,
		Data:         candyList,
	}

	c.JSON(http.StatusOK, response)
}
