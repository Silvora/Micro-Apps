import {createSlice} from "@reduxjs/toolkit"

const marker = createSlice({
    name: "marker",
    initialState: {
        v: 0,
        polygonType: "Polygon",
        tool: 0,
        editor: 0,
    },
    reducers:{
        typeMarker(state, action){
            //console.log(state, action)
            state.v = action.payload

            console.log(state.v)
        },
        typePolygon(state, action){
            //console.log(state, action)
            state.polygonType = action.payload

            //console.log(state.v)
        },
        typeTool(state, action){
            //console.log(state, action)
            state.tool = action.payload

            //console.log(state.v)
        },
        typeEditor(state, action){
            //console.log(state, action)
            state.editor = action.payload

            //console.log(state.v)
        },
        subAsync(state){
            state.v-=1
        }
    }
})

export const {typeMarker,typePolygon,typeTool,typeEditor,subAsync} = marker.actions

// export const sub = (payload) =>{
//     return async (dispatch, getState)=>{
//         setTimeout(() => {
//             dispatch(subAsync())
//         }, 3000);
//     }
// }



export default marker.reducer