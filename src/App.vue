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

  <div class="bg-red-500 text-white p-4 text-lg">
    Tailwind is working!
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isDark = ref(false)

const updateHtmlClass = () => {
  const html = document.documentElement // ⬅️ This selects <html>
  if (isDark.value) {
    html.classList.add('dark')
  } else {
    html.classList.remove('dark')
  }
}

onMounted(() => {
  const saved = localStorage.getItem('theme')
  if (saved) {
    isDark.value = saved === 'dark'
  } else {
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  updateHtmlClass()
})

const toggleDark = () => {
  isDark.value = !isDark.value
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  updateHtmlClass()
}
</script>
