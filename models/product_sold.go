package models

import "gorm.io/gorm"

type ProductsSold struct {
	gorm.Model
	QTY       int     `json:"QTY"`
	Price     int     `json:"price"`
	ProductId int     `json:"productId"`
	OrderId   int     `json:"orderId"`
	Order     Order   `gorm:"foreignKey:OrderId"`
	Product   Product `gorm:"foreignKey:ProductId"`
}
