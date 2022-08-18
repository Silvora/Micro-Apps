package tool

import (
	"context"
	"fmt"
	"log"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)


var Mongo *mongo.Database


func InitMongo(){
	// 设置客户端选项
clientOptions := options.Client().ApplyURI("mongodb://127.0.0.1:27017")
// 连接 MongoDB
client, err := mongo.Connect(context.TODO(), clientOptions)
if err != nil {
    log.Fatal(err)
}
// 检查连接
err = client.Ping(context.TODO(), nil)
if err != nil {
    log.Fatal(err)
}

collection := client.Database("TIM")

Mongo = collection

fmt.Println("Connected to MongoDB!")
}