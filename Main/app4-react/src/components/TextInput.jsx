import React from 'react'
import {useDispatch, useSelector} from "react-redux"
import { Input,Button } from 'antd';
import { useState } from 'react';
import { useRef } from 'react';
//import WebSocketConn from '../websocket/ws';
import { useEffect } from 'react';
import {AddMsgList} from "../store/modules/MyToYouInfo"

const { TextArea } = Input;
export default function TextInput() {
  const dispatch = useDispatch()
 
  const [value, setValue] = useState("")
  const inputRef = useRef(null)
  //const uid = window.localStorage.getItem("id")
  const {MyUid,ToUid} = useSelector(state=>state.MyToYouInfo)
  let ws

  if (MyUid != "" && ToUid != "") {
     ws = new WebSocket(`ws://192.168.1.10:12345/ws/action?uid=${MyUid}&to_uid=${ToUid}`) 
  }
  useEffect(()=>{
    if(MyUid != "" && ToUid != ""){
        ws.onmessage=(e)=>{
          //console.log(e.data)
          let data = JSON.parse(e.data) 
          if(data.sender){
            dispatch(AddMsgList(data))
          }
          //dispatch(AddMsgList(data))
        }
        // ws.onopen = (e) =>{
        //   console.log("aaaa")
        //   MyToYouMsgList()
        // }
    }
  },[MyUid,ToUid,ws])
 
  const MyToYouMsgList = () =>{
    //ws.send()
  }




  const handleInputMsg= (e) =>{
    setValue(e.target.value)
  }
  // const handleMsgOk = (e) =>{
  //   console.log(e.target.value)
  // }
  const handleToMsg = () =>{
    const data = {
      //title: value,
      content: value,
      sender: MyUid+"",
      recipient: ToUid
    }
    //console.log(data,ws)
    ws.send(JSON.stringify(data))
    setValue("")
    //inputRef.current.resizableTextArea.textArea.value = ""
    //console.log(inputRef.current.resizableTextArea.textArea.value)
    dispatch(AddMsgList({...data}))
    
  }
  return (
    <div className='input'>
        <div className='txetInput'>
            <TextArea 
              ref={inputRef}
              type="Input.TextArea"
              allowClear="true"
              showCount="true"
              maxLength="300"
              value={value}
              autoSize={{
                minRows: 3,
                maxRows: 3,
              }}
              onChange={handleInputMsg}
              //onPressEnter={handleToMsg}
              />
        </div>
        <div className='btnInput'>
          <Button type="primary" size="middle" onClick={handleToMsg}>发送</Button>
        </div>
    </div>
  )
}
