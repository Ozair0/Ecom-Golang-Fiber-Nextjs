package controllers

import (
	"fmt"
	"github.com/go-playground/validator/v10"
	"gonextjs/database"
	"gonextjs/middlewares"
	"gonextjs/models"
	"strconv"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func Register(c *fiber.Ctx) error {
	var body models.NewUser
	if err := c.BodyParser(&body); err != nil {
		return err
	}

	validate := validator.New()
	err := validate.Struct(body)
	if err != nil {
		for _, err := range err.(validator.ValidationErrors) {
			switch err.Tag() {
			case "email":
				return c.Status(422).JSON(fiber.Map{
					"message": fmt.Sprintf("%s address is invalid", err.Field()),
				})
			case "required":
				return c.Status(422).JSON(fiber.Map{
					"message": fmt.Sprintf("%s can not be empty", err.Field()),
				})
			default:
				return err
			}
		}
	}
	if body.Password != body.PasswordConfirm {
		return c.Status(500).JSON(fiber.Map{
			"message": "passwords do not match",
		})
	}
	var userType models.UserTypes
	userType.UserType = "Customer"
	database.DBConn.Find(&userType)
	user := models.User{
		FirstName: body.FirstName,
		LastName:  body.LastName,
		Email:     body.Email,
		TypeId:    userType.ID,
	}
	user.SetPassword(body.Password)
	if err := database.DBConn.Preload("UserTypes").Create(&user).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{
			"message": "Email is already registered!",
		})
	}

	payload := jwt.StandardClaims{
		Subject:   strconv.Itoa(int(user.ID)),
		ExpiresAt: time.Now().Add(time.Hour * 24).Unix(),
	}
	token, _ := jwt.NewWithClaims(jwt.SigningMethodHS256, payload).SignedString([]byte("secret"))
	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    token,
		Expires:  time.Now().Add(time.Hour * 24),
		HTTPOnly: true,
	}
	c.Cookie(&cookie)
	return c.JSON(user)
}

func Login(c *fiber.Ctx) error {
	var body models.Login
	if err := c.BodyParser(&body); err != nil {
		return err
	}

	validate := validator.New()
	err := validate.Struct(body)
	if err != nil {
		for _, err := range err.(validator.ValidationErrors) {
			switch err.Tag() {
			case "email":
				return c.Status(422).JSON(fiber.Map{
					"message": fmt.Sprintf("%s address is invalid", err.Field()),
				})
			case "required":
				return c.Status(422).JSON(fiber.Map{
					"message": fmt.Sprintf("%s can not be empty", err.Field()),
				})
			case "gte":
				return c.Status(422).JSON(fiber.Map{
					"message": fmt.Sprintf("%s can not be less then %s", err.Field(), err.Param()),
				})
			default:
				return err
			}
		}
	}

	var user models.User
	database.DBConn.Where("email = ?", body.Email).First(&user)
	if user.ID == 0 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid Credentials",
		})
	}
	if err := user.ComparePasswords(body.Password); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid Credentials",
		})
	}

	payload := jwt.StandardClaims{
		Subject:   strconv.Itoa(int(user.ID)),
		ExpiresAt: time.Now().Add(time.Hour * 24).Unix(),
	}
	token, err := jwt.NewWithClaims(jwt.SigningMethodHS256, payload).SignedString([]byte("secret"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid Credentials",
		})
	}

	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    token,
		Expires:  time.Now().Add(time.Hour * 24),
		HTTPOnly: true,
	}
	c.Cookie(&cookie)
	return c.JSON(fiber.Map{
		"message": "success",
	})
}

func User(c *fiber.Ctx) error {
	id, _ := middlewares.GetUserId(c)
	var user models.User
	database.DBConn.Preload("UserTypes").Where("id = ?", id).First(&user)
	return c.JSON(user)
}

func Logout(c *fiber.Ctx) error {
	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    "",
		Expires:  time.Now().Add(-time.Hour),
		HTTPOnly: true,
	}

	c.Cookie(&cookie)
	return c.JSON(fiber.Map{
		"message": "success",
	})
}

func UpdateInfo(c *fiber.Ctx) error {
	var body models.UpdateUser
	if err := c.BodyParser(&body); err != nil {
		return err
	}
	id, _ := middlewares.GetUserId(c)

	validate := validator.New()
	err := validate.Struct(body)
	if err != nil {
		for _, err := range err.(validator.ValidationErrors) {
			switch err.Tag() {
			case "email":
				if !(body.Email == "") {
					return c.Status(422).JSON(fiber.Map{
						"message": fmt.Sprintf("%s address is invalid", err.Field()),
					})
				}
			case "required":
				return c.Status(422).JSON(fiber.Map{
					"message": fmt.Sprintf("%s can not be empty", err.Field()),
				})
			default:
				return err
			}
		}
	}

	user := models.User{Model: gorm.Model{ID: id}}
	if body.FirstName != "" {
		user.FirstName = body.FirstName
	}

	if body.LastName != "" {
		user.LastName = body.LastName
	}

	if body.Email != "" {
		user.Email = body.Email
	}
	if err := database.DBConn.Model(&user).Updates(&user).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{
			"message": "Email is already in use! try another email",
		})
	}
	return c.JSON(user)
}

func UpdatePassword(c *fiber.Ctx) error {
	id, _ := middlewares.GetUserId(c)
	var body models.UserPassword
	if err := c.BodyParser(&body); err != nil {
		return err
	}

	validate := validator.New()
	err := validate.Struct(body)
	if err != nil {
		for _, err := range err.(validator.ValidationErrors) {
			switch err.Tag() {
			case "required":
				return c.Status(422).JSON(fiber.Map{
					"message": fmt.Sprintf("%s can not be empty", err.Field()),
				})
			case "gte":
				return c.Status(422).JSON(fiber.Map{
					"message": fmt.Sprintf("%s can not be less then %s", err.Field(), err.Param()),
				})
			default:
				return err
			}
		}
	}
	var user models.User
	database.DBConn.Where("id = ?", id).First(&user)
	if err := user.ComparePasswords(body.CurrentPassword); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid Credentials",
		})
	}
	if body.Password != body.PasswordConfirm {
		return c.Status(500).JSON(fiber.Map{
			"message": "passwords did not match",
		})
	}

	updateUser := models.User{
		Model: gorm.Model{ID: id},
	}
	updateUser.SetPassword(body.Password)
	database.DBConn.Model(&updateUser).Updates(&updateUser)
	return c.JSON(fiber.Map{
		"message": "Password Updated",
	})
}
