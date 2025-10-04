<script setup>
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'

const router = useRouter()
const userStore = useUserStore()

const handleLogout = async () => {
    try {
        const response = await userStore.handleLogout()

        if (response.status === 200) {
            toast('Successfully logged out!', {
                autoClose: 1000,
            })

            router.push('/login')
        }
    } catch (error) {
        toast('Failed to logout!', {
            autoClose: 1000,
        })
    }
}
</script>

<template>
    <div
        v-if="userStore.isLogoutModalShown"
        class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
    >
        <!-- 🌸 Modal Box -->
        <div
            class="bg-black/50 backdrop-blur-xl border border-white/60 rounded-3xl shadow-2xl max-w-sm w-full p-6 text-center ring-1 ring-white/50"
        >
            <!-- Cute Icon -->
            <div class="text-6xl mb-4">🏰✨</div>

            <!-- Title -->
            <h2 class="text-2xl font-bold text-white mb-2 drop-shadow-2xl" style="text-shadow: 2px 2px 4px rgba(0,0,0,0.8), 0 0 8px rgba(0,0,0,0.6);">Leaving the Castle? 🌸</h2>

            <!-- Message -->
            <p class="text-white mb-6" style="text-shadow: 1px 1px 2px rgba(0,0,0,0.8);">
                Are you sure you want to leave? <br />
                The magic will be waiting for you... ✨
            </p>

            <!-- Buttons -->
            <div class="flex justify-center gap-4">
                <button
                    @click="handleLogout"
                    class="px-5 py-2 rounded-full bg-white/40 backdrop-blur-sm text-white font-semibold shadow-lg hover:bg-white/50 transition border border-white/60 ring-1 ring-white/40"
                    style="text-shadow: 1px 1px 2px rgba(0,0,0,0.8);"
                >
                    Yes, Leave 🚪
                </button>
                <button
                    @click="userStore.toggleLogoutModal"
                    class="px-5 py-2 rounded-full bg-white/30 backdrop-blur-sm text-white font-semibold shadow-lg hover:bg-white/40 transition border border-white/60 ring-1 ring-white/40"
                    style="text-shadow: 1px 1px 2px rgba(0,0,0,0.8);"
                >
                    Stay in Castle 🏰
                </button>
            </div>
        </div>
    </div>
</template>
