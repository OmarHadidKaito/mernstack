import axios from 'axios'

const apiSaveExpense = expense => {
    return axios.post('/api/v1/expense', expense)
}

const apiUpdateExpense = expense => {
    return axios.put(`/api/v1/expense/${expense._id}`, expense)
}

const apiDeleteExpense = expenseId => {
    return axios.delete(`/api/v1/expense/${expenseId}`)
}

const apiFetchExpense = month => {
    const prefix = '/api/v1/expense'
    const url = month ? `${prefix}/${month}` : prefix
    return axios.get(url)
}

export const ExpenseApi = {
    apiSaveExpense,
    apiUpdateExpense,
    apiDeleteExpense,
    apiFetchExpense
}
