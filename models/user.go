package models

import (
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	FirstName string    `json:"firstname"`
	LastName  string    `json:"lastname"`
	Email     string    `json:"email" gorm:"not null;unique" validate:"email"`
	Password  []byte    `json:"-"`
	TypeId    uint      `json:"type_id"`
	UserTypes UserTypes `gorm:"foreignKey:TypeId"`
}

type NewUser struct {
	FirstName       string `json:"firstname" validate:"required"`
	LastName        string `json:"lastname" validate:"required"`
	Email           string `json:"email" gorm:"not null;unique" validate:"email"`
	Password        string `json:"password" validate:"required"`
	PasswordConfirm string `json:"password_confirm" validate:"required"`
}

type UpdateUser struct {
	FirstName string `json:"firstname"`
	LastName  string `json:"lastname"`
	Email     string `json:"email" validate:"email"`
}

type UserPassword struct {
	CurrentPassword string `json:"current_password" validate:"required"`
	Password        string `json:"password" validate:"required,gte=7"`
	PasswordConfirm string `json:"password_confirm" validate:"required,gte=7"`
}

type Login struct {
	Email    string `json:"email" validate:"email"`
	Password string `json:"password" validate:"required,gte=7"`
}

func (user *User) SetPassword(password string) {
	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(password), 12)
	user.Password = hashedPassword
}

func (user *User) ComparePasswords(password string) error {
	return bcrypt.CompareHashAndPassword(user.Password, []byte(password))
}
