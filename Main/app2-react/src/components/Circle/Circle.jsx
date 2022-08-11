import React from 'react'
import { Circle } from "@uiw/react-amap"
export default function Circles(props) {
    let CircleList = props.CircleData
  return (
    <>
     {
        CircleList.map(item=>{
            return <Circle key={item.id} visiable={item.visiable} radius={item.radius} center={item.position}  strokeColor="#fff"
            strokeWeight={2}/>
        })
    }
    </>
  )
}
