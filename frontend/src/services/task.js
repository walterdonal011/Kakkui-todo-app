import api, { setAuthToken } from '@/config/axiosConfig'

export const fetchTasks = async () => {
    return await api.get('/task')
}

export const createTask = async (payload) => {
    return await api.post('/task', payload)
}

export const updateTask = async (payload) => {
    return await api.put(`task/${payload.task_id}`, payload)
}

export const deleteTask = async (taskId) => {
    return await api.delete(`task/${taskId}`)
}
