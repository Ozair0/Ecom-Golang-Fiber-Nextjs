package models

import "gorm.io/gorm"

type Product struct {
	gorm.Model
	Title       string `json:"title"`
	Description string `json:"description"`
	UserID      uint
	StoreID     uint
	OrderItems  []OrderItems
	Reviews     []Reviews
	CartItems   []CartItems
}
