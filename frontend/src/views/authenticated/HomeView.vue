<script setup>
import { onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { fetchTasks, createTask, updateTask, deleteTask } from '@/services/task'
import { toast } from 'vue3-toastify'
import { useModalStore } from '@/stores/modalStore'

import NavHeader from '@/layouts/NavHeader.vue'
import DeleteModal from '@/components/modals/DeleteModal.vue'

const modalStore = useModalStore()

const { isDeleteSuccessfull } = storeToRefs(modalStore)

const tasks = ref()
const task = ref()
const isLoading = ref(false)

const handleFetchTasks = async () => {
    try {
        isLoading.value = true
        const response = await fetchTasks()

        tasks.value = response.data
    } catch (error) {
        toast('There is a problem fetching tasks, please try again later', {
            autoClose: 1000,
        })
    } finally {
        isLoading.value = false
    }
}

const handleAddTask = async () => {
    if (!task.value) {
        toast('Task field is required', {
            autoClose: 1000,
        })
        return
    }

    isLoading.value = true

    try {
        const response = await createTask({
            task: task.value,
        })

        const statusCode = response.status
        if (statusCode === 201) {
            toast('Task added successfully', {
                autoClose: 1000,
            })

            // Refresh the task list
            handleFetchTasks()
        }
    } catch (error) {
        if (error.response?.data?.task) {
            toast(error.response.data.task, {
                autoClose: 1000,
            })
        } else {
            toast('There is a problem adding the task, please try again later', {
                autoClose: 1000,
            })
        }
    } finally {
        task.value = ''
        isLoading.value = false
    }
}

const handleTaskUpdate = async (taskId, isDone) => {
    try {
        const response = await updateTask({
            task_id: taskId,
            is_done: isDone,
        })

        if (response.status === 200) {
            toast(response.data.message, {
                autoClose: 1000,
            })
        }
    } catch (error) {
        toast('There is a problem updating the task, please try again later', {
            autoClose: 1000,
        })
    } finally {
        // Refresh the task list
        handleFetchTasks()
    }
}

watch(isDeleteSuccessfull, async (newVal, OldVal) => {
    if (newVal) {
        await handleFetchTasks()
        modalStore.isDeleteSuccessfull = false
    }
})

onMounted(() => {
    handleFetchTasks()
})
</script>

<template>
    <iframe class="bg-frame" src="/ghibli/Ghibli Style moving castle/index.html" aria-hidden="true"></iframe>
    <div class="min-h-screen font-sans relative z-10">
        
        <NavHeader />

        <div class="p-6 flex flex-col items-center">
            <h1 class="text-3xl font-bold text-white mb-2 drop-shadow-2xl" style="text-shadow: 2px 2px 4px rgba(0,0,0,0.8), 0 0 8px rgba(0,0,0,0.6);">Welcome to Howl's Moving Castle! 🏰</h1>
            <p class="text-white mb-6 drop-shadow-2xl" style="text-shadow: 1px 1px 3px rgba(0,0,0,0.8), 0 0 6px rgba(0,0,0,0.6);">Your magical task list awaits! ✨</p>

            <div
                class="bg-black/30 backdrop-blur-xl shadow-2xl rounded-3xl w-full max-w-md p-6 border border-white/40 ring-1 ring-white/30"
            >
                <!-- Input -->
                <div class="flex gap-2 mb-6">
                    <input
                        v-model="task"
                        type="text"
                        placeholder=" ✨ Add a magical task..."
                        class="flex-1 px-4 py-3 bg-black/40 backdrop-blur-xl border border-white/60 rounded-full focus:ring-2 focus:ring-white/80 outline-none placeholder-white text-white shadow-lg ring-1 ring-white/50"
                        style="text-shadow: 1px 1px 2px rgba(0,0,0,0.8);"
                    />

                    <template v-if="!isLoading">
                        <button
                            @click="handleAddTask"
                            class="px-5 py-3 bg-white/30 backdrop-blur-sm text-white rounded-full shadow-lg hover:bg-white/40 transition font-bold text-lg border border-white/40 ring-1 ring-white/20"
                        >
                            ✨
                        </button>
                    </template>
                    <template v-else>
                        <div
                            class="px-5 py-3 bg-white/30 backdrop-blur-sm text-white rounded-full shadow-lg font-bold text-lg flex items-center justify-center border border-white/40 ring-1 ring-white/20"
                        >
                            🌟
                        </div>
                    </template>
                </div>

                <ul class="space-y-3">
                    <li
                        v-for="task in tasks"
                        :key="task.id"
                        class="flex items-center justify-between bg-black/40 backdrop-blur-sm border border-white/60 p-3 rounded-full shadow-lg hover:shadow-xl transition ring-1 ring-white/40"
                    >
                        <div class="flex items-center gap-3">
                            <input
                                :checked="task.is_done"
                                @change="handleTaskUpdate(task.id, $event.target.checked)"
                                type="checkbox"
                                class="w-6 h-6 accent-yellow-400 rounded-full cursor-pointer"
                            />
                            <span
                                class="text-white font-medium"
                                :class="{ 'line-through opacity-60': task.is_done }"
                                style="text-shadow: 1px 1px 2px rgba(0,0,0,0.8);"
                                >{{ task.task }}</span
                            >
                        </div>
                        <button
                            @click="modalStore.deleteId(task.id)"
                            class="text-white hover:text-red-300 transition text-xl"
                            style="text-shadow: 1px 1px 2px rgba(0,0,0,0.8);"
                        >
                            🗑️
                        </button>
                    </li>
                </ul>
            </div>
        </div>

        <DeleteModal />
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
