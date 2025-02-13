package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"			
	"github.com/gin-contrib/cors"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"	
)

var mongoUri string = "mongodb://localhost:27017"
var mongoDbName string = "pms_app_db"
var mongoCollectionPizza string = "pizzas"

var mongoclient *mongo.Client
var pizzaCollection *mongo.Collection

type Pizza struct {
	ID       primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
	Name     string             `json:"name" bson:"name"`
	Size     string             `json:"size" bson:"size"`
	Price    string             `json:"price" bson:"price"`
	Category string             `json:"category" bson:"category"`
}

func connectDB() {
	ctx, cancel := context.WithTimeout(context.Background(), 10 * time.Second)
	defer cancel()

	var err error
	mongoclient, err = mongo.Connect(ctx, options.Client().ApplyURI(mongoUri))
	if err != nil {
		log.Fatal("MongoDB Connection Error:", err)
	}

	pizzaCollection = mongoclient.Database(mongoDbName).Collection(mongoCollectionPizza)
	fmt.Println("Connected to MongoDB!")
}

func createPizza(c *gin.Context) {
	var jbodyPizza Pizza

	if err := c.BindJSON(&jbodyPizza); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	result, err := pizzaCollection.InsertOne(ctx, jbodyPizza)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create pizza"})
		return
	}

	pizzaId, ok := result.InsertedID.(primitive.ObjectID) 
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to parse inserted ID"})
		return
	}
	jbodyPizza.ID = pizzaId

	var createdPizza Pizza
	err = pizzaCollection.FindOne(ctx, bson.M{"_id": jbodyPizza.ID}).Decode(&createdPizza)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch created pizza"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Pizza created successfully",
		"pizza":   createdPizza,
	})
}

func readAllPizzas(c *gin.Context) {
	ctx, cancel := context.WithTimeout(context.Background(), 5 * time.Second)
	defer cancel()

	cursor, err := pizzaCollection.Find(ctx, bson.M{})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch pizzas"})
		return
	}
	defer cursor.Close(ctx)

	pizzas := []Pizza{}
	if err := cursor.All(ctx, &pizzas); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to parse pizzas"})
		return
	}
	
	c.JSON(http.StatusOK, pizzas)
}

func readPizzaById(c *gin.Context) {
	id := c.Param("id")

	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID format"})
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	var pizza Pizza
	err = pizzaCollection.FindOne(ctx, bson.M{"_id": objectID}).Decode(&pizza)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Pizza not found"})
		return
	}

	c.JSON(http.StatusOK, pizza)
}

func updatePizza(c *gin.Context) {
	id := c.Param("id")
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID format"})
		return
	}
	var jbodyPizza Pizza

	if err := c.BindJSON(&jbodyPizza); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	var oldPizza Pizza
	
	err = pizzaCollection.FindOne(ctx, bson.M{"_id": objectID}).Decode(&oldPizza)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Pizza not found"})
		return
	}
	oldPizza.Name = jbodyPizza.Name
	oldPizza.Size = jbodyPizza.Size
	oldPizza.Price = jbodyPizza.Price
	oldPizza.Category = jbodyPizza.Category

	result, err := pizzaCollection.UpdateOne(ctx, bson.M{"_id": objectID}, bson.M{"$set": oldPizza})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update pizza"})
		return
	}

	if result.MatchedCount == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Pizza not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"message": "Pizza updated successfully",
		"pizza":   oldPizza,
	})
}

func deletePizza(c *gin.Context) {
	id := c.Param("id")
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID format"})
		return
	}
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	result, errDelete := pizzaCollection.DeleteOne(ctx, bson.M{"_id": objectID})
	if errDelete != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete pizza"})
		return
	}

	if result.DeletedCount == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Pizza not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Pizza deleted successfully"})
}

func main() {
	connectDB()

	r := gin.Default()
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"}, 
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))
	r.POST("/pizzas", createPizza)
	r.GET("/pizzas", readAllPizzas)
	r.GET("/pizzas/:id", readPizzaById)
	r.PUT("/pizzas/:id", updatePizza)
	r.DELETE("/pizzas/:id", deletePizza)

	r.Run(":8080")
}
