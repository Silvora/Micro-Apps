import React from 'react'
import {Button, Form, Input,Modal } from 'antd';
import { LockOutlined, UserOutlined,ExclamationCircleOutlined } from '@ant-design/icons';
import {SetToken} from "../utils/token"
import Http from '../api/http';
import {useDispatch} from "react-redux"
import {SetMyinfo} from "../store/modules/MyToYouInfo"

const { confirm } = Modal;
export default function Login(props) {
    const dispatch = useDispatch()
    //console.log(props)
    const onFinish = (values) => {
        //console.log('Received values of form: ', values);
        let data = new FormData()
    
        data.append("user", values.user)
        data.append("pass", values.pass)

        Http.Post("/root/login", data).then(res=>{
           // console.log(data)
            if(res.code === 406){
              confirm({
                title: data.msg,
                icon: <ExclamationCircleOutlined />,
                content: '是否以此为账号进行注册？',
            
                onOk() {
                  //addUser(formData)
                  handleAddUser(data)
                },
            
                onCancel() {
                  //console.log('Cancel');
                },
              });
            }else{//登录成功
              //SetLocalStorage(data)
             // console.log(res)
              handleModalVisbel(res)
            }
        })
        
      };

      const handleModalVisbel=(res)=>{
        SetToken("name", res.name)
        SetToken("id", res.id)
        SetToken("token", res.token)
        dispatch(SetMyinfo(res))
        props.SetModalVisible()
      }

      const handleAddUser = (data)=>{
        Http.Post("/root/addUser", data).then(res=>{
            // console.log(data)
             if(res.code === 200){
                handleModalVisbel(res)

            }
        })

    }
    


  return (
    <>
        <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="user"
        rules={[
          {
            required: true,
            message: '请输入账号？',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="账号" />
      </Form.Item>
      <Form.Item
        name="pass"
        rules={[
          {
            required: true,
            message: '请输入密码？',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="密码"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" style={{width:"100%"}}>
          登录
        </Button>
      </Form.Item>
    </Form>
    </>
  )
}
