import { defineStore } from 'pinia'

export const useModalStore = defineStore('modalStore', {
    // State: Equivalent to data in a component
    state: () => ({
        isDeleteModalVisible: false,
        isDeleteSuccessfull: false,
        id: null,
    }),

    // Getters: Equivalent to computed properties
    getters: {
        isDeleteModalShown: (state) => state.isDeleteModalVisible,
    },

    // Actions: Equivalent to methods
    actions: {
        deleteId(id) {
            this.id = id

            console.log(this.id)

            this.toggleDeleteModalVisibility()
        },
        toggleDeleteModalVisibility() {
            this.isDeleteModalVisible = !this.isDeleteModalVisible
        },
    },
})
