package models

import "gorm.io/gorm"

type Order struct {
	gorm.Model
	OrderId string `json:"orderId"`
	UserID  uint
	StoreID uint
	status  string
	Store   Store `gorm:"foreignKey:StoreID"`
	User    User  `gorm:"foreignKey:UserID"`
}
