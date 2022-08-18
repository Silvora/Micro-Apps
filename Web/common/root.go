package common

import (
	"Web/tool"
	"Web/utils"
	"log"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func UserRedis(id int64){
	Conn := tool.Pool.Get()
	defer Conn.Close()

	//uid :=strconv.FormatInt(id, 10)

	//str := name + "-" + uid
	_,err := Conn.Do("HSET","UserAll",id, "true")
	if err != nil {
		//log.Println("查询出错了", err)
		return
	}
}

func ExistUser(id int64, user string, pass string,c *gin.Context){
	sql := "SELECT name from root WHERE name="+user+" and pass="+pass
	var name string
	row := tool.DB.QueryRow(sql)
	err := row.Scan(&name)
	if err != nil {
		log.Println("查询出错了", err)
		return
	}
	token,_ := utils.GenerateToken(name)

	
	UserRedis(id)


	c.JSON(http.StatusOK, gin.H{
		"code":200,
		"id": id,
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

func AddUser(user string, pass string)int64{
	sql := "insert into root(name,pass) values(?,?)"

	//str, err := tool.DB.Prepare(sql)
	_,err := tool.DB.Exec(sql,user,pass)
	if err != nil {
		log.Println("mysql用户插入失败")
		return -1
	}

	idxSql := "select max(id) from root"
	var id int64
	row := tool.DB.QueryRow(idxSql)
	err = row.Scan(&id)
	if err != nil {
		log.Println("查询出错了", err)
		return -1
	}

	
	return id
}

func RedisAddUser(id int64, user string,c *gin.Context){
	key := strconv.FormatInt(id, 10)
	userBase := "user_" + key
	Conn := tool.Pool.Get()
	defer Conn.Close()

	_, err := Conn.Do("Hset", userBase, user+"-"+key, "true")
	if err != nil {
        log.Println("redis用户插入失败")
        return
    }

	token,_ := utils.GenerateToken(user)

	UserRedis(id)


	c.JSON(http.StatusOK, gin.H{
		"code":200,
		"id": id,
		"name": user,
		"token":token,
	})
}


func IsUser(key string) int64 {
	sql := "SELECT id,name from root WHERE name="+key

	type User struct{
		id int64
		name string
	}
	var user User
	row := tool.DB.QueryRow(sql)
	err := row.Scan(&user.id, &user.name)
	if err != nil {
		log.Println("查询出错了", err)
		return -1
	}
	//return isRoot
	
	return user.id
}