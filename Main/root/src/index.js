import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom"
import App from './App';
import "./assets/css/quick-website.css"
import 'antd/dist/antd.min.css';
import { ConfigProvider } from "antd"
import zhCN from 'antd/es/locale/zh_CN';
import { registerMicroApps, start } from 'qiankun';
//import { initGlobalState, MicroAppStateActions } from 'qiankun';


import MicroApp from './MicroApp';
//import { getToken } from './utils/Token';
//import { getToken } from './utils/Token';



// const state = {
//   name: getToken("name"),
//   token: getToken("token")
// }
// 初始化 state
// const actions: MicroAppStateActions = initGlobalState(state);
// // 主项目项目监听和修改
// actions.onGlobalStateChange((state, prev) => {
//   // state: 变更后的状态; prev 变更前的状态
//   console.log(state, prev);
// });
// actions.setGlobalState({ ...state, age: 18 });
// actions.offGlobalStateChange();


registerMicroApps(MicroApp)

start()
// start({
//   sandbox: {
//     strictStyleIsolation: true
//   }
// })
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ConfigProvider locale={zhCN}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ConfigProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
