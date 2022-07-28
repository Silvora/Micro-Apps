import { makeAutoObservable, observable } from "mobx"
import { Login, addUser, getActive } from "../../api/login"
import { Modal } from "antd"
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { clearToken, setToken } from "../../utils/Token";
const { confirm } = Modal;

class User {
    constructor() {

        makeAutoObservable(this, {
            Loading: observable,
            UserInfo: observable,
            LoginFrom: observable,
            MicroLogin: observable
        }, { autoBind: true })
    }

    //用户信息
    UserInfo = {
        name: "",
        token: "",
    }
    //注册登录时状态
    Loading = false

    //弹窗状态
    LoginFrom = false

    //是否可以进入子应用
    MicroLogin = false

    //登录
    handleLogin(data) {
        const self = this
        Login(data).then(res => {
            if (res.code === 406) {
                confirm({
                    title: res.msg,
                    icon: <ExclamationCircleOutlined />,
                    content: '是否以此账号登录？',

                    onOk() {
                        //console.log('OK');
                        self.Loading = true
                        self.handleAddUser(data)
                    },

                    onCancel() {
                        return
                    },
                });
            }
            if (res.code === 200) {
                let data = {
                    name: res.name,
                    token: res.token
                }
                this.setUserToken(data)
                this.setUserInfo(data)
                this.showLoginFrom()
                this.MicroLogin = true
            }

        })
    }

    //添加用户
    handleAddUser(data) {
        // console.log(data)
        const self = this
        addUser(data).then(res => {
            if (res.code === 200) {
                let data = {
                    name: res.name,
                    token: res.token
                }
                self.setUserToken(data)
                self.setUserInfo(data)
                self.Loading = false
                self.showLoginFrom()
                self.MicroLogin = true
                
            }

        })
    }

    //赋值
    setUserInfo(data) {
        this.UserInfo.name = data.name
        this.UserInfo.token = data.token
    }

    //token赋值
    setUserToken(data) {
        setToken("name", data.name)
        setToken("token", data.token)
    }
    //清楚用户信息
    clearUser() {
        this.UserInfo.name = ""
        this.UserInfo.token = ""
        clearToken()
    }


    //弹窗状态
    showLoginFrom() {
        this.LoginFrom = !this.LoginFrom
    }

    //状态维持
    getActive(user) {
        const self = this
        const data = {
            user
        }
        getActive(data).then(res => {
            //console.log(res)
            if (res.code === 401) {
                // message.success(res.msg);
                self.MicroLogin = false
                self.clearUser()
                //self.showLoginFrom()
            }
            if (res.code === 200) {
                self.UserInfo.name = res.name
                self.MicroLogin = true
            }
        })
    }
}


export default new User()

