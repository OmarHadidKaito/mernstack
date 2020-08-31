import { userConstants } from '../constants'
import { UserApi, authHeader } from '../services'

const TOKEN_NAME = 'APP_TOKEN'



function login(request_data) {
    return dispatch => {
        return UserApi
            .Login(request_data)
            .then(Response => {
                const token = Response.data.token
                authHeader(token)
                dispatch(getProfile())
                dispatch(success(token))
            })
            .catch(err => {
                const { response: { data } } = err
                dispatch(failure(data.error))
            })
    }


}

const signIn = request_data => {
    return async dispatch => {
        try {
            await UserApi.SignUp(request_data)
        } catch (e) {
            const { response: { data } } = e
            dispatch(failure(data.error))
        }
    }
}

const onLodingSignIn = () => {
    return dispatch => {
        try {
            const token = localStorage.getItem(TOKEN_NAME)
            if (token === null || token === 'undefined') {
                return dispatch(failure(''))
            }
            authHeader(token)
            dispatch(getProfile())
            dispatch(success(token))
        } catch (e) {
            console.error(e)
        }
    };
};
// eslint-disable-next-line
const getProfile = () => {
    return async dispatch => {
        try {
            const { data: { user } } = await UserApi.getProfile()
            dispatch({ type: userConstants.PROFILE_FEATCHED, payload: user })
        } catch (err) {
            console.error(err)
        }
    }
}

const logout = () => {
    localStorage.clear()
    return { type: userConstants.LOGOUT }
}

function success(token) {
    localStorage.setItem(TOKEN_NAME, token)
    return { type: userConstants.LOGIN_SUCCESS }
}
function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, payload: error }
}

export const userAction = {
    login,
    logout,
    onLodingSignIn,
    signIn
}