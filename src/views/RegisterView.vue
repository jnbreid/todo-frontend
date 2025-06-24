<!--
  SPDX-License-Identifier: MIT
  Copyright (c) 2025 Jon Breid
-->

<template>
    <div class="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div class="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
        <h1 class="text-2xl font-bold mb-6 text-center dark:text-white">Register</h1>
  
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-1">Username</label>
            <InputText v-model="form.username" 
            class="w-full px-4 py-0.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white mb-4"
            required />
          </div>
  
          <div>
            <label class="block text-sm font-medium mb-1">Password</label>
            <Password v-model="form.password" class="w-full" 
            inputClass="w-full px-4 py-0.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white" 
            toggleMask required />
          </div>
  
          <Button label="Register" icon="pi pi-sign-in" class="w-full bg-blue-600 hover:bg-blue-700 text-white border-none rounded-lg shadow" type="submit" />
        </form>
  
        <p class="mt-4 text-sm text-center text-gray-500">
          Already have an account?
          <RouterLink to="/login" class="text-blue-600 hover:underline">Login</RouterLink>
        </p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import InputText from 'primevue/inputtext'
  import Password from 'primevue/password'
  import Button from 'primevue/button'
  import { AuthService } from '../services/authService'
  import type { User } from '../types/user'
  
  const router = useRouter()

  const auth = new AuthService()
  
  const form = ref<User>({
    username: '',
    password: '',
  })
  
  const handleSubmit = async () => {
    try {
      await auth.register(form.value)
      router.push('/login')
    } catch (err) {
      console.error('Registration failed', err)
      alert('Registration failed. Please try again.')
    }
  }
  </script>