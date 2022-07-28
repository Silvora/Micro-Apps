package controller

import (
	"Web/common"
	"log"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)




func AddVideos(c *gin.Context){

	imgUrl := common.UpDownloadImages(c)

	videoUrl := common.UpDownloadVideos(c)

	if imgUrl == "" || videoUrl == "" {
		log.Println("上传错误")

		c.JSON(http.StatusOK, gin.H{
			"code": 304,
			"msg": "文件上传错误",
		})
	}else {
		common.AddVideos(c, imgUrl, videoUrl)		
	}
	

}

func GetVideos(c *gin.Context){

	//页数
	page := c.Query("page")
	class := c.DefaultQuery("selected", "")
	//fmt.Println(class)
	//int
	p, _ := strconv.Atoi(page)


	//开始数
	start := (p-1) * 6

	//结束数
	end := p*6

	s := strconv.Itoa(start)
	e := strconv.Itoa(end)

	common.GetVideosPage(c, s, e, class)

	// c.JSON(http.StatusOK, gin.H{
	// 	"code":"200",
	// 	"msg":"aaaa",
	// })
}


func GetVideo(c *gin.Context){
	id:= c.Param("id")
	common.GetVideo(c, id)
}