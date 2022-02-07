package models

import "gorm.io/gorm"

type OrderItems struct {
	gorm.Model
	TotalPrice int `json:"totalPrice"`
	OrderID    uint
	ProductID  uint
}
