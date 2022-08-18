import React from "react";
import { Avatar, List } from "antd";
import {useDispatch, useSelector} from "react-redux"
import { useEffect,useRef } from "react";
import {AddMsgList} from "../store/modules/MyToYouInfo"
import Http from "../api/http";
export default function UserMessges() {
  const dispatch = useDispatch()
  const {MyUid,ToUid, MyToYouMsg} = useSelector(state=>state.MyToYouInfo)

  useEffect(()=>{
    if(MyUid !== "" && ToUid !== ""){
      // if(MyToYouMsg[ToUid] === void 0){
      //   dispatch(SetMyToYouMsgID(ToUid))
      // }

      Http.Get(`/ws/msg?uid=${MyUid}&to_uid=${ToUid}`).then(res=>{
        //console.log(res)
        if(res.code === 200 && res.data !== null){
          res.data.forEach(item=>{
            dispatch(AddMsgList(item))
          })
        }
      })
    }
  },[MyUid,ToUid])
    //const {MsgList} = useSelector(state=>state.UserMsg)
    //const {ToUser} = useSelector(state=>state.ToUserMsg)
    const MegContext = useRef(null)

    //const uid = window.localStorage.getItem("id")
    useEffect(()=>{   
     // console.log(MsgList[ToUser])
     console.log({...MyToYouMsg},MyToYouMsg[ToUid])
     let idx = MyToYouMsg[ToUid].length
       if(idx > 5 ){
          MegContext.current.scrollTop = idx * 56
       }
    },[MyToYouMsg])



  return (
<div className="userMessges" ref={MegContext}>
<List
  itemLayout="horizontal"
  split="false"
  dataSource={MyToYouMsg[ToUid]}
  renderItem={(item) => (
    <List.Item>
      <List.Item.Meta className={item.recipient == ToUid ? 'right' : 'left'}
        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
        title={<div className="messges"><div className="Hold"></div>{item.content}</div>}
      />
    </List.Item>
  )}
/>
</div>
  );
}
