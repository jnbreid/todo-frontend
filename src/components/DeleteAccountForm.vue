<template>
    <form @submit.prevent="handleDelete" class="space-y-4">
      <div>
        <label for="username" class="block text-sm font-medium">Username</label>
        <input
          id="username"
          v-model="form.username"
          type="text"
          class="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:text-white"
          required
        />
      </div>
  
      <div>
        <label for="password" class="block text-sm font-medium">Password</label>
        <input
          id="password"
          v-model="form.password"
          type="password"
          class="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:text-white"
          required
        />
      </div>
  
      <div class="flex justify-end space-x-2">
        <button
          type="submit"
          class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Delete Account
        </button>
      </div>
  
      <p v-if="errorMessage" class="text-red-500 text-sm">{{ errorMessage }}</p>
    </form>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '../store/auth'
  import { deleteUser } from '../services/authService'

  const router = useRouter()
  const authStore = useAuthStore()
  
  const form = ref({
    username: '',
    password: ''
  })
  
  const errorMessage = ref('')
  
  const handleDelete = async () => {
    try {
      await deleteUser(form.value)
      authStore.logout()
      router.push('/login')
    } catch (error: any) {
      errorMessage.value = error?.response?.data?.message || 'Failed to delete account'
    }
  }
  </script>