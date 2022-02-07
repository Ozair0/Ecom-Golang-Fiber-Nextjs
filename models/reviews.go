package models

import "gorm.io/gorm"

type Reviews struct {
	gorm.Model
	Ratting   int    `json:"ratting"`
	Body      string `json:"body"`
	UserID    uint
	ProductID uint
}
