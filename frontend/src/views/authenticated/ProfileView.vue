<script setup>
import { onMounted, ref } from 'vue'
import { fetchTasks, createTask, updateTask, deleteTask } from '@/services/task'
import { toast } from 'vue3-toastify'
import dayjs from 'dayjs'

import NavHeader from '@/layouts/NavHeader.vue'

import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

// Format date to a human readable format
const formatDateToHumanReadable = (dateString) => {
    return dayjs(dateString).format('MMMM D, YYYY h:mm A')
}
</script>

<template>
    <iframe class="bg-frame" src="/ghibli/Ghibli Style moving castle/index.html" aria-hidden="true"></iframe>
    <div class="min-h-screen font-sans relative z-10">
        <!-- 🌸 Navbar -->
        <NavHeader />

        <!-- 🌸 Main Content -->
        <div class="p-6 flex flex-col items-center">
            <h1 class="text-3xl font-bold text-white mb-2 drop-shadow-2xl" style="text-shadow: 2px 2px 4px rgba(0,0,0,0.8), 0 0 8px rgba(0,0,0,0.6);">
                Welcome back, {{ userStore.userInfo?.name }}! 🏰
            </h1>
            <p class="text-white mb-6 drop-shadow-2xl" style="text-shadow: 1px 1px 3px rgba(0,0,0,0.8), 0 0 6px rgba(0,0,0,0.6);">Your magical profile ✨</p>

            <div
                class="bg-black/30 backdrop-blur-xl shadow-2xl rounded-3xl w-full max-w-md p-6 border border-white/40 ring-1 ring-white/30"
            >
                <!-- About User -->
                <!-- Name -->
                <div class="mb-4">
                    <h2 class="text-xl font-semibold text-white mb-2" style="text-shadow: 1px 1px 2px rgba(0,0,0,0.8);">✨ Name</h2>
                    <p class="text-white" style="text-shadow: 1px 1px 2px rgba(0,0,0,0.8);">{{ userStore.userInfo?.name }}</p>
                </div>

                <!-- Email -->
                <div class="mb-4">
                    <h2 class="text-xl font-semibold text-white mb-2" style="text-shadow: 1px 1px 2px rgba(0,0,0,0.8);">📧 Email</h2>
                    <p class="text-white" style="text-shadow: 1px 1px 2px rgba(0,0,0,0.8);">{{ userStore.userInfo?.email }}</p>
                </div>

                <!-- Date Created -->
                <div class="mb-4">
                    <h2 class="text-xl font-semibold text-white mb-2" style="text-shadow: 1px 1px 2px rgba(0,0,0,0.8);">🌟 Date Created</h2>
                    <p class="text-white" style="text-shadow: 1px 1px 2px rgba(0,0,0,0.8);">
                        {{ formatDateToHumanReadable(userStore.userInfo?.created_at) }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.bg-frame {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    border: 0;
    z-index: 0;
    pointer-events: none;
}
</style>
