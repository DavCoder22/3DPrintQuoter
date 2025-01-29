package routers

import (
	"github.com/gin-gonic/gin"
	"order-service/handlers"
)

func SetupRouter(router *gin.Engine) {
	orders := router.Group("/orders")
	{
		orders.POST("/", handlers.CreateOrder)
		orders.GET("/:id", handlers.GetOrder)
	}
}
