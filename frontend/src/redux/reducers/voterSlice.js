import {createSlice} from '@reduxjs/toolkit'

const voterSlice = createSlice({
    name:'voter',
    initialState:null,
    reducers:{
        // Submit voter to backend
        submitVoter:()=>{},
        // Get voter
        getVoter:()=>{},
        // Store voter details fetched
        setVoter:(state, action)=>{
            const {data} = action.payload
            state = {...data}
            return state
        }
    }
})

export const {submitVoter, getVoter, setVoter} = voterSlice.actions
export default voterSlice.reducer