package main

import (
	"order-service/routers"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	routers.SetupRouter(r)
	r.Run(":8080")
}
