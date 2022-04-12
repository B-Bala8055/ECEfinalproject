import { takeLatest, call} from 'redux-saga/effects'
import {submitPartyRequest} from '../requests/party'
import {submitParty} from '../../reducers/partySlice'

function * submitPartyHandler (action) {
    /** WORK-FLOW
     * Call submit party request 
     */
    try{
        const {payload} = action
        const data = yield call(submitPartyRequest, payload)
        console.log("Registered successfully", data)
    }
    catch(err){
        console.log('submitPartyHandler section', err)
    }
}

// ***************************S A G A S****************************

export function * submitPartySaga () {
    return yield takeLatest(submitParty.type, submitPartyHandler)
} 