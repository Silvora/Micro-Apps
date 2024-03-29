import { defineStore } from 'pinia'
//import router from "../router/index"
import { useRouter } from "vue-router"

export const Routes = defineStore("routes", {
    state: () => {
        return {
            routes: [
                {
                    path: "/movie",
                    name: "movie",
                    component: () => import("@/views/Home.vue"),
                    meta: {
                        icon: "Menu",
                        title: "电影",
                    }
                },
                {
                    path: "/music",
                    name: "Music",
                    component: () => import("@/views/Home.vue"),
                    meta: {
                        icon: "Document",
                        title: "音乐",
                    }
                },
                {
                    path: "/other",
                    name: "Other",
                    component: () => import("@/views/Home.vue"),
                    meta: {
                        icon: "Setting",
                        title: "其它",
                    }
                }
            ]

        }
    },
    getters: {


    },
    actions: {
        addRouter() {
            let router = useRouter()
            console.log(router)
            this.routes.forEach((item) => {
                router.addRoute(item)
            })

            // router.addRoute({
            //     path: '*',
            //     redirect: '/404',
            //     //meta: { hidden: true }
            // })

            // console.log(router.getRoutes())
        }
    }
})