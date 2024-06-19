package middlewares

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/miopeciclope/candy-shop/backend/models"
)

func ErrorHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Next()
		if len(c.Errors) > 0 {
			for _, e := range c.Errors {
				log.Println(e.Err)
			}

			response := models.Response{
				IsSuccessful: false,
				Data: gin.H{
					"error": c.Errors[0].Error(),
				},
			}
			c.JSON(http.StatusInternalServerError, response)
		}
	}
}
