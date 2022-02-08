package controllers

import (
	"github.com/gofiber/fiber/v2"
	"gonextjs/database"
	"gonextjs/models"
)

func AddCategory(c *fiber.Ctx) error {
	var data map[string]string
	if err := c.BodyParser(&data); err != nil {
		return err
	}
	if data["description"] == "" {
		return c.Status(500).JSON(fiber.Map{
			"message": "description is required!",
		})
	}
	category := models.Categories{
		Description: data["description"],
	}
	if err := database.DBConn.Create(&category).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{
			"message": "Error",
		})
	}

	return c.JSON(category)
}

func GetAllCategories(c *fiber.Ctx) error {
	var categories []models.Categories
	database.DBConn.Find(&categories)
	return c.JSON(categories)
}
