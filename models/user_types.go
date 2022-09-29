package models

import "gorm.io/gorm"

type UserTypes struct {
	gorm.Model
	UserType string `json:"user_type"`
}
