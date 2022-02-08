package controllers

import (
	"github.com/gofiber/fiber/v2"
	"gonextjs/database"
	"gonextjs/models"
)

func AddStore(c *fiber.Ctx) error {
	var data map[string]string
	if err := c.BodyParser(&data); err != nil {
		return err
	}
	if data["name"] == "" {
		return c.Status(500).JSON(fiber.Map{
			"message": "name is required!",
		})
	}
	if data["location"] == "" {
		return c.Status(500).JSON(fiber.Map{
			"message": "location is required!",
		})
	}
	store := models.Store{
		Name:     data["name"],
		Location: data["location"],
	}
	if err := database.DBConn.Create(&store).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{
			"message": "Error",
		})
	}

	return c.JSON(store)
}

func GetAllStores(c *fiber.Ctx) error {
	var stores []models.Store
	database.DBConn.Find(&stores)
	return c.JSON(stores)
}
