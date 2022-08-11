import React from 'react'
import { ScaleControl } from "@uiw/react-amap"

export default function Scale() {
  return (
    <ScaleControl
    visiable="true"
    offset={[10, 10]}
    position="LT"
  />
  )
}
