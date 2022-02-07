package models

import "gorm.io/gorm"

type CartItems struct {
	gorm.Model
	CartID    uint
	ProductID uint
}
