package models

import "gorm.io/gorm"

type Currency struct {
	gorm.Model
	Title string `json:"title"`
	Code  string `json:"code"`
}
