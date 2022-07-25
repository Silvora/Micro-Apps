package tool

import (
	"Web/config"
	"log"

	"github.com/garyburd/redigo/redis"
)

var Pool *redis.Pool 
//var Conn *redis

func InitRedis(){

	idle := config.RedisMaxIdle
	active := config.RedisMaxActive
	host := config.RedisIp
	port := config.RedisPort

	Pool = &redis.Pool{
		MaxIdle:   idle, /*最大的空闲连接数*/
		MaxActive:  active, /*最大的激活连接数*/
		IdleTimeout:300, 
		Dial: func() (redis.Conn, error) {
			Conn, err := redis.Dial("tcp",host+":"+port)
		  if err != nil {
			log.Println("redis连接失败")
			return nil, err
		  }
		  log.Println("redis连接成功")
		 return Conn, nil
		},
	}

	// Redis := redis.NewClient(&redis.Options{
	// 	Addr:     	host+":"+port,
	// 	Password: 	"",
	// 	DB:       	0,
	// 	PoolSize:	active,
	// })
	// ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	// defer cancel()
	// _,err := Redis.Ping(ctx).Result()
	// if err!=nil {
	// 	log.Println("redis连接失败",err)
	// 	//return 
	// }else{
	// 	log.Println("redis连接成功")
	// //	return 
	// }
}