import api, { setAuthToken } from '@/config/axiosConfig'

export const me = async (data) => {
    // Send a request to backend
    return await api.get('/me')
}
