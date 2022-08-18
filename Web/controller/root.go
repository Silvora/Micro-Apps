package controller

import (
	"Web/common"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)





func Login(c *gin.Context){
	//var user User
	user := c.PostForm("user")
	pass := c.PostForm("pass")
	fmt.Println(user,pass)
	id := common.IsUser(user)
	fmt.Println(id)
	if id != -1 {
		//fmt.Println("aaaa",isRoot,user,pass)
		common.ExistUser(id, user, pass, c)
	}else {
		common.NoExistUser(c)
	}

	
}



func AddUser(c *gin.Context){
	user := c.PostForm("user")
	pass := c.PostForm("pass")
	fmt.Println(user,pass)
	id := common.AddUser(user, pass)
	if id == -1 {
		return
	}
	
	common.RedisAddUser(id, user,c)
}


func Active(c *gin.Context){
	user := c.PostForm("user")

	//var name string

	//v := c.p(&name)
	//fmt.Println(user)

	id := common.IsUser(user)
	if id != -1 {
		c.JSON(http.StatusOK, gin.H{
			"code":200,
			"name":user,
			"id": id,
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

