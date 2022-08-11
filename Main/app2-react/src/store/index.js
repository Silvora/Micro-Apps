import {configureStore} from "@reduxjs/toolkit"
import marker from "./modules/marker"
const store = configureStore({
    reducer:{
        marker
    }
})


export default store