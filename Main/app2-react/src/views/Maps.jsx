import React,{useState} from 'react'
import {Map, APILoader } from "@uiw/react-amap";
import Scale from "../components/Control/ScaleControl";
import ToolBar from "../components/Control/ToolBarControl";
import MapType from "../components/Control/MapTypeControl";
import ControlBar from "../components/Control/ControlBarControl";
import HawkEye from "../components/Control/HawkEyeControl";
import Markers from "../components/Marker/Marker";
import Polygons from "../components/Polygon/Polygon"
import Polylines from '../components/Polyline/Polyline';
import Circles from '../components/Circle/Circle';
import InfoWindows from '../components/InfoWindow/InfoWindow';

export default function Maps() {
    const [AMap, setAMap] = useState(null);
  const [center, setCenter] = useState([114.048987, 22.539712]);
  const [zoom, setZoom] = useState(15);
  //const [pitch, setPitch] = useState(15);
  const [viewMode, setViewMode] = useState("2D");
  const [MarkerData, setMarkerData] = useState([]);

  const [PathLine, setPathLine] = useState([]);

  const [CircleData, setCircleData] = useState([]);

  const [infoData, setInfoData] = useState([]);

  const [Path, setPath] = useState([
    [114.003322, 22.520255],
    [114.010703, 22.597555],
    [114.002292, 22.592353],
    [114.089846, 22.691365],
  ])
  const MapAddress = (e) => {
   // console.log(e);
   // console.log(window)
    let address = [
      ...MarkerData,
      {
        id: Math.random() * 10000,
        title: Math.random() * 10000,
        visiable: true,
        position: e.lnglat,
      },
    ];

    let line = [...PathLine, e.lnglat]

    let Circle  = [
        ...CircleData,
        {
          id: Math.random() * 10000,
          radius: Math.random() * 100,
          visiable: true,
          position: e.lnglat,
        },
      ];

      let info  = [
        ...infoData,
        {
          id: Math.random() * 10000,
          info: `<p class='input-item'>经度 : ${e.lnglat.lng}</p> 
          <p class='input-item'>纬度 : ${e.lnglat.lat}</p>`,
          visiable: true,
          position: e.lnglat,
        },
      ];
    setMarkerData(address);
    setPathLine(line)
    setCircleData(Circle)
    setInfoData(info)

    // let data = [...Path, e.lnglat]
    // setPath(data)
    // console.log(data)

  };
  const MapLoad = (data, de) => {
    //console.log(data,de,window)
    setAMap(window.AMap);
    //console.log(AMap)
  };
  return (
    <>
     <APILoader plugin="AMap.PolygonEditor" akay="f0305f4fddb6c8ca51784fccded49df7">
        <Map
          zoom={zoom}
          center={center}
          viewMode={viewMode}
          pitch={viewMode === "2D" ? 0 : 40}
          onClick={MapAddress}
          onComplete={MapLoad}
        >
          <Scale></Scale>
          <ToolBar></ToolBar>
          <MapType></MapType>
          <ControlBar></ControlBar>
          <HawkEye></HawkEye>
          <Markers MarkerData={MarkerData}></Markers>
          <Polygons Path={Path}></Polygons>
          <Polylines PathLine={PathLine}></Polylines>
          <Circles CircleData={CircleData}></Circles>
          <InfoWindows infoData={infoData}></InfoWindows>
        </Map>
        </APILoader>
    </>
  )
}
