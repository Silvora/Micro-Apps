package controller

import (
	"Web/common"
	"Web/tool"
	"fmt"
	"log"
	"net/http"

	"github.com/garyburd/redigo/redis"
	"github.com/gin-gonic/gin"
)


func IsUser(key string) int {
	var isRoot int
	Conn := tool.Pool.Get()
	defer Conn.Close()
	isRoot, err := redis.Int(Conn.Do("HEXISTS", "root", key))
	//isRoot, _ := t.HExists(ctx,"root",key).Result()
	if err !=nil {
		log.Println("redis查询出错")
		return -1
	}
	//return isRoot
	return isRoot
}


func Login(c *gin.Context){
	//var user User
	user := c.PostForm("user")
	pass := c.PostForm("pass")
	isRoot := IsUser(user)
	if isRoot == 1 {
		//fmt.Println("aaaa",isRoot,user,pass)
		common.ExistUser(user, pass,c)
	}else {
		common.NoExistUser(c)
	}

	
}



func AddUser(c *gin.Context){
	user := c.PostForm("user")
	pass := c.PostForm("pass")
	fmt.Println(user,pass)
	isAdd := common.AddUser(user, pass)
	if !isAdd {
		return
	}
	
	common.RedisAddUser(user,c)
}


func Active(c *gin.Context){
	user := c.PostForm("user")
	isRoot := IsUser(user)
	if isRoot == 1 {
		c.JSON(http.StatusOK, gin.H{
			"code":200,
			"name":user,
			"msg":"success",
	
		})
	}else{
		c.JSON(http.StatusOK, gin.H{
			"code":401,
			//"name":user,
			"msg":"此用户不存在！！！",
	
		})
	}
}

