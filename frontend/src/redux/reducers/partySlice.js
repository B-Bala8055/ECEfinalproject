import {createSlice} from '@reduxjs/toolkit'

const partySlice = createSlice({
    name:'party',
    initialState:{},
    reducers:{
        submitParty:()=>{}
    }
})

export const { submitParty } = partySlice.actions
export default partySlice.reducer