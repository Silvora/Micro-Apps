package tool

import (
	"Web/config"
	"database/sql"
	"log"

	_ "github.com/go-sql-driver/mysql"
)


var (
	DB *sql.DB
)

func InitMysql(){
	//构建连接："用户名:密码@tcp(IP:端口)/数据库?charset=utf8"
	name := config.SqlName
	pass := config.SqlPass
	ip := config.SqlIp
	prot := config.SqlPort
	db := config.SqlDb
	dns:= name+":"+pass+"@tcp("+ip+":"+prot+")/"+db+"?charset=utf8"
	//fmt.Println(dns)

	//打开数据库,前者是驱动名，所以要导入： _ "github.com/go-sql-driver/mysql"
	DB, _ = sql.Open("mysql", dns)
	
	//设置数据库最大连接数
	DB.SetConnMaxLifetime(100)
	//设置上数据库最大闲置连接数
	DB.SetMaxIdleConns(10)

	//验证连接
	if err := DB.Ping(); err != nil {
		log.Println("mysql连接失败")
		return
	}
	log.Println("mysql连接成功")
}


