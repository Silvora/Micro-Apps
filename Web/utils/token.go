package utils

import (
	"net/http"
	"regexp"

	"github.com/gin-gonic/gin"
)

func JWTAuth() gin.HandlerFunc {
	return func(c *gin.Context) {
		token := c.Request.Header.Get("Token")
		//Get("Authorization")
		url := c.Request.URL.Path
		//fmt.Println(token)
		var imgUrl = regexp.MustCompile(`/images`)
		var videoUrl = regexp.MustCompile(`/videos`)
		
		if url == "/root/login" || url == "/root/addUser" || imgUrl.MatchString(url) || videoUrl.MatchString(url){
			//c.Abort()
			return
		}
		if token == ""{
			c.JSON(http.StatusOK, gin.H{
				//"msg": "当前未登录系统, 无权限访问子应用",
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