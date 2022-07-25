import axios from "axios"
import { message } from "antd"
import { getToken } from "../utils/Token";

const http = axios.create({
    baseURL: "http://localhost:12345/root",
    //baseURL: "http://api.757909.xyz/root",
    timeout: 5000,
    validateStatus: function (status) {
        // eslint-disable-next-line default-case
        switch (status) {
            case 400:
                message.error('连接失效！！！');
                break;
            case 500:
                message.error('服务器出错！！！');
                break;
        }

        return status >= 200 && status < 300; // default
    },
})

http.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    let token = getToken("token")
    //console.log(token)
    // console.log("111", config)


    if (token) {
        //console.log("aaa")
        config.headers['Token'] = token
    }

    //console.log("222", config)
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

http.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    //console.log(response.data)
    if (response.data.code === 401 || response.data.code === 403) {
        //console.log(response.data)
        message.warning(response.data.msg);
    }
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});



export default http