import {createSlice} from '@reduxjs/toolkit'


const UpdateMsg = createSlice({
    name: "UpdateMsg",
    initialState: {
       socketBool: false,
       addUserMsg: [
        // {
        //     id:""
        //     name: "",
        //     key:"",
        // }
       ]
    
    },
    reducers:{
       AddUserMsgList(state, action){
        //console.log(action.payload)

        let isList = state.addUserMsg.filter(item=>{
            return item.key === action.payload.key
        })

        if(isList.length === 0){
            state.addUserMsg.push(action.payload)
        }
       },

       delUserList(state, action){
        //console.log(action.payload)

        state.addUserMsg.forEach((item,idx)=>{
            if({...item}.id === action.payload){
                state.addUserMsg.splice(idx,1)
            }
        })
        //console.log([...state.addUserMsg])
       },

       SetSocket(state, action){
        state.socketBool = action.payload
       }
    }
    
})


export const {AddUserMsgList,delUserList,SetSocket} = UpdateMsg.actions

export default UpdateMsg.reducer