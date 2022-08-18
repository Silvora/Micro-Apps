import {createSlice} from "@reduxjs/toolkit"

const UserMsg = createSlice({
    name: "UserMsg",
    initialState:{
        to_uid: null,
        MsgList:{
            // "2":[],
            // "3":[],
        }
    },

    reducers:{

        AddMyMsg(state, action){
            //console.log(typeof action.payload)
            //")
            action.payload.forEach(item => {
                state.MsgList[state.to_uid].push(item)
            });

            // state.MsgList[state.to_uid].concat(...action.payload)
            // console.log({...state.MsgList[state.to_uid]})
        },
        SetToUser(state, action){
            state.to_uid = action.payload
        },
        SetMsgList(state, action){
            state.MsgList[action.payload] = []
            //console.log(action.payload,state.MsgList)
        }
    }
})

export const {AddMyMsg, SetMsgList, SetToUser} = UserMsg.actions



export default UserMsg.reducer