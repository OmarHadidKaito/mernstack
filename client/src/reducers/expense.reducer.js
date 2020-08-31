import { expenseConstant } from '../constants'

const INITIAL_STATE = {
    updated: false,
    saved: false,
    fetching: false,
    expense: [],
    statistics: {}
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case expenseConstant.FETCHING_EXPENSE:
            return { ...state, fetching: true }
        case expenseConstant.FETCHED_SUCCESS:
            const { expense, statistics } = action.payload
            return { ...state, fetching: false, expense, statistics }
        case expenseConstant.FETCHED_FAILED:
            return { ...state, fetching: false }
        case expenseConstant.EXPENSE_SAVED:
            return { ...state, saved: true }
        case expenseConstant.EXPENSE_UPDATED:
            return { ...state, updated: true }
        case expenseConstant.RESET_SAVED_FLAG:
            return { ...state, saved: false, updated: false }
        default:
            return state
    }
}