import { all } from 'redux-saga/effects'
import { submitVoterSaga } from '../sagas/handlers/voter'

export default function * rootSaga () {
    return yield all([
        submitVoterSaga()
    ])
}