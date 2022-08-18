package controller

import (
	"Web/tool"
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strings"
	"time"

	"github.com/garyburd/redigo/redis"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/gorilla/websocket"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
)

//websocket 管理
type ClientManager struct {
    Clients    map[string]*Client
    Broadcast  chan []byte
    Register   chan *Client
    Unregister chan *Client
}

//websocket 用户信息
type Client struct {
    ID     string
    Socket *websocket.Conn
    Send   chan []byte
}

// websocket 消息信息
type Message struct {
    Sender    string `json:"sender,omitempty"`
    Recipient string `json:"recipient,omitempty"`
    Content   string `json:"content,omitempty"`
}

// websocket 服务管理器
var Manager = ClientManager{
    Broadcast:  make(chan []byte),
    Register:   make(chan *Client),
    Unregister: make(chan *Client),
    Clients:    make(map[string]*Client),
}

// Start is  项目运行前, 协程开启start -> go Manager.Start()
func (manager *ClientManager) Start() {
    for {
        //log.Println("<---管道通信--->")
        select {
        case conn := <-Manager.Register:
			//fmt.Println(&conn)
            log.Printf("用户加入:%v", conn.ID)
            Manager.Clients[conn.ID] = conn
            jsonMessage, _ := json.Marshal(&Message{Content: "连接成功"})
            conn.Send <- jsonMessage
			//Manager.Send(jsonMessage, conn)

        case conn := <-Manager.Unregister:
            log.Printf("用户离开:%v", conn.ID)
            if _, ok := Manager.Clients[conn.ID]; ok {
                
				jsonMessage, _ := json.Marshal(&Message{Content: "退出连接"})
                UidClose(conn.ID)
                conn.Send <- jsonMessage
				//Manager.Send(jsonMessage, conn)

                close(conn.Send)
                delete(Manager.Clients, conn.ID)

				
            }

        case message := <-Manager.Broadcast:
			//log.Printf("////////////:%v", string(message))
			MessageStruct :=Message{}
            json.Unmarshal(message, &MessageStruct)
			for id, conn := range Manager.Clients {
                if id!=creatId(MessageStruct.Recipient,MessageStruct.Sender){
                    continue
                }
                select {
                case conn.Send <- message:
                default:
                    close(conn.Send)
                    delete(Manager.Clients, conn.ID)
                }
            }
        }
    }
}

func UidClose(ID string){

    arr := strings.Split(ID,"-")
    id := arr[0]
    Conn := tool.Pool.Get()
	defer Conn.Close()

	//uid :=strconv.FormatInt(id, 10)

	//str := name + "-" + uid
	_,err := Conn.Do("HSET","UserAll",id, "false")
	if err != nil {
		//log.Println("查询出错了", err)
		return
	}

}

//用户通讯联系信息
func creatId(uid,touid string) string {
    return uid+"-"+touid
}
//用户接收消息
func (c *Client) Read() {
    defer func() {
        Manager.Unregister <- c
        c.Socket.Close()
    }()

    for {
       // c.Socket.PongHandler()
        _, message, err := c.Socket.ReadMessage()
        if err != nil {
            Manager.Unregister <- c
            c.Socket.Close()
            break
        }
		//message = []byte(message)

		log.Printf("读取到客户端的信息:%s", []byte(message),string(c.ID))
		//tool.Mongo.InsertOne()
		// jsonMessage, _ := json.Marshal(&Message{Sender: c.ID, Content: string(message)})
		// fmt.Println(c, string(jsonMessage))
        Manager.Broadcast <- message


		
	 
		
		//fmt.Println(resMap["content"])
		

        AddMongoMsg(c.ID, message)
		
    }
}

func AddMongoMsg(id string, message []byte){

    u_to := string([]byte(id))

    var resMap map[string]interface{}
    
	err := json.Unmarshal([]byte(message), &resMap)
    if err != nil {
        fmt.Println("string转map失败", err)
    }


    _, err = tool.Mongo.Collection(u_to).InsertOne(context.TODO(), resMap)
		if err != nil {
			log.Fatal(err)
		}


    arr := strings.Split(u_to, "-")
    to_u := arr[1] +"-" +arr[0]
    _, err = tool.Mongo.Collection(to_u).InsertOne(context.TODO(), resMap)
    if err != nil {
        log.Fatal(err)
    }
}

//用户发送信息
func (c *Client) Write() {
    defer func() {
        c.Socket.Close()
    }()

    for {
        select {
        case message, ok := <-c.Send:
            if !ok {
                c.Socket.WriteMessage(websocket.CloseMessage, []byte{})
                return
            }
            log.Printf("发送到到客户端的信息:%s", string(message))


            c.Socket.WriteMessage(websocket.TextMessage, message)
        }
    }
}

var upGrader = websocket.Upgrader{  
	CheckOrigin: func (r *http.Request) bool {  
	   return true  
	},  
 } 
