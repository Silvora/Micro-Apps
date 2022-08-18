import React from 'react'
import { Menu, Avatar, Dropdown, Space,Modal,Input,message,List,Button } from 'antd';
import { UserOutlined,AppstoreOutlined,UserAddOutlined,SubnodeOutlined,CheckCircleOutlined,CloseCircleOutlined, LogoutOutlined,BgColorsOutlined} from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux"
import { useEffect,useState } from 'react';


import {SetToYou,SetFriendsList,SetToApplyList,SetMyToYouMsgID} from "../store/modules/MyToYouInfo"
import Http from '../api/http';


export default function UserMenu() {
  const dispatch = useDispatch()

  const { MyName, MyUid, FriendsList,ToApplyList } = useSelector(state => state.MyToYouInfo)
  const [isModalVisible, SetIsModalVisible] = useState(-1);
  const [ToAddUserID, SetToAddUserID] = useState("");
  // const MyName = GetToken("name")
  // const MyUid = GetToken("id")
 // const 
 let ws
  useEffect(()=>{
    if(MyUid != ""){
      getFriendsList()
      ws = new WebSocket(`ws://192.168.1.10:12345/ws/updateMsg?uid=${MyUid}`)
      ws.onmessage = (e) =>{
        //console.log(e.data)
        let YouList = JSON.parse(e.data)
        //console.log(YouList)
        let list = []
        YouList.forEach(item=>{
          let addYou = item.split("/")
          let data = {
            key: addYou[0],
            name: addYou[1],
            id:addYou[2]
          }
          list.push(data)
        })
        dispatch(SetToApplyList(list))
      }
    }
  },[MyUid])

  const getFriendsList = ()=>{
    Http.Get(`/ws/getUserList?uid=${MyUid}`).then(res=>{
      if(res.code === 200){
        let list = []
        let IDList = {}
        //console.log(res.data)
        Object.entries(res.data).forEach(([key, value]) => {
          let user = key.split("-")
          if(MyUid !== user[1]){
            let result = {
              label: user[0],
              key: user[1],
            }
            IDList[user[1]] = []
            list.push(result)
          }
        });
        dispatch(SetFriendsList(list))
        dispatch(SetMyToYouMsgID(IDList))
      }
    })
  }

  const handleMenuItem = (item)=>{
    //console.log(item,item.label,item.key)
    dispatch(SetToYou(item.key))
  }

  const handleUserInfo = (item) =>{
    //console.log(item)
    SetIsModalVisible(item.key)
  }

  const handleAddUserID = (e) =>{
    SetToAddUserID(e.target.value)
  }
 

     
    const handleOk = () => {
        //console.log(isModalVisible)
        if(isModalVisible === 0){
            //console.log(UserID)
            Http.Get(`/ws/addUser?name=${MyName}&uid=${MyUid}&to_uid=${ToAddUserID}`).then(res=>{
              if(res.code === 200){
                //console.log(res)
                message.success(res.msg)
              }
            })
           
        }
        SetIsModalVisible(-1);
      };
    
      const handleCancel = () => {
        SetIsModalVisible(-1);
      };

      

      const handleIsUser = (item,isUser) =>{
       // console.log(item,isUser)
        let You = item.key + "/" + item.name +"/"+item.id
        let My = MyName + "-" + MyUid
        Http.Get(`/ws/isUser?My=${My}&You=${You}&isUser=${isUser}`).then(res=>{
          if(res.code === 200){
            //console.log(res)
            message.success(res.msg)

            let list =  ToApplyList.filter((element)=>{
              
              if(element.key !== item.key){

                return element
              }
            })
            //console.log(list)
            dispatch(SetToApplyList(list))
          }
        })
      }

      const menu = (
        <Menu
        onClick={handleUserInfo}
          items={[
            {
              label: "添加好友",
              icon: <UserAddOutlined />,
              key: '0',
            },
            {
                label: "好友申请",
                icon: <SubnodeOutlined />,
                key: '1',
              },
            {
                type: 'divider',
              },
            {
              label: "换肤",
              icon: <BgColorsOutlined />,
              key: '2',
            },
            {
              type: 'divider',
            },
            {
              label: '退出',
              icon: <LogoutOutlined/>,
              key: '3',
            },
          ]}
        />
      );
  return (
    <div className='UserMenu'>
        <div className='user userInfo'>
            <Avatar
                style={{
                    backgroundColor: '#87d068',
                }}
                icon={<UserOutlined />}
            />
             {MyName}

             <span className='SetApp'>
                {/* <AppstoreOutlined onClick={handleUserInfo}/> */}
                <Dropdown 
                    overlay={menu}
                    placement="bottomLeft"
                >
                    <span onClick={(e) => e.preventDefault()}>
                    <Space>
                        <AppstoreOutlined/>
                    </Space>
                    </span>
                </Dropdown>
            </span>
    </div>
        <div className='userList'>
            <Menu 
              mode="inline" 
              items={FriendsList} 
              onClick={handleMenuItem}
          />
        </div>
        <Modal title="添加好友" visible={isModalVisible === 0} onOk={handleOk} onCancel={handleCancel}>
        <Input placeholder="好友id" size="large" onChange={handleAddUserID}/>
      </Modal>
      <Modal title="添加好友" visible={isModalVisible === 2} onOk={handleOk} onCancel={handleCancel}>
      <p>换肤</p>
      </Modal>
      <Modal title="好友申请" visible={isModalVisible === 1} onOk={handleOk} onCancel={handleCancel}>
        <List
        itemLayout="horizontal"
        split="false"
        dataSource={ToApplyList}
        renderItem={(item) => (
            <List.Item
            key={item.key}
            actions={[<Button key="list-loadmore-edit" onClick={e=>{handleIsUser(item,1)}} icon={<CheckCircleOutlined />} type="primary">添加</Button>, <Button onClick={e=>{handleIsUser(item,0)}} icon={<CloseCircleOutlined />} key="list-loadmore-more" type="primary" danger>驳回</Button>]}
            >
                <List.Item.Meta
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title={<span>{item.name}</span>}
                description= {"ID:"+ item.id}
                />
            </List.Item>
        )}
        />
      </Modal>

    </div>
  )
}
