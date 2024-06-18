package main

import (
    "github.com/gin-gonic/gin"
)

func main() {
    router := gin.Default()

    router.GET("/status", func(c *gin.Context) {
        c.String(200, "I'm up")
    })

    router.Run(":8080")
}

