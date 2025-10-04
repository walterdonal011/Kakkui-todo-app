<script setup>
import { deleteTask } from '@/services/task'
import { useModalStore } from '@/stores/modalStore'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'

const router = useRouter()
const modalStore = useModalStore()

const handleDelete = async () => {
    try {
        const taskId = modalStore.id

        const response = await deleteTask(taskId)

        if (response.status === 200) {
            toast(response.data.message, {
                autoClose: 1000,
            })

            modalStore.isDeleteSuccessfull = true
            modalStore.toggleDeleteModalVisibility()
        }
    } catch (error) {
        modalStore.isDeleteSuccessfull = false
        if (error.response?.data?.message) {
            toast(error.response.data.message, {
                autoClose: 1000,
            })
        } else {
            toast('There is a problem adding the task, please try again later', {
                autoClose: 1000,
            })
        }
    }
}
</script>
<template>
    <div
        v-if="modalStore.isDeleteModalShown"
        class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
    >
        <!-- 🌸 Modal Box -->
        <div
            class="bg-black/50 backdrop-blur-xl border border-white/60 rounded-3xl shadow-2xl max-w-sm w-full p-6 text-center ring-1 ring-white/50 animate-bounce"
        >
            <!-- Cute Icon -->
            <div class="text-6xl mb-4">🗑️✨</div>

            <!-- Title -->
            <h2 class="text-2xl font-bold text-white mb-2 drop-shadow-2xl" style="text-shadow: 2px 2px 4px rgba(0,0,0,0.8), 0 0 8px rgba(0,0,0,0.6);">Remove this task? 🌸</h2>

            <!-- Message -->
            <p class="text-white mb-6" style="text-shadow: 1px 1px 2px rgba(0,0,0,0.8);">
                Are you sure you want to remove this magical task? <br />
                It will disappear into the void... ✨
            </p>

            <!-- Buttons -->
            <div class="flex justify-center gap-4">
                <button
                    @click="handleDelete"
                    class="px-5 py-2 rounded-full bg-red-500/90 backdrop-blur-sm text-white font-semibold shadow-lg hover:bg-red-500 transition border border-red-400/60 ring-1 ring-red-400/40"
                    style="text-shadow: 1px 1px 2px rgba(0,0,0,0.8);"
                >
                    Yes, Remove 🗑️
                </button>
                <button
                    @click="modalStore.toggleDeleteModalVisibility"
                    class="px-5 py-2 rounded-full bg-white/30 backdrop-blur-sm text-white font-semibold shadow-lg hover:bg-white/40 transition border border-white/60 ring-1 ring-white/40"
                    style="text-shadow: 1px 1px 2px rgba(0,0,0,0.8);"
                >
                    Keep it 🏰
                </button>
            </div>
        </div>
    </div>
</template>
