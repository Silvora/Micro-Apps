import React from 'react'
import { Marker } from "@uiw/react-amap"
export default function Markers(props) {
   // console.log(props.Marker)
    let MarkerList = props.MarkerData
    //console.log(props.MarkerData,MarkerList)
  return (
    <>
     {
        MarkerList.map(item=>{
            return <Marker key={item.id} visiable={item.visiable} title={item.title} position={item.position}/>
        })
    }
    </>
   
  )
} 
