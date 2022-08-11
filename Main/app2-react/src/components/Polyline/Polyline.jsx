import React from 'react'
import { Polyline } from '@uiw/react-amap';
export default function Polylines(props) {

    console.log(props.PathLine)
    const path= props.PathLine
  return (
    <Polyline
    visiable="true"
    strokeOpacity={1}
    path={path}
  />
  )
}
