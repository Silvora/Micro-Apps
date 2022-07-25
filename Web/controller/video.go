package controller

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func AddVideos(c *gin.Context){
	fmt.Println("////////////////")

	name := c.PostForm("name")
	region := c.PostForm("region")
	desc := c.PostForm("desc")

	fmt.Println(name, region, desc)

	c.JSON(http.StatusOK, gin.H{
		"name": name,
		"reg": region,
		"desc": desc,
	})

}