//TestHandler socket 连接 中间件 作用:升级协议,用户验证,自定义信息等
func GetWsHandler(c *gin.Context) {
    uid := c.Query("uid")
    touid := c.Query("to_uid")
    conn, err := upGrader.Upgrade(c.Writer, c.Request, nil)

    if err != nil {
        http.NotFound(c.Writer, c.Request)
        return
    }
    //可以添加用户信息验证
    client := &Client{
        ID:    creatId(uid,touid),
        Socket: conn,
        Send:   make(chan []byte),
    }
	//通讯注册
    Manager.Register <- client
	//读取
    go client.Read()
	//写出
    go client.Write()
}





//  func UserAction(c *gin.Context){
// 	Conn := tool.Pool.Get()
// 	defer Conn.Close()
// 	result, err := redis.StringMap(Conn.Do("hgetall", "Action_root"))
// 	if err != nil {
// 		log.Println(err)
// 	}
// 	//fmt.Println(data)
// 	ws, err := upGrader.Upgrade(c.Writer, c.Request, nil)  

// 	if err != nil {  
// 	   return  
// 	}  

// 	//defer ws.Close()

// 	err = ws.WriteJSON(result)
// 	if err != nil {
// 		return
// 	}

//  }



// func AddWebSocketMsg(c *gin.Context){
// 	 //升级get请求为webSocket协议
// 	 ws, err := upGrader.Upgrade(c.Writer, c.Request, nil)  

// 	 if err != nil {  
// 		return  
// 	 }  

// 	 defer ws.Close()

// 	 for {
//         //读取ws中的数据
//         mt, message, err := ws.ReadMessage()
//         if err != nil {
//             //c.Writer.Write([]byte(err.Error()))
//             break
//         }
//         //fmt.Println("client message " + string(message))
//         //写入ws数据
//         err = ws.WriteMessage(mt, message)
//         if err != nil {
//             break
//         }
//         //fmt.Println("system message " + time.Now().String())

// 		//time.Sleep(time.Second *3)
//     }
// }



func GetUserMsgList(c *gin.Context){
	var results []*Message

	uid := c.Query("uid")
    touid := c.Query("to_uid")

	id := uid + "-" + touid
	fmt.Println(uid, touid, id)
	
	findOptions := options.Find()
	cur, err := tool.Mongo.Collection(id).Find(context.TODO(), bson.D{{}}, findOptions)
	if err != nil {
        log.Fatal(err)
    }
	for cur.Next(context.TODO()) {
        //定义一个文档，将单个文档解码为result
        var result Message
        err := cur.Decode(&result)
        if err != nil {
            log.Fatal(err)
        }
        results = append(results, &result)
    }


    if err := cur.Err(); err != nil {
        log.Fatal(err)
    }
    //遍历结束后关闭游标
    cur.Close(context.TODO())

	c.JSON(http.StatusOK, gin.H{
		"code": 200,
		"data": results,
	})
	
}

func WsUserAction(user string) map[string]string{
    Conn := tool.Pool.Get()
	defer Conn.Close()
	UserAction, err := redis.StringMap(Conn.Do("HGetAll", user))
    if err != nil {
        log.Fatal(err)
        //return map]type
    }

    UserAll, err := redis.StringMap(Conn.Do("HGetAll", "UserAll"))
    if err != nil {
        log.Fatal(err)
        //return map]type
    }
    //fmt.Println(UserAction,UserAll)

    for k,v := range UserAction{
        id := strings.Split(k, "/")[1]
       
        for kk,vv := range UserAll{
            if id == kk {
                if v == vv {
                    break
                }else{
                    _,err := Conn.Do("HSET",user,k,vv)
                    if err != nil {
                        //log.Println("查询出错了", err)
                        break
                    }
                }
            }
        }
    }


    User, err := redis.StringMap(Conn.Do("HGetAll", user))
    if err != nil {
        log.Fatal(err)
        //return map]type
    }
	

    return User

}

func GetUserAction(c *gin.Context){

	uid := c.Query("uid")

	user := "user_"+uid


    updateMsg, err := upGrader.Upgrade(c.Writer, c.Request, nil)

    if err != nil {
        http.NotFound(c.Writer, c.Request)
        return
    }

    for{
        data := WsUserAction(user)
      // fmt.Println("aaaa")
        //写入ws数据
        // mt, message, err := updateMsg.ReadMessage()
        // if err != nil {
        //     //c.Writer.Write([]byte(err.Error()))
        //     return
        // }
        // var resMap map[string]string

        // //resMap["a"] = "aaaa"
        // resMap["id"] = uid
        //err = updateMsg.WriteJSON()
        if(data == nil){
            return
        }
        err = updateMsg.WriteJSON(data)
        if err != nil {
            log.Fatal(err)
        }

        time.Sleep(time.Second*10)
        // fmt.Println("system message " + time.Now().String())
    }
}

