<!--
  SPDX-License-Identifier: MIT
  Copyright (c) 2025 Jon Breid
-->

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
  
      <!-- Irreversible action warning -->
      <p class="text-red-600 text-sm font-semibold">
        Deleting your account is irreversible. All your data will be permanently removed.
      </p>
  
      <!-- Confirmation checkbox -->
      <div class="flex items-center space-x-2">
        <input
          type="checkbox"
          id="confirmDelete"
          v-model="confirmed"
          class="accent-red-600"
        />
        <label for="confirmDelete" class="text-sm">
          I understand and want to proceed with deleting my account.
        </label>
      </div>
  
      <div class="flex justify-end space-x-2">
        <button
          type="submit"
          :disabled="!confirmed"
          class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Delete Account
        </button>
      </div>
  
      <p v-if="errorMessage" class="text-red-500 text-sm">{{ errorMessage }}</p>
    </form>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  
  const emit = defineEmits<{
    (e: 'submit', payload: { username: string; password: string }): void
  }>()
  
  const form = ref({
    username: '',
    password: ''
  })
  
  const confirmed = ref(false)
  const errorMessage = ref('')
  
  const handleDelete = () => {
    if (confirmed.value) {
      emit('submit', { ...form.value })
    }
  }
  </script>