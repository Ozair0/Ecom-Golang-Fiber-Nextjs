package models

import "gorm.io/gorm"

type Store struct {
	gorm.Model
	Name     string `json:"name"`
	Location string `json:"location"`
	Product  []Product
	Cart     []Cart
	Order    []Order
}