func SetMyToYou(c *gin.Context){
    // ws, err := upGrader.Upgrade(c.Writer, c.Request, nil)  

	// if err != nil {  
	//    return  
	// }  

	// defer ws.Close()

    uid := c.Query("uid")
    name := c.Query("name")
    touid := c.Query("to_uid")

	//user := "user_"+uid

	Conn := tool.Pool.Get()
	defer Conn.Close()
	// UserAction, err := redis.StringMap(Conn.Do("HGetAll", user))
    id := uuid.New().String()
    _,err := Conn.Do("hset","My-to-You",id + "/" + name+"/"+uid, touid)

	if err != nil {
        log.Fatal(err)
    }
    //GetUserAction(c)
    c.JSON(http.StatusOK, gin.H{
        "code": 200,
        "msg": "请求发送完成",
    })
    // var resMap map[string]interface{}

    //SetUpdateMsg(c)
    // resMap[name + "-" + uid] = touid

    // err = ws.WriteJSON(resMap)
    // if err != nil {
    //     log.Fatal(err)
    // }

}

func updateWriteMsg(uid string) []string{
    Conn := tool.Pool.Get()
	defer Conn.Close()
	// UserAction, err := redis.StringMap(Conn.Do("HGetAll", user))
   // id := uuid.New().String()
    addUserMsg,err := redis.StringMap(Conn.Do("HGETALL","My-to-You"))

	if err != nil {
        log.Fatal(err)
    }
    var data []string
    
    for k, v := range addUserMsg {
        //fmt.Println(k, v)
        if v == uid {
            data = append(data, k)
        }
    }

    return data

  // fmt.Println(data)
}

func SetUpdateMsg(c *gin.Context){
    // updateMsg, err := upGrader.Upgrade(c.Writer, c.Request, nil)
    // if err != nil {  
	//    return 
	// }  
    //var updateMsg
    //var updateMsg interface{}

     
    uid := c.Query("uid")
    
    fmt.Println(uid)
    updateMsg, err := upGrader.Upgrade(c.Writer, c.Request, nil)

    if err != nil {
        http.NotFound(c.Writer, c.Request)
        return
    }
   // defer updateMsg.Close()

    // if err != nil {  
    // return  
    // } 

    for{
        data := updateWriteMsg(uid)
      // fmt.Println("aaaa")
        //写入ws数据
        // mt, message, err := updateMsg.ReadMessage()
        // if err != nil {
        //     //c.Writer.Write([]byte(err.Error()))
        //     return
        // }
        // var resMap map[string]string

        // //resMap["a"] = "aaaa"
        // resMap["id"] = uid
        //err = updateMsg.WriteJSON()
        if(data == nil){
            return
        }
        err = updateMsg.WriteJSON(data)
        if err != nil {
            log.Fatal(err)
        }

        time.Sleep(time.Second*5)
        // fmt.Println("system message " + time.Now().String())
    }
	

    // err = updateMsg.WriteJSON(resMap)
    // if err != nil {
    //     log.Fatal(err)
    // }
}


func SetYouDB(c *gin.Context){
    // key := c.Query("key")
    // toname := c.Query("toname")
    // name := c.Query("name")
    // touid := c.Query("to_uid")
    // uid := c.Query("uid")
    My := c.Query("My")
    You := c.Query("You")
    isUser := c.Query("isUser")
   // touid := c.Query("to_uid")
    //fmt.Println(key,id,uid,isUser)
    Conn := tool.Pool.Get()
	defer Conn.Close()
    //str := key +"/" + toname +"/"+touid
    _,err := Conn.Do("HDEL","My-to-You", You)
	if err != nil {
        log.Fatal(err)
        return
    }

   if isUser == "1" {
    MyInfo := strings.Split(My,"-")
    YouInfo := strings.Split(You,"/")
	// UserAction, err := redis.StringMap(Conn.Do("HGetAll", user))
   // id := uuid.New().String()
    // addUserMsg,err := redis.StringMap(Conn.Do("HGETALL","My-to-You"))
   

    user := "user_"+ MyInfo[1]
   _,err =  Conn.Do("HSET",user,YouInfo[1]+"-"+YouInfo[2],"true" )
   if err != nil {
        log.Fatal(err)
        return
    }


    toUser := "user_" + YouInfo[2]
    _,err =  Conn.Do("HSET",toUser,My,"true" )
    if err != nil {
        log.Fatal(err)
        return
    }

   }


   c.JSON(http.StatusOK, gin.H{
        "code": 200,
        "msg": "操作成功",
   })


}



func GetUserList(c * gin.Context){
    uid := c.Query("uid")

    Conn := tool.Pool.Get()
	defer Conn.Close()
    user := "user_"+uid
    UserList, err := redis.StringMap(Conn.Do("HGetAll", user))
    if err != nil {
        log.Fatal(err)
        //return map]type
    }
    c.JSON(http.StatusOK, gin.H{
        "code": 200,
        "data": UserList,
   })

    
}