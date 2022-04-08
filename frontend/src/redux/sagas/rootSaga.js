import { all } from 'redux-saga/effects'
import { submitVoterSaga } from '../sagas/handlers/voter'
import { submitPartySaga } from '../sagas/handlers/party'

export default function * rootSaga () {
    return yield all([
        submitVoterSaga(),
        submitPartySaga()
    ])
}