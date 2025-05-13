<template>
    <div class="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <div class="w-full max-w-md bg-white p-6 rounded-2xl shadow-md">
        <h1 class="text-2xl font-bold mb-6 text-center">Register</h1>
  
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-1">Username</label>
            <InputText v-model="form.username" class="w-full" required />
          </div>
  
          <div>
            <label class="block text-sm font-medium mb-1">Password</label>
            <Password v-model="form.password" class="w-full" toggleMask required />
          </div>
  
          <Button label="Create Account" icon="pi pi-user-plus" class="w-full" type="submit" />
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
  import { register } from '../api/auth'
  import type { User } from '../types/user'
  
  const router = useRouter()
  
  const form = ref<User>({
    username: '',
    password: '',
  })
  
  const handleSubmit = async () => {
    try {
      await register(form.value)
      router.push('/login')
    } catch (err) {
      console.error('Registration failed', err)
      alert('Registration failed. Please try again.')
    }
  }
  </script>