import { createApp } from "vue";
import App from "./App.vue";
//import "./utils/routes.js"
import router from "./router";

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import { createPinia } from "pinia"

const store = createPinia()
// store.use(ctx())
let app = createApp(App)

app.use(store)
app.use(router)
app.use(ElementPlus, {
    locale: zhCn,
})
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}


app.mount('#app')

//createApp(App).use(store).use(router).mount("#app");
