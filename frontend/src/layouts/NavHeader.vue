<script setup>
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
</script>

<template>
    <nav
        class="bg-black/40 backdrop-blur-xl border-b-2 border-white/50 shadow-2xl px-6 py-4 flex justify-between items-center rounded-b-3xl ring-1 ring-white/40"
    >
        <!-- Left: Logo -->
        <router-link to="/" class="text-2xl font-extrabold text-white drop-shadow-2xl" style="text-shadow: 2px 2px 4px rgba(0,0,0,0.8), 0 0 8px rgba(0,0,0,0.6);"
            >🏰 GhibliTodo</router-link
        >

        <!-- Right: User + Logout -->
        <div class="flex items-center gap-4">
            <span class="text-white font-medium" style="text-shadow: 1px 1px 2px rgba(0,0,0,0.8);">
                Welcome,
                <router-link to="/profile" class="text-white font-bold hover:text-yellow-200 transition" style="text-shadow: 1px 1px 2px rgba(0,0,0,0.8);"
                    >{{ userStore.userInfo?.name }} ✨</router-link
                >
            </span>
            <button
                @click="userStore.toggleLogoutModal"
                class="px-4 py-2 bg-white/30 backdrop-blur-sm text-white rounded-full shadow-lg hover:bg-white/40 transition font-semibold text-sm border border-white/50 ring-1 ring-white/30"
                style="text-shadow: 1px 1px 2px rgba(0,0,0,0.8);"
            >
                🌸 Leave Castle
            </button>
        </div>
    </nav>
</template>
