package common

import (
	"Web/tool"
	"fmt"
	"log"
	"net/http"
	"path"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type Video struct {
	Id int `json:"id"`
	Name string `json:"name"`
	Region string `json:"region"`
	Introduce string `json:"introduce"`
	ImgUrl string `json:"imgUrl"`
	VideoUrl string `json:"videoUrl"`
	Admin string `json:"admin"`
	Date string `json:"date"`

}


func UpDownloadImages(c *gin.Context) string{
	imgFile, err := c.FormFile("imgFile")
	if err != nil {  
		log.Println("imgFile错误")
		return ""
	}
	
	imgExt := path.Ext(imgFile.Filename)
	// fmt.Println(imgName)
	imgExt = strings.ToLower(imgExt)
	// fmt.Println(imgName)
	id := uuid.New().String()
	
	imgUrl := "./files/images/" + id + imgExt
	//imgUrl := "/usr/local/nginx/serve/files/images/" + id + imgExt

	err = c.SaveUploadedFile(imgFile,imgUrl)
	if err != nil {
		fmt.Println(err)
		return ""
	}

	return id + imgExt
}

func UpDownloadVideos(c *gin.Context) string{
	videoFile, err := c.FormFile("videoFile")

	if err != nil {  
		log.Println("videoFile错误")
		return ""
	}
	
	videoExt := path.Ext(videoFile.Filename)
	// fmt.Println(imgName)
	videoExt = strings.ToLower(videoExt)
	// fmt.Println(imgName)
	id := uuid.New().String()
	
	videoUrl := "./files/videos/" + id + videoExt
	//videoUrl := "/usr/local/nginx/serve/files/videos/" + id + videoExt

	err = c.SaveUploadedFile(videoFile,videoUrl)
	if err != nil {
		fmt.Println(err)
		return ""
	}
	return id + videoExt
}


func AddVideos(c *gin.Context, imgUrl string, videoUrl string){
	name := c.PostForm("name")
	region := c.PostForm("region")
	introduce := c.PostForm("desc")
	admin := c.PostForm("admin")
	date := time.Now().Format("2006-01-02 15:04:05")
	sql := "insert into video(name,region, introduce, imgUrl, videoUrl,admin,date) values(?,?,?,?,?,?,?)"

	//str, err := tool.DB.Prepare(sql)
	//fmt.Println(name,region,introduce,imgUrl,videoUrl)
	_,err := tool.DB.Exec(sql,name,region,introduce,imgUrl,videoUrl,admin,date)
	if err != nil {
		log.Println("mysql用户插入失败",err)

		return
	}

	c.JSON(http.StatusOK, gin.H{
		"code": 200,
		"msg": "视频添加成功",
	})

	//fmt.Println(name, region, desc)

}

func GetVideosPage(c *gin.Context, start string, end string, class string){

	var video Video
	var total int64

	videos := make([]Video, 0)

	dataStart := "SELECT COUNT(*) FROM video"
	dataEnd := " WHERE region= '"+ class +"'"

	var dataSum string
	sql := "SELECT SQL_CALC_FOUND_ROWS id, name, region, introduce, imgUrl, videoUrl, admin, date FROM video"
	
	whereSql := " WHERE region= '"+class+"'"
	searchSql := " LIMIT "+start+","+end
	if class != "首页"{
		sql = sql + whereSql + searchSql
		dataSum = dataStart + dataEnd

	}else{
		sql = sql + searchSql
		dataSum = dataStart

	}





	totals, err := tool.DB.Query(dataSum)
	if err != nil {
		log.Println("video查询出错", err)
	}

	for totals.Next() {
		totals.Scan(
			&total,
		)
	}

	

	rows, err := tool.DB.Query(sql)
	if err != nil {
		log.Println("video查询出错", err)
	}

	for rows.Next() {
        err := rows.Scan(&video.Id, &video.Name, &video.Region, &video.Introduce, &video.ImgUrl, &video.VideoUrl, &video.Admin, &video.Date)
        if err != nil {
            log.Printf("scan failed, err:%v\n", err)
            return
        }
       // fmt.Printf("user:%#v\n", video)
	   videos = append(videos, video)
    }

	c.JSON(http.StatusOK,gin.H{
		"code": 200,
		"count": total,
		"data": videos,
	})

}

func GetVideo(c *gin.Context, id string){
	sql := "SELECT id, name, region, introduce, imgUrl, videoUrl,admin,date from video WHERE id="+ id
	var video Video
	row := tool.DB.QueryRow(sql)
	err := row.Scan(&video.Id, &video.Name, &video.Region, &video.Introduce, &video.ImgUrl, &video.VideoUrl, &video.Admin, &video.Date)
	if err != nil {
		log.Println("查询出错了", err)
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"code":200,
		"data": video,
	})
}