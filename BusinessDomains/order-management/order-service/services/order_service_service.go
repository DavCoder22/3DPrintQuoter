package services

import (
	"database/sql"
	"order-service/models"
	_ "github.com/lib/pq"
	"errors"
	"fmt"
)

var db *sql.DB

func init() {
	var err error
	connStr := fmt.Sprintf("user=%s dbname=%s sslmode=require password=%s host=%s port=%d",
		"dsmalquin",  // Nombre de usuario de la base de datos
		"databaseDevelop",   // Nombre de la base de datos
		"Sebasalejandro22",  // Contraseña de la base de datos
		"databasedevelop.cel1rhfigvoo.us-east-1.rds.amazonaws.com",     // Endpoint de RDS
		5432)            // Puerto de la base de datos (5432 para PostgreSQL)
	db, err = sql.Open("postgres", connStr)
	if err != nil {
		panic(err)
	}
	createTable()
}
func createTable() {
	statement, _ := db.Prepare(`CREATE TABLE IF NOT EXISTS orders (
		id TEXT PRIMARY KEY,
		user_id TEXT,
		product_id TEXT,
		quantity INTEGER,
		status TEXT,
		created_at TEXT,
		updated_at TEXT
	)`)
	statement.Exec()
}

func CreateOrder(order models.Order) error {
	statement, _ := db.Prepare("INSERT INTO orders (id, user_id, product_id, quantity, status, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7)")
	_, err := statement.Exec(order.ID, order.UserID, order.ProductID, order.Quantity, order.Status, order.CreatedAt, order.UpdatedAt)
	return err
}

func GetOrder(id string) (models.Order, error) {
	var order models.Order
	row := db.QueryRow("SELECT id, user_id, product_id, quantity, status, created_at, updated_at FROM orders WHERE id = $1", id)
	err := row.Scan(&order.ID, &order.UserID, &order.ProductID, &order.Quantity, &order.Status, &order.CreatedAt, &order.UpdatedAt)
	if err == sql.ErrNoRows {
		return models.Order{}, errors.New("order not found")
	}
	return order, nil
}
