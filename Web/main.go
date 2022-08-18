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
	//mongo
	tool.InitMongo()
	//gin
	app := tool.InitRouter()
	//加载路由
	route.Root(app)
	route.Video(app)
	//go controller.Manager.Start()

	route.WebSocket(app)
	app.Static("/images","./files/images")
	app.Static("/videos","./files/videos")
	//route.Static(app)

	// var num = regexp.MustCompile(`/LIVE/`)
    // str := "/home/zf/LIVE/asdfa"
    // if num.MatchString(str) {
    //     fmt.Printf("%s", "xxx")
    // }
	//启动
	tool.AppRun(app)
}