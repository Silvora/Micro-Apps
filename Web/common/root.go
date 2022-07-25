package common

import (
	"Web/tool"
	"Web/utils"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func ExistUser(user string, pass string,c *gin.Context){
	sql := "SELECT name from root WHERE name="+user+" and pass="+pass
	var name string
	row := tool.DB.QueryRow(sql)
	err := row.Scan(&name)
	if err != nil {
		log.Println("查询出错了", err)
		return
	}
	token,_ := utils.GenerateToken(name)
	c.JSON(http.StatusOK, gin.H{
		"code":200,
		"name": name,
		"token":token,

	})
}

func NoExistUser(c *gin.Context){
	c.JSON(http.StatusOK, gin.H{
		"code":406,
		"msg":"此用户不存在！！！",

	})
}

func AddUser(user string, pass string)bool{
	sql := "insert into root(name,pass) values(?,?)"

	//str, err := tool.DB.Prepare(sql)
	_,err := tool.DB.Exec(sql,user,pass)
	if err != nil {
		log.Println("mysql用户插入失败")
		return false
	}
	return err == nil
}

func RedisAddUser(user string,c *gin.Context){
	Conn := tool.Pool.Get()
	defer Conn.Close()
	_, err := Conn.Do("Hset", "root", user, user)
	if err != nil {
        log.Println("redis用户插入失败")
        return
    }

	token,_ := utils.GenerateToken(user)
	c.JSON(http.StatusOK, gin.H{
		"code":200,
		"name": user,
		"token":token,
	})
}