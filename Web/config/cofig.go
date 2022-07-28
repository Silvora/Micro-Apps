package config

//app
var (
	AppName = "Web"
	AppMode = "debug"
	//AppHost = "192.168.1.10"
	AppHost = "127.0.0.1"
	AppProt = "12345"
)

//mysql数据库配置
var (
	SqlName = "root"
	SqlPass = "757909414"
	SqlIp       = "127.0.0.1"
	SqlPort     = "3306"
	SqlDb   = "Web"
)
// var (
// 	SqlName = "admin"
// 	SqlPass = "admin"
// 	SqlIp       = "107.173.156.98"
// 	SqlPort     = "3306"
// 	SqlDb   = "Web"
// )


//redis数据库配置
var (
	RedisMaxIdle = 3
	RedisMaxActive = 8
	RedisIp       = "127.0.0.1"
	RedisPort     = "6379"
)

// var (
// 	RedisMaxIdle = 3
// 	RedisMaxActive = 8
// 	RedisIp       = "107.173.156.98"
// 	RedisPort     = "6379"
// )