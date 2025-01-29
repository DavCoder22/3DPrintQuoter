package service

import (
	"context"
	"order-management/order-service/src/models"
	"order-management/order-service/src/repository"
)

type OrderService struct {
	repo *repository.OrderRepository
}

func NewOrderService(repo *repository.OrderRepository) *OrderService {
	return &OrderService{repo: repo}
}

func (s *OrderService) CreateOrder(ctx context.Context, order *models.Order) error {
	// Validaciones y lógica de negocio
	return s.repo.CreateOrder(ctx, order)
}

func (s *OrderService) GetOrder(ctx context.Context, orderID string) (*models.Order, error) {
	return s.repo.GetOrder(ctx, orderID)
}

func (s *OrderService) UpdateOrderStatus(ctx context.Context, orderID string, status models.OrderStatus) error {
	return s.repo.UpdateOrderStatus(ctx, orderID, status)
}
