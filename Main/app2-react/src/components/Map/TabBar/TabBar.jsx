import React from 'react'
import {Button} from "antd"
import Control from './Control'
import Marker from './Marker'
import Editor from './Editor'
import Driving from "./Driving"

export default function TabBar(props) {
   // console.log(props.type)
    let Type = props.type
   // console.log(props,Type)
    const onVisible = ()=>{
        props.handleVisible()
    }
  return (
    <div className='bar' style={{width:"460px",height:"300px"}}>
        {
           Type == "地图控件" ? <Control></Control>:<></>
        }
        {
           Type == "图层管理" ? <Marker></Marker>:<></>
        }
        {
           Type == "编辑图层" ? <Editor></Editor>:<></>
        }
        {
           Type == "路线规划" ? <Driving></Driving>:<></>
        }
        {
           Type == "天气" ? <div>432432432432</div>:<></>
        }
        {
           Type == "搜索" ? <div>432432432432</div>:<></>
        }
        <footer className='barFooter'>
            <Button type="primary" size="small" onClick={onVisible}>确认</Button>
        </footer>
    </div>
  )
}
