import { createApp } from "vue";
import App from "./App.vue";
//import "./utils/routes.js"

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import { createPinia } from "pinia"
import router from "./router";

const store = createPinia()
// store.use(ctx())




//app.mount('#app')

let app = null;
function render(props = {}) {
  const { container } = props;
  app = createApp(App)
    app.use(router)
    app.use(store)

    app.use(ElementPlus, {
        locale: zhCn,
    })
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
        app.component(key, component)
    }
  app.mount(container ? container.querySelector('#app') : '#app');
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() {
  console.log('[vue] vue app bootstraped');
}
export async function mount(props) {
  // props.onGlobalStateChange((state, prev) => {
  //   // state: 变更后的状态; prev 变更前的状态
  //   console.log(state, prev);
  //   props.setGlobalState({ ...state, age: 1000 });
  // });

  console.log(props.state)
  //console.log('[vue] props from main framework', props.onGlobalStateChange());
  render(props);
}
export async function unmount() {
  app.$destroy();
  app.$el.innerHTML = '';
  app = null;
  // router = null;
}

// new Vue({
//   router,
//   store,
//   render: (h) => h(App),
// }).$mount("#app");


//createApp(App).use(store).use(router).mount("#app");
