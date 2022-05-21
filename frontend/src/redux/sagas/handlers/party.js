import { takeLatest, call, put} from 'redux-saga/effects'
import {submitPartyRequest} from '../requests/party'
import {submitParty} from '../../reducers/partySlice'
import {clearStatus, setStatus} from '../../reducers/statusSlice'

function * submitPartyHandler (action) {
    /** WORK-FLOW
     * Call submit party request 
     */
    try{
        const {partyData} = action.payload
        yield put(clearStatus())
        const data = yield call(submitPartyRequest, partyData)
        yield put(setStatus({...data}))
        console.log("Registered successfully", data)
        return action.payload.navigate('/status')
    }
    catch(err){
        console.log('submitPartyHandler section', err)
    }
}

// ***************************S A G A S****************************

export function * submitPartySaga () {
    return yield takeLatest(submitParty.type, submitPartyHandler)
} 