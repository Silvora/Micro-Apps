import {createSlice} from '@reduxjs/toolkit'


const ToUserMsg = createSlice({
    name: "ToUserMsg",
    initialState: {
        MyInfo: "",
        ToUser: "",
        UserLabel: "",
       // UserList:  [],
        dataList: null,
        isPush: false,
        MenuList:[
          {
            label: '在线好友',
            key: 'online',
            children: [],
          },
          {
            label: '离线好友',
            key: 'offline',
            children: [],
          }
        ]
    
    },
    reducers:{
        ToUserInfo(state, action){
          //console.log(action.payload)
          state.ToUser = action.payload
          let list = [...state.MenuList[0].children, ...state.MenuList[1].children]

          let data = list.filter(item=>{
            if({...item}.key == action.payload){
              return {...item}
            }
          })
          //console.log({...data[0]})

          state.UserLabel = {...data[0]}.label
        },

        AddMenuList(state, action){

          let item = action.payload
          if(state.isPush == false){
            if(item.action == "true"){
              state.MenuList[0].children.push(item)
            }else{
              state.MenuList[1].children.push(item)
            }
          }   
        },
       

        SetMenuListClear(state, action){
         // state.UserList = []

          if(state.dataList != action.payload){

            state.MenuList[0].children = []
            state.MenuList[1].children = []
            state.dataList = action.payload
            state.isPush = false
          }else{
            state.isPush = true
          }

        },

        SetMyInfo(state, action){
          state.MyInfo = action.payload
        }
    }
    
})


export const {ToUserInfo, AddMenuList, SetMyInfo, SetMenuList, SetMenuListClear} = ToUserMsg.actions

export default ToUserMsg.reducer