import React from 'react'
import { Radio } from 'antd';
import {useDispatch, useSelector} from "react-redux"
import {typeMarker, typePolygon, typeTool} from "../../../store/modules/marker"

export default function Marker() {
    //const [value, setValue] = useState(0);
    const dispatch = useDispatch()
    const {v, polygonType, tool} = useSelector(state => state.marker)

    const onTypeChange = (e) => {
      //console.log('radio checked', e.target.value);
      //setValue(e.target.value);
      dispatch(typeMarker(e.target.value))
     
    };
    const onPolygonChange = (e) => {
        //console.log('radio checked', e.target.value);
        dispatch(typePolygon(e.target.value))
    }

    const onToolChange = (e) => {
        //console.log('radio checked', e.target.value);
        dispatch(typeTool(e.target.value))
    }
  
  return (
   <>
   <p>图形形状：{v}</p>
    <Radio.Group onChange={onTypeChange} value={v}>
    <Radio value={0}>无</Radio>
    <Radio value={1}>标记点</Radio>
    <Radio value={2}>折线图</Radio>
    <Radio value={3}>多图形</Radio>
    <Radio value={4}>矢量图</Radio>
  </Radio.Group>
 {
    v == 3 ? <> <p>多边形形状：{polygonType}</p>
    <Radio.Group onChange={onPolygonChange} value={polygonType}>
    <Radio value={"Polygon"}>多边形</Radio>
    <Radio value={"Circle"}>圆形</Radio>
    <Radio value={"Rectangle"}>矩形</Radio>
    <Radio value={"Ellipse"}>椭圆形</Radio>
  </Radio.Group></>:""
 }

{
    v == 4 ? <> <p>矢量图：{tool}</p>
    <Radio.Group onChange={onToolChange} value={tool}>
    <Radio value={0}>无</Radio>
    <Radio value={1}>标记点</Radio>
    <Radio value={2}>折线图</Radio>
    <Radio value={3}>测量</Radio>
    <Radio value={4}>多边形</Radio>
    <Radio value={5}>圆形</Radio>
    <Radio value={6}>矩形</Radio>
  </Radio.Group></>:""
 }
  </>
  )
}
