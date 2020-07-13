import LogRocket from 'logrocket'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import playerReducer from './reducers/player'

const reducer = combineReducers({
  player: playerReducer
})

export default createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk, LogRocket.reduxMiddleware()))
)
