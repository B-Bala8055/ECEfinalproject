import {createSlice} from '@reduxjs/toolkit'

const voterSlice = createSlice({
    name:'voter',
    initialState:null,
    reducers:{
        submitVoter:()=>{},
        
        getVoter:()=>{},

        setVoter:(state, action)=>{
            const {data} = action.payload
            state = {...data}
            return state
        }
    }
})

export const {submitVoter, getVoter, setVoter} = voterSlice.actions
export default voterSlice.reducer