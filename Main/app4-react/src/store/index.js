import {configureStore } from '@reduxjs/toolkit'
// import UserMsg from "./modules/userMessage"
// import ToUserMsg from './modules/ToUserMsg'
// import UpdataMsg from './modules/updataMsg'
import MyToYouInfo from "./modules/MyToYouInfo"
const store = configureStore({
    reducer:{
        // UserMsg,
        // ToUserMsg,
        // UpdataMsg,
        MyToYouInfo
    }
})

export default store