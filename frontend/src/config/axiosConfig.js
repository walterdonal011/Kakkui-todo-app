import axios from 'axios'
import { useUserStore } from '@/stores/userStore'

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    headers: {
        Accept: 'application/json',
    },
})

api.interceptors.request.use(
    function (config) {
        const userStore = useUserStore()

        // Do something before request is sent
        const token = userStore.userToken

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error)
    },
)

api.interceptors.response.use(
    (response) => {
        // Return the successful response
        return response
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            console.log('Unauthorized request. Redirecting to login...')
        }
        return Promise.reject(error)
    },
)
export default api

export const setAuthToken = (token) => {
    if (token) {
        localStorage.setItem('token', token)
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
        delete api.defaults.headers.common['Authorization']
    }
}
