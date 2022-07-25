package main

import (
	"Web/route"
	"Web/tool"
)

func main() {
	//项目初始化
	tool.Init()
	//redis
	tool.InitRedis()
	//mysql
	tool.InitMysql()
	//gin
	app := tool.InitRouter()
	//加载路由
	route.Root(app)
	route.Video(app)
	//启动
	tool.AppRun(app)
}