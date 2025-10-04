import { defineStore } from 'pinia'

import { loginUser, logoutUser } from '@/services/auth'
import { setAuthToken } from '@/config/axiosConfig'
import { me } from '@/services/user'

export const useUserStore = defineStore('userStore', {
    // State: Equivalent to data in a component
    state: () => ({
        user: null,
        token: localStorage.getItem('token') || null,
        isLoggingOut: false,
        isLoggingOutModalVisible: false,
    }),

    // Getters: Equivalent to computed properties
    getters: {
        userInfo: (state) => state.user,
        userToken: (state) => state.token,
        isLoggedIn: (state) => !!state.token,
        isLogoutModalShown: (state) => state.isLoggingOutModalVisible,
    },

    // Actions: Equivalent to methods
    actions: {
        async login({ email, password }) {
            try {
                const response = await loginUser({
                    email: email,
                    password: password,
                })

                if (response.data?.data) {
                    this.user = response.data?.data
                    this.token = response.data?.token
                    setAuthToken(response.data?.token)
                }

                return response
            } catch (error) {
                throw error
            }
        },

        async fetchUserDetails() {
            try {
                const response = await me()

                if (response.status === 200) {
                    this.user = response.data
                }
            } catch (error) {
                console.error(error)
            }
        },

        async handleLogout() {
            try {
                const response = await logoutUser()

                if (response.status === 200) {
                    this.clearState()
                }

                return response
            } catch (error) {
                throw error
            }
        },

        toggleLogoutModal() {
            this.isLoggingOutModalVisible = !this.isLoggingOutModalVisible
        },

        clearState() {
            this.user = null
            this.token = null
            this.isLoggingOutModalVisible = false
            localStorage.removeItem('token')
            setAuthToken(null)
        },
    },
})
