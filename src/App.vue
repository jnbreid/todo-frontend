<!--
  SPDX-License-Identifier: MIT
  Copyright (c) 2025 Jon Breid
-->

<template>
  <div class="min-h-screen bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100">
    <nav class="bg-white dark:bg-gray-800 p-4 shadow flex justify-between items-center">
      <div class="text-lg font-semibold">My To-Do App</div>
      <div class="space-x-4 flex items-center">
        <router-link to="/" class="text-blue-600 dark:text-blue-400 hover:underline">Home</router-link>

        <!-- Only show when NOT logged in -->
        <template v-if="!isLoggedIn">
          <router-link to="/login" class="text-blue-600 dark:text-blue-400 hover:underline">Login</router-link>
          <router-link to="/register" class="text-blue-600 dark:text-blue-400 hover:underline">Register</router-link>
        </template>

        <!-- Show logout when logged in -->
        <template v-else>
          <span class="text-gray-600 dark:text-gray-300">Welcome, {{ authStore.username }}</span>
          <button
            @click="handleLogout"
            class="text-sm px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white">
            Logout
          </button>
        </template>

        <!-- Settings button -->
        <button
          @click="showSettings = true"
          class="ml-2 text-sm px-3 py-1 rounded bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600"
          title="Settings"
        >
          Settings
        </button>

      </div>
    </nav>

    <div class="p-6">
      <router-view />
    </div>

     <!-- Settings Modal -->
     <Dialog
      v-model:visible="showSettings"
      modal
      header="Settings"
      class="w-full max-w-md"
      :closable="true"
      contentClass="bg-gray-100 dark:bg-gray-800 dark:text-gray-100"
      headerClass="dark:bg-gray-900 dark:text-gray-100"
      @hide="showSettings = false"
    >
      <Settings
        :is-dark="isDark"
        :is-logged-in="isLoggedIn"
        @toggle-dark="toggleDark"
        @delete-account="handleDeleteAccount"
      />
    </Dialog>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from './store/auth' 
import Dialog from 'primevue/dialog'
import Settings from './components/Settings.vue'
import { deleteUser } from './services/authService'
import type { User } from './types/user'

const isDark = ref(false)
const authStore = useAuthStore()
const router = useRouter()
const showSettings = ref(false)

// Computed login state
const isLoggedIn = computed(() => !!authStore.token)

// Toggle dark/light mode
function applyTheme(dark: boolean): void {
  const light = document.getElementById('pv-light') as HTMLLinkElement
  const darkL = document.getElementById('pv-dark')  as HTMLLinkElement
  if (light && darkL) {
    light.disabled = dark
    darkL.disabled = !dark
  }
  document.documentElement.classList.toggle('dark', dark)
  localStorage.setItem('theme', dark ? 'dark' : 'light')
}


// Load theme on mount and apply it
onMounted(() => {
  const saved = localStorage.getItem('theme')
  if (saved) {
    isDark.value = saved === 'dark'
  } else {
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  applyTheme(isDark.value)
})

// Toggle dark mode manually
const toggleDark = () => {
  isDark.value = !isDark.value
  applyTheme(isDark.value)
}

// Handle logout
const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}


const handleDeleteAccount = async (user: User) => {
  try {
    await deleteUser(user)
    authStore.logout()
    router.push('/login')
  } catch (err) {
    console.error('Delete account failed', err)
  }
}

</script>