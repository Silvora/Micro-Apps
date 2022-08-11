import React from 'react'
import { Tabs } from 'antd';
const { TabPane } = Tabs;
export default function Control() {
  return (
    <div>
      <Tabs
        defaultActiveKey="1"
        tabPosition="left"
        size="small"
        style={{
            height: 280,
          }}
      >
       
          <TabPane tab="工具控件" key="1">
            Content of tab 
          </TabPane>
          <TabPane tab="比例控件" key="2">
            Content of tab 
          </TabPane>
          <TabPane tab="鹰眼控件" key="3">
            Content of tab 
          </TabPane>
          <TabPane tab="图面控件" key="4">
            Content of tab 
          </TabPane>
          <TabPane tab="定位控件" key="5">
            Content of tab 
          </TabPane>
          <TabPane tab="指针控件" key="6">
            Content of tab 
          </TabPane>
      
      </Tabs>
    </div>
  )
}
