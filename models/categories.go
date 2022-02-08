package models

import (
	"gorm.io/gorm"
)

type Categories struct {
	gorm.Model
	Description string `json:"description"`
	Product     []Product
}
