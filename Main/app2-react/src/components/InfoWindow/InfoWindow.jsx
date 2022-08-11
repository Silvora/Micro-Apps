import React from 'react'
import { InfoWindow } from "@uiw/react-amap"
export default function InfoWindows(props) {
    let infoList = props.infoData
  return (
    <>
    {
       infoList.map(item=>{
           return <InfoWindow key={item.id} 
           visiable={item.visiable} 
           radius={item.radius} 
           content={item.info}
           position={item.position}  
           strokeColor="#fff"
           strokeWeight={2}/>
       })
   }
   </>
  )
}
