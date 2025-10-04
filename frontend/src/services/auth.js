import api, { setAuthToken } from '@/config/axiosConfig'

export const registerUser = async (data) => {
    // Send a request to backend
    return await api.post('/register', data)
}

export const loginUser = async (data) => {
    // Send a request to backend
    return await api.post('/login', data)
}

export const logoutUser = async (data) => {
    // Send a request to backend
    return await api.post('/logout', data)
}
