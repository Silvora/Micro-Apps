
class WebSocketConn {
    constructor(uid, to_uid){
        this.ws = new WebSocket(`ws://192.168.1.10:12345/ws/action?uid=${uid}&to_uid=${to_uid}`)
    }
    // ws.onopen = (e)=>{
    //     console.log("///",e)
    //  }
    //  ws.onmessage = (e)=>{
    //   console.log("----",e)
    //  }
    //  ws.onclose = (e) =>{
    //   console.log("***",e)
    //  }
    Open(){
        this.ws.onopen = (e) =>{
           // console.log(e)
            return e
        }
    }

    // Messages(){
    // this.ws.onmessage = (e) =>{
    //     console.log(e.data)
    //   return e.data
    // }
    //  //return data
    // }
    Erroe(){
        this.ws.onerror = (e) =>{
           
            return e
        }
    }
   
    Send(data){
        this.ws.send(data)
    }

    Close(){
        this.ws.onclose = () =>{
            alert("链接关闭...")
        }

    }
}


export default WebSocketConn