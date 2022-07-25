package route

import (
	"Web/controller"

	"github.com/gin-gonic/gin"
)

func Root(router *gin.Engine){
	root := router.Group("/root")
	{
		//登录
		root.POST("/login", controller.Login)
		//注册
		root.POST("/addUser", controller.AddUser)
		//状态维持
		root.POST("/active", controller.Active)
	}
}