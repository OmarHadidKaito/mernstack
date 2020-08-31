import { errors } from '../constants'

export const addErrorMessage = e => {
    const { response: { data: { error } } } = e
    return { type: errors.ADD_ERROR, payload: error }
}

export const clearErrorMessages = error => {
    return { type: errors.CLEAR_ERRORS }
}