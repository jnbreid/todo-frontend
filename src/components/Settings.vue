<template>
  <div class="max-w-md mx-auto p-6 space-y-6 text-gray-900 dark:text-gray-100">

    <div class="flex items-center justify-between">
      <label class="font-semibold">Dark Mode</label>
      <button
        @click="$emit('toggle-dark')"
        class="text-sm px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
      >
        {{ isDark ? 'Dark' : 'Light' }}
      </button>
    </div>

    <div v-if="isLoggedIn" class="space-y-4">
      <button
        @click="openDeleteDialog"
        class="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
      >
        Delete Account
      </button>
    </div>

    <Dialog
      v-model:visible="showDeleteDialog"
      modal
      header="Delete Account"
      class="w-full md:w-[30rem]"
      :closable="true"
      contentClass="dark:bg-gray-800 dark:text-gray-100"
      headerClass="dark:bg-gray-900 dark:text-gray-100"
      @hide="closeDeleteDialog"
    >
      <div class="p-4 space-y-2 dark:bg-gray-800 dark:text-gray-100">
        <DeleteAccountForm
          :loading="deleting"
          :error="deleteError"
          @submit="onDeleteSubmit"
        />
      </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DeleteAccountForm from '../components/DeleteAccountForm.vue'
import Dialog from 'primevue/dialog'
import type { User } from '../types/user'

defineProps({
  isDark: Boolean,
  isLoggedIn: Boolean,
})

const emit = defineEmits(['toggle-dark', 'logout', 'delete-account'])

const showDeleteDialog = ref(false)
const deleting = ref(false)
const deleteError = ref('')

const openDeleteDialog = () => {
  showDeleteDialog.value = true
}

const closeDeleteDialog = () => {
  showDeleteDialog.value = false
}

const onDeleteSubmit = async (user: User) => {
  deleting.value = true
  deleteError.value = ''
  try {
    await emit('delete-account', user)
    closeDeleteDialog()
  } catch (e) {
    deleteError.value = 'Failed to delete account. Check your credentials.'
  } finally {
    deleting.value = false
  }
}
</script>