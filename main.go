package main

import (
	"gonextjs/database"
	"gonextjs/routes"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	app := fiber.New()
	app.Use(cors.New(cors.Config{
		AllowCredentials: true,
	}))
	database.Connect()
	database.AutoMigrate()
	routes.SetupRoutes(app)
	app.Listen(":3000")
}
