package database

import (
	"fmt"
	"gonextjs/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var (
	DBConn *gorm.DB
)

func Connect() {
	dsn := "host=localhost user=postgres password=root dbname=nextlearn port=5432 sslmode=disable TimeZone=Asia/Shanghai"
	var err error
	DBConn, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("Failed to connect to database")
	}
	fmt.Println("Database connection successfully opened")
}
func AutoMigrate() {
	err := DBConn.AutoMigrate(models.User{}, models.Store{}, models.Product{}, models.Order{}, models.OrderItems{}, models.Cart{}, models.CartItems{}, models.Coupons{}, models.Reviews{})
	if err != nil {
		return
	}
	fmt.Println("Database Migrated")
}
