import { getToken } from "./utils/Token"

// const loader = (loading) => {
//     console.log(loading)
// }


const state = {
    name: getToken("name"),
    token: getToken("token")
}
const MicroApp = [
    {
        name: 'vueApp',
        //entry: '/app1/',
        entry: '//localhost:3001',
        container: '#root',
        activeRule: '/app1',
        // loader,
        props: {
            state
        }
    },
    {
        name: 'reactApp',
        //entry: '/app2/',
        entry: '//localhost:3002',
        container: '#root',
        activeRule: '/app2',
        //loader,
        props: {
            state
        }
    },
    {
        name: 'viteApp',
        //entry: '/app2/',
        entry: '//localhost:5173',
        container: '#root',
        activeRule: '/app3',
        //loader,
        props: {
            state
        }
    },

]


export default MicroApp
