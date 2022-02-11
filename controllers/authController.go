package controllers

import (
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
	var data map[string]string
	if err := c.BodyParser(&data); err != nil {
		return err
	}
	if data["firstname"] == "" {
		return c.Status(500).JSON(fiber.Map{
			"message": "firstname is required!",
		})
	}
	if data["lastname"] == "" {
		return c.Status(500).JSON(fiber.Map{
			"message": "lastname is required!",
		})
	}
	if data["email"] == "" {
		return c.Status(500).JSON(fiber.Map{
			"message": "email is required!",
		})
	}
	if data["password"] == "" {
		return c.Status(500).JSON(fiber.Map{
			"message": "password is required!",
		})
	}
	if len(data["password"]) <= 6 {
		return c.Status(500).JSON(fiber.Map{
			"message": "password should be more then 6 chars",
		})
	}
	if data["password"] != data["password_confirm"] {
		return c.Status(500).JSON(fiber.Map{
			"message": "passwords do not match",
		})
	}
	user := models.User{
		FirstName: data["firstname"],
		LastName:  data["lastname"],
		Email:     data["email"],
	}
	user.SetPassword(data["password"])
	if err := database.DBConn.Create(&user).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{
			"message": "Email is already registered!",
		})
	}

	return c.JSON(user)
}

func Login(c *fiber.Ctx) error {
	var data map[string]string
	if err := c.BodyParser(&data); err != nil {
		return err
	}
	if data["email"] == "" {
		return c.Status(500).JSON(fiber.Map{
			"message": "email is required!",
		})
	}
	if data["password"] == "" {
		return c.Status(500).JSON(fiber.Map{
			"message": "password is required!",
		})
	}
	if len(data["password"]) <= 6 {
		return c.Status(500).JSON(fiber.Map{
			"message": "password should be more then 6 chars",
		})
	}
	var user models.User
	database.DBConn.Where("email = ?", data["email"]).First(&user)
	if user.ID == 0 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid Credentials",
		})
	}
	if err := user.ComparePasswords(data["password"]); err != nil {
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
		"messsage": "success",
	})
}

func User(c *fiber.Ctx) error {
	id, _ := middlewares.GetUserId(c)
	var user models.User
	database.DBConn.Where("id = ?", id).First(&user)
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
	var data map[string]string
	if err := c.BodyParser(&data); err != nil {
		return err
	}
	id, _ := middlewares.GetUserId(c)

	user := models.User{
		Model:     gorm.Model{ID: id},
		FirstName: data["firstname"],
		LastName:  data["lastname"],
		Email:     data["email"],
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
	var data map[string]string
	if err := c.BodyParser(&data); err != nil {
		return err
	}
	if data["current_password"] == "" {
		return c.Status(500).JSON(fiber.Map{
			"message": "password is required!",
		})
	}
	var user models.User
	database.DBConn.Where("id = ?", id).First(&user)
	if err := user.ComparePasswords(data["current_password"]); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid Credentials",
		})
	}
	if data["password"] == "" {
		return c.Status(500).JSON(fiber.Map{
			"message": "password is required!",
		})
	}
	if len(data["password"]) <= 6 {
		return c.Status(500).JSON(fiber.Map{
			"message": "password should be more then 6 chars",
		})
	}
	if data["password"] != data["password_confirm"] {
		return c.Status(500).JSON(fiber.Map{
			"message": "passwords do not match",
		})
	}

	updateUser := models.User{
		Model: gorm.Model{ID: id},
	}
	updateUser.SetPassword(data["password"])
	database.DBConn.Model(&updateUser).Updates(&updateUser)
	return c.JSON(fiber.Map{
		"message": "Password Updated",
	})
}
