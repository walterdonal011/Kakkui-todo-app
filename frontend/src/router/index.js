import { createRouter, createWebHistory } from 'vue-router'

import { useUserStore } from '@/stores/userStore'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/views/authenticated/HomeView.vue'),
            meta: {
                requiresAuth: true,
            },
        },
        {
            path: '/profile',
            name: 'profile',
            component: () => import('@/views/authenticated/ProfileView.vue'),
            meta: {
                requiresAuth: true,
            },
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/guest/LoginView.vue'),
            meta: {
                requiresAuth: false,
            },
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('@/views/guest/RegisterView.vue'),
            meta: {
                requiresAuth: false,
            },
        },
    ],
})

router.beforeEach((to, from, next) => {
    const userStore = useUserStore()

    if (userStore.token && !userStore.userInfo) {
        userStore.fetchUserDetails()
    }

    if (to.meta.requiresAuth && !userStore.isLoggedIn) {
        next({ name: 'login', query: { redirect: to.fullPath } })
    } else {
        next()
    }
})

export default router
