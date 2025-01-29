package handlers

import (
	"net/http"
	"order-management/order-service/src/models"
	"order-management/order-service/src/service"
	"time"

	"github.com/gin-gonic/gin"
)

type OrderHandler struct {
	service *service.OrderService
}

func NewOrderHandler(s *service.OrderService) *OrderHandler {
	return &OrderHandler{service: s}
}

func (h *OrderHandler) CreateOrder(c *gin.Context) {
	var req models.Order
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Formato inválido"})
		return
	}

	req.ID = generateOrderID()
	req.Status = models.StatusPending
	req.CreatedAt = time.Now()
	req.UpdatedAt = time.Now()

	if err := h.service.CreateOrder(c.Request.Context(), &req); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error creando pedido"})
		return
	}

	c.JSON(http.StatusCreated, req)
}

func generateOrderID() string {
	return "ORD-" + time.Now().Format("20060102150405")
}
