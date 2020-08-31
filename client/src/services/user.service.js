import axios from 'axios'

const Login = async (data) => {
    return await axios.post(`/api/v1/auth`, data)
}

const getProfile = () => {
    return axios.get(`/api/v1/me`)
}

const SignUp = request_data => {
    return axios.post('/api/v1/register', request_data);
}

export const UserApi = {
    Login,
    getProfile,
    SignUp
}