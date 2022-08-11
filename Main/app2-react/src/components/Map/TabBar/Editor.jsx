import React from 'react'
import { Radio } from 'antd';
import {useDispatch, useSelector} from "react-redux"
import {typeEditor} from "../../../store/modules/marker"

export default function Editor() {

    const dispatch = useDispatch()
    const {editor} = useSelector(state => state.marker)
    const onChange = (e) => {
        //console.log('radio checked', e.target.value);
        //setValue(e.target.value);
        dispatch(typeEditor(e.target.value))
       
      };

  return (
    <>
        <Radio.Group onChange={onChange} value={editor}>
        <Radio value={0}>无</Radio>
        <Radio value={1}>编辑折线</Radio>
        <Radio value={2}>编辑图形</Radio>
        <Radio value={3}>编辑圆形</Radio>
        <Radio value={4}>编辑椭圆</Radio>
        <Radio value={5}>编辑矩形</Radio>
    </Radio.Group>
    </>
  )
}
