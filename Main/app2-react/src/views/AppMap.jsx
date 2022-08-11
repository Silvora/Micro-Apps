import React, { useEffect, useState } from "react";

import { Segmented, Popover, Modal, Input } from "antd";
import TabBar from "../components/Map/TabBar/TabBar";
import Map from "../utils/Map";
//import MapControl from "../utils/MapControl"
//import initMap from "../utils/initMap";
import { useSelector } from "react-redux"

let MAP
export default function AppMap() {
  const [typeBar, setTypeBar] = useState("地图控件");
  useEffect( () => {
     MAP = new Map()
     MAP.MAPLoad().then(AMap =>{
      let map = MAP.initMap(AMap)
      //console.log(map)
      map.on("click", MapEvent)
      MAP.addControl()
    }).catch(e=>console.log(e))
  }, []);

  const {v, polygonType,tool,editor} = useSelector(state => state.marker)
  //const [type, setType] = useState(0)
  const [path, setPath] = useState([])
  useEffect(()=>{
    //setType(v)
    setPath([])
    window.localStorage.setItem("MarkerType", v)
    window.localStorage.setItem("PolygonType", polygonType)
    window.localStorage.setItem("tool", tool)
    window.localStorage.setItem("editor", editor)
    if(editor>0){
      handleEditorMap()
    }
   // console.log(type)
  },[v,polygonType,tool,editor])
  //点击事件

  //const [Marker,setMarker] = useState(true)
  const [inputMarker, setInputMarker] = useState("");
 
  const MapEvent = (e)=> {
   
    //console.log(e)
    MAP.MapEvent(e)
    // MAP.$e = e
    //showModal()let path = []
    const v = window.localStorage.getItem("MarkerType")
    //console.log(v)
    if(v == 1){
      showModal()
    }

    if(v == 2){
      handlePolyline(e)
    }

    if(v == 3){
      handlePolygon(e)
    }

    if(v == 4){
      //handlePolygon(e)
      handleMouseTool()
    }

    
      //path = []
      
  };
  
  const handleEditorMap = () =>{
    //const editor = window.localStorage.getItem("editor")
    console.log(editor)
    MAP.EditorMap()
  }

 
  const handlePolyline = (e)=>{
    let data = path.push(e.lnglat)
      setPath(data)
      console.log(path)
    
      MAP.addPolyline("aa", path)
  }

  const handlePolygon = (e) =>{
    const polygonType = window.localStorage.getItem("PolygonType")

    console.log(polygonType)

    if(polygonType == "Polygon"){
      let data = path.push(e.lnglat)
      setPath(data)    
      MAP.addPolygon("aa", path)
    }
    if(polygonType == "Circle"){
      MAP.addCircle("aa")
    }
    if(polygonType == "Rectangle"){
      MAP.addRectangle("aa")
    }
    if(polygonType == "Ellipse"){
      MAP.addEllipse("aa")
    }
  }

  const handleMouseTool = () => {

     const tool = window.localStorage.getItem("tool")
     console.log(tool)
    if(tool == 1) {
      MAP.addMarkerTool()
    }
    if(tool == 2){
      MAP.addPolylineTool()
    }
    if(tool == 3){
      MAP.addDistanceTool()
    }
    if(tool == 4){
      MAP.addPolygonTool()
    }
    if(tool == 5){
      MAP.addCircleTool()
    }
    if(tool == 6){
      MAP.addRectangleTool()
    }
  }

  //选择选项
  const options = [
    "地图控件",
    "图层管理",
    "编辑图层",
    "路线规划",
    "天气",
    "搜索",
  ];
  const handleChange = (value) => {
    console.log(value)
    if(value == "路线规划"){
      MAP.DrivingMap()
    }
    setTypeBar(value);
    setVisible(true);
  };
  const [visible, setVisible] = useState(false);
  const handleVisibleChange = (newVisible) => {
    //console.log(newVisible)
    setVisible(true);
  };
  const handleVisible = () => {
    setVisible(false);
  };

  //添加标记
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
    MAP.addMarker(inputMarker)
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const inputMarkerChange = (e) => {
    setInputMarker(e.target.value);
  };

  return (
    <div id="Map" className="Map">
      <div className="tabBar">
        <Popover
          content={
            <TabBar type={typeBar} handleVisible={handleVisible}></TabBar>
          }
          trigger="focus"
          visible={visible}
          onVisibleChange={handleVisibleChange}
        >
          <Segmented block options={options} onChange={handleChange} />
        </Popover>
      </div>

      <div className="Modal">
        <Modal
          title="添加标记"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>标记名称：</p>
          <Input placeholder="Basic usage" onChange={inputMarkerChange} />
        </Modal>
      </div>
    </div>
  );
}
