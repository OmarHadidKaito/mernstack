import { combineReducers } from 'redux'

import auth from './auth.reducer'
import expense from './expense.reducer'
import errors from './error.reducer'
export default combineReducers({
    auth,
    expense,
    errors
})