import React from 'react'
import { Polygon } from "@uiw/react-amap"
export default function Polygons(props) {
    const path = props.Path
    //console.log(path)
    
  return (
    <Polygon
            visiable="true"
            path={path}
            strokeColor="#FF33FF"
            strokeWeight={6}
            strokeOpacity={0.2}
            fillOpacity={0.4}
            fillColor="#1791fc"
            zIndex={50}
          >
        
      </Polygon>
  )
}
