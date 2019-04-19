import { combineReducers } from 'redux'
import { alert } from './alert.reducer'

// export * from './alert.reducer'

const rootReducer = combineReducers({
  alert
})

export default rootReducer
