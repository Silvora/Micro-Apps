package tool

import (
	"Web/config"
	"Web/utils"
	"io"
	"log"
	"os"

	"github.com/gin-gonic/gin"
)

func InitRouter() *gin.Engine{

	logFile, err := os.Create("./http_serve.log")
	if err!=nil {
		log.Println("日志创建成功")
	}
	gin.SetMode(gin.DebugMode)
	gin.DefaultWriter=io.MultiWriter(logFile)
	router:=gin.Default()

	router.Use(utils.Cors())
	router.Use(utils.JWTAuth())
	return router
	
}


func AppRun(router *gin.Engine){
	//route.Route(router)
	host := config.AppHost + ":" + config.AppProt
	router.Run(host)
}