import {createSlice} from '@reduxjs/toolkit'

const voterSlice = createSlice({
    name:'voter',
    initialState:null,
    reducers:{
        // Submit voter to backend
        submitVoter:()=>{},
        // Get voter
        getVoter:()=>{},
        grantAccess:()=>{},
        // Store voter details fetched
        setVoter:(state, action)=>{
            const {data} = action.payload
            console.log(data)
            state = {...data}
            return state
        }
    }
})

export const {submitVoter, getVoter, setVoter, grantAccess} = voterSlice.actions
export default voterSlice.reducer