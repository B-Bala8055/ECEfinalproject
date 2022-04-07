import {combineReducers, configureStore} from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas/rootSaga'
import voterSlice from './reducers/voterSlice'

const sagaMiddleware = createSagaMiddleware()

const reducer = combineReducers({
    voterSlice
})

const store = configureStore({
    reducer,
    middleware:[sagaMiddleware]
})

sagaMiddleware.run(rootSaga)

export default store