
<template>
    <div class="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <div class="w-full max-w-sm bg-white p-6 rounded-2xl shadow-md">
        <h1 class="text-2xl font-bold mb-6 text-center">Login</h1>
  
        <!-- Login Form -->
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <!-- Username input -->
          <div>
            <label class="block text-sm font-medium mb-1">Username</label>
            <InputText v-model="form.username" class="w-full" required />
          </div>
  
          <!-- Password input -->
          <div>
            <label class="block text-sm font-medium mb-1">Password</label>
            <Password v-model="form.password" class="w-full" toggleMask required />
          </div>
  
          <!-- Login Button -->
          <Button label="Login" icon="pi pi-sign-in" class="w-full" type="submit" />
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
  import { login } from '../api/auth'
  import type { User } from '../types/user'
  
  const router = useRouter()
  
  // Use the Pinia store for authentication state
  const authStore = useAuthStore()
  
  // Form data for login
  const form = ref<User>({
    username: '',
    password: ''
  })
  
  const handleSubmit = async () => {
    try {
      const response = await login(form.value)
      
      authStore.setAuth(response)
  
      router.push('/') 
    } catch (err) {
      console.error('Login failed', err)
      alert('Invalid credentials. Please try again.')
    }
  }
</script>