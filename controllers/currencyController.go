package controllers

import (
	"github.com/gofiber/fiber/v2"
	"gonextjs/database"
	"gonextjs/models"
)

func AddCurrency(c *fiber.Ctx) error {
	var data map[string]string
	if err := c.BodyParser(&data); err != nil {
		return err
	}
	if data["title"] == "" {
		return c.Status(500).JSON(fiber.Map{
			"message": "title is required!",
		})
	}
	if data["code"] == "" {
		return c.Status(500).JSON(fiber.Map{
			"message": "code is required!",
		})
	}
	currency := models.Currency{
		Title: data["title"],
		Code:  data["code"],
	}
	if err := database.DBConn.Create(&currency).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{
			"message": "Error",
		})
	}

	return c.JSON(currency)
}

func GetAllCurrencies(c *fiber.Ctx) error {
	var currencies []models.Currency
	database.DBConn.Find(&currencies)
	return c.JSON(currencies)
}
