import {createSlice} from '@reduxjs/toolkit'

const partySlice = createSlice({
    name:'party',
    initialState:{},
    reducers:{
        // Submit party to backend
        submitParty:()=>{}
    }
})

export const { submitParty } = partySlice.actions
export default partySlice.reducer