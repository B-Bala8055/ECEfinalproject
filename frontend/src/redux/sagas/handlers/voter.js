import {takeLatest, call, put} from 'redux-saga/effects'
import { clearStatus, setStatus } from '../../reducers/statusSlice'
import {getVoter, setVoter, submitVoter, grantAccess} from '../../reducers/voterSlice'
import {getVoterRequest, submitVoterRequest, grantAccessRequest} from '../requests/voter'

function * submitVoterHandler (action) {
    /** WORK-FLOW
     * Call submit voter request 
     */
    try{
        const {payload} = action
        const data = yield call(submitVoterRequest, payload)
        return console.log('Worked...', data)
    }
    catch(err){
        console.log('submit voter Handler section', err)
    }
}

function * getVoterHandler (action) {
    /** WORK-FLOW
     * Call get voter request
     */
    try{
        const {payload} = action
        const data = yield call(getVoterRequest, payload)
        return yield put(setVoter({...data}))
    }
    catch(err){
        console.log('getVoterHandler section', err)
    }
}

function * grantAccessHandler (action) {
    try{
        const {payload} = action
        yield put(clearStatus())
        const data = yield call(grantAccessRequest, payload)
        console.log(data)
        return yield put(setStatus({...data}))
    }
    catch(err){
        console.log('Grant access handler error', err)
    }
}

// ********************* S A G A S *************************

export function * submitVoterSaga () {
    return yield takeLatest(submitVoter.type, submitVoterHandler)
}

export function * getVoterSaga () {
    return yield takeLatest(getVoter.type, getVoterHandler)
}

export function * grantAccessSaga () {
    return yield takeLatest(grantAccess.type, grantAccessHandler)
}