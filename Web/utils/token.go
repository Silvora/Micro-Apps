package utils

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func JWTAuth() gin.HandlerFunc {
	return func(c *gin.Context) {
		token := c.Request.Header.Get("Token")
		//Get("Authorization")
		url := c.Request.URL.Path
		//fmt.Println(token)
		if url == "/root/login" || url == "/root/addUser" {
			//c.Abort()
			return
		}
		if token == ""{
			c.JSON(http.StatusOK, gin.H{
				"msg": "请求未携带token, 无权限访问",
				"code": 401,
			})
			c.Abort()
			return
		}
		// parseToken 解析token包含的信息
		claims, err :=ParseToken(token)
		if err != nil {
			c.JSON(http.StatusOK, gin.H{
				//"msg": err.Error(),
				"msg": "身份信息已过期",
				"code":403,
			})
			c.Abort()
			return
		}
		// 继续交由下一个路由处理,并将解析出的信息传递下去
		c.Set("claims", claims)
	}
}