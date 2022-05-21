import {createSlice} from '@reduxjs/toolkit'

const statusSlice = createSlice({
    name:'status',
    initialState:null,
    reducers:{
        clearStatus:(state)=>{
            state=null
            return state
        },
        setStatus:(state, action)=>{
            const {data} = action.payload
            state=data
            return state
        }
    }
})

export const {clearStatus, setStatus} = statusSlice.actions
export default statusSlice.reducer