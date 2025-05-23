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
  import { ref, defineEmits } from 'vue'
  
  const emit = defineEmits<{
    (e: 'submit', payload: { username: string; password: string }): void
  }>()
  
  const form = ref({
    username: '',
    password: ''
  })
  
  const errorMessage = ref('')
  
  const handleDelete = () => {
    errorMessage.value = ''  // clear previous errors if any
    emit('submit', { ...form.value })
  }
  </script>