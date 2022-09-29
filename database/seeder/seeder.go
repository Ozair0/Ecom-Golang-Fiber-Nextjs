package main

import (
	"github.com/bxcodec/faker/v3"
	"gonextjs/database"
	"gonextjs/models"
	"math/rand"
)

func main() {
	database.Connect()
	var users []models.User
	database.DBConn.Find(&users)
	if len(users) == 0 {
		for i := 0; i < 2; i++ {
			store := models.Store{
				Name:     faker.Name(),
				Location: faker.Sentence(),
			}
			database.DBConn.Create(&store)
		}

		UserType0 := models.UserTypes{
			UserType: "Customer",
		}
		UserType1 := models.UserTypes{
			UserType: "Seller",
		}
		UserType2 := models.UserTypes{
			UserType: "Admin",
		}
		database.DBConn.Create(&UserType0)
		database.DBConn.Create(&UserType1)
		database.DBConn.Create(&UserType2)

		for i := 0; i < 2; i++ {
			categories := models.Categories{
				Description: faker.Sentence(),
			}
			database.DBConn.Create(&categories)
		}
		currency := models.Currency{
			Title: "USD",
			Code:  "$",
		}
		database.DBConn.Create(&currency)

		var userTypes models.UserTypes
		userTypes.UserType = "Customer"
		database.DBConn.Find(&userTypes)
		for i := 0; i < 100; i++ {
			user := models.User{
				FirstName: faker.FirstName(),
				LastName:  faker.LastName(),
				Email:     faker.Email(),
				TypeId:    userTypes.ID,
			}
			user.SetPassword("password")
			database.DBConn.Create(&user)
			var stores []models.Store
			var categories []models.Store
			var currencies []models.Currency
			database.DBConn.Find(&stores)
			database.DBConn.Find(&categories)
			database.DBConn.Find(&currencies)
			product := models.Product{
				Title:           faker.Name(),
				Description:     faker.Paragraph(),
				Width:           rand.Float32(),
				Length:          rand.Float32(),
				Height:          rand.Float32(),
				Image:           faker.URL(),
				Price:           float32(rand.Intn(90) + 10),
				AdditionalPrice: float32(rand.Intn(90) + 10),
				QTY:             3,
				UserID:          user.ID,
				StoreID:         stores[0].ID,
				CategoriesID:    categories[0].ID,
				CurrencyID:      currencies[0].ID,
			}
			database.DBConn.Create(&product)
			for i := 0; i < 2; i++ {
				review := models.Reviews{
					Ratting:   5,
					Body:      faker.Paragraph(),
					UserID:    user.ID,
					ProductID: product.ID,
				}
				database.DBConn.Create(&review)
			}
			product2 := models.Product{
				Title:           faker.Name(),
				Description:     faker.Paragraph(),
				Width:           rand.Float32(),
				Length:          rand.Float32(),
				Height:          rand.Float32(),
				Image:           faker.URL(),
				Price:           float32(rand.Intn(90) + 10),
				AdditionalPrice: float32(rand.Intn(90) + 10),
				QTY:             3,
				UserID:          user.ID,
				StoreID:         stores[1].ID,
				CategoriesID:    categories[1].ID,
				CurrencyID:      currencies[0].ID,
			}
			database.DBConn.Create(&product2)
			for i := 0; i < 2; i++ {
				review := models.Reviews{
					Ratting:   5,
					Body:      faker.Paragraph(),
					UserID:    user.ID,
					ProductID: product2.ID,
				}
				database.DBConn.Create(&review)
			}
		}
	}
}
