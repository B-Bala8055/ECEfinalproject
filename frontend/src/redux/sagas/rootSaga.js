import { all } from 'redux-saga/effects'
import { submitVoterSaga, getVoterSaga } from '../sagas/handlers/voter'
import { submitPartySaga } from '../sagas/handlers/party'

export default function * rootSaga () {
    return yield all([
        submitVoterSaga(),
        getVoterSaga(),
        
        submitPartySaga()
    ])
}