package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
	"gonextjs/database"
	"gonextjs/routes"
	"os"
)

func main() {
	errenv := godotenv.Load()
	if errenv != nil {
		return
	}
	config := fiber.Config{
		Prefork:                  true,
		CaseSensitive:            true,
		StrictRouting:            true,
		DisableHeaderNormalizing: true,
		ServerHeader:             "go",
	}

	app := fiber.New(config)
	app.Use(cors.New(cors.Config{
		Next:             nil,
		AllowOrigins:     "*",
		AllowMethods:     "GET,POST,HEAD,PUT,DELETE,PATCH",
		AllowHeaders:     "",
		AllowCredentials: false,
		ExposeHeaders:    "",
		MaxAge:           0,
	}))
	database.Connect()
	database.AutoMigrate()
	routes.SetupRoutes(app)
	err := app.Listen(":" + os.Getenv("PORT"))
	if err != nil {
		return
	}
}
