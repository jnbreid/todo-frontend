<!--
  SPDX-License-Identifier: MIT
  Copyright (c) 2025 Jon Breid
-->

<template>
    <div class="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
        <div class="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
        <h1 class="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Login</h1>
  
        <!-- Login Form -->
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <!-- Username input -->
          <div>
            <label class="block text-sm font-medium mb-1">Username</label>
            <InputText v-model="form.username" 
            class="w-full px-4 py-0.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white mb-4"
            required />
          </div>
  
          <!-- Password input -->
          <div>
            <label class="block text-sm font-medium mb-1">Password</label>
            <Password v-model="form.password" class="w-full" 
            inputClass="w-full px-4 py-0.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white" 
            toggleMask required />
          </div>
  
          <!-- Login Button -->
          <Button label="Login" icon="pi pi-sign-in" class="w-full bg-blue-600 hover:bg-blue-700 text-white border-none rounded-lg shadow" type="submit" />
        </form>
  
        <!-- Link to registration -->
        <p class="mt-4 text-sm text-center text-gray-500">
          Don't have an account?
          <RouterLink to="/register" class="text-blue-600 hover:underline">Register</RouterLink>
        </p>
      </div>
    </div>
</template>
  
<script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '../store/auth' 
  import InputText from 'primevue/inputtext'
  import Password from 'primevue/password'
  import Button from 'primevue/button'
  import { AuthService } from '../services/authService'
  import type { User } from '../types/user'
  
  const router = useRouter()
  
  // Use the Pinia store for authentication state
  const authStore = useAuthStore()
  
  // Form data for login
  const form = ref<User>({
    username: '',
    password: ''
  })

  const auth = new AuthService()
  
  const handleSubmit = async () => {
    try {
      authStore.logout()
      const response = await auth.login(form.value)
      authStore.setAuth(response)
  
      router.push('/') 
    } catch (err) {
      console.error('Login failed', err)
      alert('Invalid credentials. Please try again.')
    }
  }
</script>