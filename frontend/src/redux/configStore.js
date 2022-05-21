import {combineReducers, configureStore} from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas/rootSaga'
import voterSlice from './reducers/voterSlice'
import partySlice from './reducers/partySlice'
import statusSlice from './reducers/statusSlice'

const sagaMiddleware = createSagaMiddleware()

const reducer = combineReducers({
    voterSlice,
    partySlice,
    statusSlice
})

const store = configureStore({
    reducer,
    middleware:[sagaMiddleware]
})

sagaMiddleware.run(rootSaga)

export default store