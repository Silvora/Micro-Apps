import {createSlice} from '@reduxjs/toolkit'

const MyToYouInfo = createSlice({
    name: "MyToYouInfo",
    initialState: {
       MyUid: "",
       MyName: "",
       ToUid: "",
       ToName:"",
       FriendsList:[{
        label: '好友列表',
        key: 'online',
        children: [
            //{label:"aaaa",key:"15"}
        ],
      }],//好友列表
       ToApplyList: [],//申请好友列表
       MyToYouMsg:{},//聊天记录
    
    },
    reducers:{
        SetMyinfo(state, action){
            //console.log(action.payload)
            state.MyName = action.payload.name
            state.MyUid = action.payload.id
        },
        SetToYou(state, action){
            state.ToUid = action.payload
            state.FriendsList[0].children.forEach(item=>{
                if(item.key === action.payload){
                    state.ToName = {...item}.label
                }
            })
        },
        SetFriendsList(state, action){
            //console.log(action.payload)
            state.FriendsList[0].children = action.payload
        },
        SetToApplyList(state, action){
            //console.log(action.payload)
            state.ToApplyList = action.payload
        },
        SetMyToYouMsgID(state, action){
            //console.log(action.payload)
            state.MyToYouMsg = action.payload
            //console.log({...state.MyToYouMsg},action.payload)

        },
        AddMsgList(state, action){
            state.MyToYouMsg[state.ToUid].push(action.payload)
            console.log({...state.MyToYouMsg[state.ToUid]}, action.payload)

        }
    }
})


export const {SetMyinfo,SetToYou,SetFriendsList,SetToApplyList,SetMyToYouMsgID,AddMsgList} = MyToYouInfo.actions

export default MyToYouInfo.reducer