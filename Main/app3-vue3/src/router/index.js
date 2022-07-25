import { createRouter, createWebHistory } from "vue-router"


const routes = [
  {
    path: "/",
    name: "Home",
    //  redirect:"/b",
    //alias:["/a","/b"]
    component: () => import("@/views/Home.vue"),
    meta: {
      title: "首页",
      // active: "shake"
    }
  },
  {
    path: "/upDownload",
    name: "UpDownload",
    component: () => import("@/views/upDownload.vue"),
    meta: {
      title: "上传",
    }
  },
  {
    path: "/messes",
    name: "Messes",
    component: () => import("@/components/videos.vue"),
    meta: {
      title: "信息",
    }
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("@/components/videos.vue"),
    meta: {
      title: "个人中心",
    }
  },
  {
    path: "/404",
    name: "Error",
    component: () => import("@/views/Error.vue"),
    meta: {
      title: "404",
    }
  }
]





const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        top: 0
      }
    }
  },
  routes
})

router.beforeEach((to, from, next) => {
  console.log(to, from)
  document.title = to.meta.title
  next()
})

router.afterEach((to, from) => {
  console.log(to, from)
})


export default router;