package routes

import (
	"gonextjs/controllers"
	"gonextjs/middlewares"

	"github.com/gofiber/fiber/v2"
)

func SetupRoutes(app *fiber.App) {
	api := app.Group("api")
	admin := api.Group("admin")
	admin.Post("/register", controllers.Register)
	admin.Post("/login", controllers.Login)
	adminAuthenticated := admin.Use(middlewares.IsAuthenticated)
	adminAuthenticated.Get("/user", controllers.User)
	adminAuthenticated.Get("/logout", controllers.Logout)
	adminAuthenticated.Put("/users/info", controllers.UpdateInfo)
	adminAuthenticated.Put("/users/password", controllers.UpdatePassword)

	/* Product */
	adminAuthenticated.Post("/product", controllers.AddProducts)
	adminAuthenticated.Get("/products", controllers.GetAllProducts)
	adminAuthenticated.Get("/products/:id", controllers.GetProduct)
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
