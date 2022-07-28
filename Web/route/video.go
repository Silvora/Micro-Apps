package route

import (
	"Web/controller"

	"github.com/gin-gonic/gin"
)

func Video(router *gin.Engine){
	v := router.Group("/video")
	{
		//获取视频列表
		v.GET("/getVideos", controller.GetVideos)
		//添加视频
		v.POST("/addVideo", controller.AddVideos)

		//获取视频
		v.GET("/getVideo/:id", controller.GetVideo)
	}
}