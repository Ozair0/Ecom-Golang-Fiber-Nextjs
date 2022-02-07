package models

import (
	"gorm.io/gorm"
	"time"
)

type Coupons struct {
	gorm.Model
	Code       string    `json:"code"`
	ExpireTime time.Time `json:"expireTime"`
	Enabled    bool      `json:"enabled"`
}
