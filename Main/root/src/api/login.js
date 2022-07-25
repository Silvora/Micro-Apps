import http from "./http"


//登录
export function Login(data) {
    return http.request({
        url: "/login",
        method: "POST",
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data
    })
}

//注册
export function addUser(data) {
    return http.request({
        url: "/addUser",
        method: "POST",
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data
    })
}

//状态维持
export function getActive(data) {
    return http.request({
        url: "/active",
        method: "POST",
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data
    })
}
