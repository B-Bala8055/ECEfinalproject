import {takeLatest, call, put} from 'redux-saga/effects'
import {submitVoter} from '../../reducers/voterSlice'
import {submitVoterRequest} from '../requests/voter'

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

// ********************* S A G A S *************************

export function * submitVoterSaga () {
    return yield takeLatest(submitVoter.type, submitVoterHandler)
}