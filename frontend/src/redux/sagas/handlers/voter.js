import {takeLatest, call, put} from 'redux-saga/effects'
import {getVoter, setVoter, submitVoter} from '../../reducers/voterSlice'
import {getVoterRequest, submitVoterRequest} from '../requests/voter'

function * submitVoterHandler (action) {
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