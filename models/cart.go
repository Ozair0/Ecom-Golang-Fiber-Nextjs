package models

import "gorm.io/gorm"

type Cart struct {
	gorm.Model
	UserID    uint
	StoreID   uint
	CartItems []CartItems
}
