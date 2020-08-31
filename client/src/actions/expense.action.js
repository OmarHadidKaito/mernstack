import { expenseConstant } from '../constants'
import { ExpenseApi } from '../services'
import { addErrorMessage, clearErrorMessages } from './error.action'

const saveExpense = expense => {
    return async dispatch => {
        try {
            dispatch(clearErrorMessages())
            await ExpenseApi.apiSaveExpense(expense)
            dispatch({ type: expenseConstant.EXPENSE_SAVED })
        } catch (err) {
            dispatch(addErrorMessage(err))
        }
    }
}

const fetchExpense = month => {
    return async dispatch => {
        try {
            dispatch({ type: expenseConstant.FETCHING_EXPENSE })
            const { data } = await ExpenseApi.apiFetchExpense(month)
            dispatch({ type: expenseConstant.FETCHED_SUCCESS, payload: data })
        } catch (e) {
            dispatch({ type: expenseConstant.FETCHED_FAILED })
            dispatch(addErrorMessage(e))
        }
    }
}

const updateExpense = expense => {
    return async dispatch => {
        try {
            dispatch(clearErrorMessages())
            await ExpenseApi.apiUpdateExpense(expense);
            dispatch({ type: expenseConstant.EXPENSE_UPDATED });
        } catch (e) {
            dispatch(addErrorMessage(e))
        }
    };
};

const deleteExpense = expenseId => {
    return async dispatch => {
        try {
            dispatch(clearErrorMessages())
            await ExpenseApi.apiDeleteExpense(expenseId)
            dispatch(fetchExpense())
        } catch (e) {
            dispatch(addErrorMessage(e))
        }
    }
}

const resetSaved = () => ({ type: expenseConstant.RESET_SAVED_FLAG })

export const expensAction = {
    saveExpense,
    resetSaved,
    fetchExpense,
    deleteExpense,
    updateExpense
}