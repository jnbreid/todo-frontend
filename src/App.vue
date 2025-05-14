<template>
  <div class="min-h-screen bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100">
    <nav class="bg-white dark:bg-gray-800 p-4 shadow flex justify-between items-center">
      <div class="text-lg font-semibold">My To-Do App</div>
      <div class="space-x-4 flex items-center">
        <router-link to="/" class="text-blue-600 dark:text-blue-400 hover:underline">Home</router-link>
        <router-link to="/login" class="text-blue-600 dark:text-blue-400 hover:underline">Login</router-link>
        <router-link to="/register" class="text-blue-600 dark:text-blue-400 hover:underline">Register</router-link>
        <button
          @click="toggleDark"
          class="ml-4 text-sm px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600">
          {{ isDark ? 'Dark' : 'Light' }}
        </button>
      </div>
    </nav>

    <div class="p-6">
      <router-view />
    </div>
  </div>
</template>



<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isDark = ref(false)



function toggleDark() {
  isDark.value = !isDark.value
  const lightTheme = document.getElementById('pv-light') as HTMLLinkElement
  const darkTheme = document.getElementById('pv-dark') as HTMLLinkElement

  if (lightTheme && darkTheme) {
    lightTheme.disabled = isDark.value
    darkTheme.disabled = !isDark.value
  }

  // Optional: also toggle Tailwind's dark mode
  document.documentElement.classList.toggle('dark', isDark.value)
}
</script>
