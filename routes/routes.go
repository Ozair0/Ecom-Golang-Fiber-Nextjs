package routes

import (
	"gonextjs/controllers"
	"gonextjs/middlewares"

	"github.com/gofiber/fiber/v2"
)

func SetupRoutes(app *fiber.App) {
	api := app.Group("api")
	admin := api.Group("admin")
	api.Get("/status", func(ctx *fiber.Ctx) error {
		return ctx.JSON(fiber.Map{
			"message": "success",
			//"message": "Server In Maintenance Mode, Come Back After 2Hr.🙃",
		})
	})
	api.Post("/login", controllers.Login)
	api.Post("/register", controllers.Register)
	adminAuthenticated := admin.Use(middlewares.IsAuthenticated)
	adminAuthenticated.Get("/user", controllers.User)
	adminAuthenticated.Get("/logout", controllers.Logout)
	adminAuthenticated.Put("/users/info", controllers.UpdateInfo)
	adminAuthenticated.Put("/users/password", controllers.UpdatePassword)

	/* Product */
	// public routes
	api.Get("/products", controllers.GetAllProducts)
	api.Get("/products/:id", controllers.GetProduct)
	// Admin routes
	adminAuthenticated.Post("/product", controllers.AddProducts)
	adminAuthenticated.Put("/products/:id", controllers.UpdateProduct)
	adminAuthenticated.Delete("/products/:id", controllers.DeleteProduct)

	/* Currency */
	adminAuthenticated.Post("/currency", controllers.AddCurrency)
	adminAuthenticated.Get("/currency", controllers.GetAllCurrencies)

	/* Store */
	adminAuthenticated.Post("/store", controllers.AddStore)
	adminAuthenticated.Get("/store", controllers.GetAllStores)

	/* Category */
	adminAuthenticated.Post("/category", controllers.AddCategory)
	adminAuthenticated.Get("/category", controllers.GetAllCategories)
}
