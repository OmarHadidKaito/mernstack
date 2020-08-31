import { userConstants } from "../constants"
const INITAL_STATE = {
    attempting: false,
    isAuth: false,
    profile: {},
    error: null
}

export default (state = INITAL_STATE, action) => {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return { ...state, attempting: true, isAuth: false, error: null }
        case userConstants.LOGIN_SUCCESS:
            return { ...state, attempting: false, isAuth: true, error: null }
        case userConstants.LOGIN_FAILURE:
            return { ...state, attempting: false, isAuth: false, error: action.payload }
        case userConstants.LOGOUT:
            return { ...state, isAuth: false, profile: {} }
        case userConstants.PROFILE_FEATCHED:
            return { ...state, isAuth: true, profile: action.payload }
        case userConstants.REGISTER_SUCCESS:
            return { ...state, isAuth: true, error: null }
        case userConstants.REGISTER_FAILURE:
            return { ...state, attempting: true, isAuth: false, error: action.payload }
        default:
            return state
    }
} 