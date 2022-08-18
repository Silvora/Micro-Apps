package route

import (
	"Web/controller"

	"github.com/gin-gonic/gin"
)

func WebSocket(router *gin.Engine){

	go controller.Manager.Start()

	w := router.Group("/ws")
	{
		//通讯信息
		w.GET("/action", controller.GetWsHandler)

		//历史记录
		w.GET("/msg", controller.GetUserMsgList)

		//用户状态
		w.GET("/user", controller.GetUserAction)


		//用户状态，添加用户
		w.GET("/addUser", controller.SetMyToYou)


		//提示消息，更新消息
		w.GET("/updateMsg", controller.SetUpdateMsg)


		//添加好友，取消好友
		w.GET("/isUser", controller.SetYouDB)


		//好友列表
		w.GET("/getUserList", controller.GetUserList)
	}

	
}