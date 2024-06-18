package main

import (
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	router.GET("/api/status", func(c *gin.Context) {
		c.String(200, "running!!!")
	})

	router.Run(":8080")
}
