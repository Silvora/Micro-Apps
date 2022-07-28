import { getToken } from "./utils/Token"

// const loader = (loading) => {
//     console.log(loading)
// }
// import Store from "./store"

// const {User} = Store()
// let state = User.UserInfo

const state = {
    name: getToken("name"),
    token: getToken("token")
}
//console.log(state)
const MicroApp = [
    {
        name: 'vue2App',
        entry: '/app1/',
        //entry: '//localhost:3001',
        container: '#root',
        activeRule: '/app1',
        // loader,
        props: {
            name: getToken("name"),
            token: getToken("token")
        }
    },
    {
        name: 'react18App',
        entry: '/app2/',
        //entry: '//localhost:3002',
        container: '#root',
        activeRule: '/app2',
        //loader,
        props: {
            state
        }
    },
    {
        name: 'Vue3App',
        entry: '/app3/',
        //entry: '//localhost:3003',
        container: '#root',
        activeRule: '/app3',
        //loader,
        props: {
            state
        }
    },

]


export default MicroApp
