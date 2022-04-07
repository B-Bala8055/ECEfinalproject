import {createSlice} from '@reduxjs/toolkit'

const voterSlice = createSlice({
    name:'voter',
    initialState:{},
    reducers:{
        submitVoter:()=>{}
    }
})

export const {submitVoter} = voterSlice.actions
export default voterSlice.reducer