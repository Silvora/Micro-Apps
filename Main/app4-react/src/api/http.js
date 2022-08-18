import {GetToken} from "../utils/token"

class Http{
    constructor(){
        this.url = "http://192.168.1.10:12345"
    }
    async Post(url,data){
      const res = await  fetch(this.url+url,{
            method: "POST",
            headers: {
                //"Content-Type": "multipart/form-data;charset=utf-8",
                "token": GetToken("token"),
              },
            body: data,
        })

        return res.json()
    }
    async Get(url){
        const res = await  fetch(this.url+url,{
            method: "GET",
            headers: {
                //"Content-Type": "multipart/form-data;charset=utf-8",
                "token": GetToken("token")
              },
        })

        return res.json()
    }
}


export default new Http()