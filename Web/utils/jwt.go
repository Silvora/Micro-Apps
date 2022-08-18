package utils

import (
	"time"

	"github.com/golang-jwt/jwt"
)

var jwtKey = []byte("MyToken")

type Claims struct {
	//UID uint `json:"uid"`
	Name string `json:"name"`
	//Pass string `json:"pass"`
	jwt.StandardClaims
}

func GenerateToken(name string) (string, error) {
	nowTime := time.Now()                       //当前时间
	expireTime := nowTime.Add(60*60*24 * time.Minute) //有效时间

	claims := &Claims{
		name,
		//pass,
		jwt.StandardClaims{
			ExpiresAt: expireTime.Unix(), //过期时间
			Issuer:    "its me Zjs",          //指定发行人
		},
	}
	tokenClaims := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	//该方法内部生成签名字符串，再用于获取完整、已签名的token
	token, err := tokenClaims.SignedString(jwtKey)
	//fmt.Println(tokenClaims, token)
	return token, err
}

// 根据传入的token值获取到Claims对象信息，（进而获取其中的用户名和密码）
func ParseToken(token string) (*Claims, error) {
	tokenClaims, err := jwt.ParseWithClaims(token, &Claims{}, func(token *jwt.Token) (interface{}, error) {
		return jwtKey, nil
	})

	if tokenClaims != nil {
		if claims, ok := tokenClaims.Claims.(*Claims); ok && tokenClaims.Valid {
			return claims, nil
		}
	}
	return nil, err
}