import {takeLatest, call, put} from 'redux-saga/effects'
import {getVoter, setVoter, submitVoter} from '../../reducers/voterSlice'
import {getVoterRequest, submitVoterRequest} from '../requests/voter'
import {clearStatus, setStatus} from '../../reducers/statusSlice'

function * submitVoterHandler (action) {
    /** WORK-FLOW
     * Call submit voter request 
     */
    try{
        const {payload} = action
        yield put(clearStatus())
        const data = yield call(submitVoterRequest, payload)
        yield put(setStatus({...data}))
        console.log('Worked...', data)
        return payload.navigate('/status')
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

// ********************* S A G A S *************************

export function * submitVoterSaga () {
    return yield takeLatest(submitVoter.type, submitVoterHandler)
}

export function * getVoterSaga () {
    return yield takeLatest(getVoter.type, getVoterHandler)
}