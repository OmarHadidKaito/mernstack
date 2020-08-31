import { errors } from '../constants'

const INITIAL_STATE = {
    message: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case errors.ADD_ERROR:
            return { ...state, message: action.payload }
        case errors.CLEAR_ERRORS:
            return INITIAL_STATE
        default:
            return state
    }
}