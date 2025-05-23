<template>
    <div class="max-w-md mx-auto p-6 space-y-6 text-gray-900 dark:text-gray-100">
      <h1 class="text-2xl font-bold mb-4">Settings</h1>
  
      <!-- Dark mode toggle -->
      <div class="flex items-center justify-between">
        <label for="darkModeToggle" class="font-semibold">Dark Mode</label>
        <input
          id="darkModeToggle"
          type="checkbox"
          class="toggle-checkbox"
          :checked="isDark"
          @change="toggleDark"
        />
      </div>
  
      <!-- Show logout and delete only if logged in -->
      <div v-if="isLoggedIn" class="space-y-4">
        <button
          @click="handleLogout"
          class="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
        >
          Logout
        </button>
  
        <button
          @click="showDeleteDialog = true"
          class="w-full px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded"
        >
          Delete Account
        </button>
      </div>
  
      <!-- Delete Account Modal -->
      <Dialog
        v-model:visible="showDeleteDialog"
        modal
        header="Delete Account"
        class="w-full md:w-[30rem]"
        :closable="true"
        contentClass="dark:bg-gray-800 dark:text-gray-100"
        headerClass="dark:bg-gray-900 dark:text-gray-100"
      >
        <div class="p-4 space-y-2 dark:bg-gray-800 dark:text-gray-100">
          <DeleteAccountForm
            :loading="deleting"
            :error="deleteError"
            @submit="handleDelete"
          />
        </div>
      </Dialog>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '../store/auth'
  import DeleteAccountForm from '../components/DeleteAccountForm.vue'
  import Dialog from 'primevue/dialog'
  import { deleteUser } from '../services/authService'
  
  const authStore = useAuthStore()
  const router = useRouter()
  
  // Dark mode state
  const isDark = ref(false)
  const showDeleteDialog = ref(false)
  const deleting = ref(false)
  const deleteError = ref('')
  
  const isLoggedIn = computed(() => !!authStore.token)
  
  // Toggle dark mode (similar to your App.vue)
  const toggleDark = () => {
    isDark.value = !isDark.value
  
    const lightTheme = document.getElementById('pv-light') as HTMLLinkElement
    const darkTheme = document.getElementById('pv-dark') as HTMLLinkElement
  
    if (lightTheme && darkTheme) {
      lightTheme.disabled = isDark.value
      darkTheme.disabled = !isDark.value
    }
  
    document.documentElement.classList.toggle('dark', isDark.value)
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  }
  
  onMounted(() => {
    const saved = localStorage.getItem('theme')
    if (saved) {
      isDark.value = saved === 'dark'
    } else {
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    toggleDark() // Apply the theme on load
  })
  
  const handleLogout = () => {
    authStore.logout()
    router.push('/login')
  }
  
  const handleDelete = async (user: { username: string; password: string }) => {
    deleting.value = true
    deleteError.value = ''
  
    try {
      await deleteUser(user)
      authStore.logout()
      router.push('/register')
    } catch (err) {
      deleteError.value = 'Failed to delete account. Check your credentials.'
      console.error(err)
    } finally {
      deleting.value = false
      showDeleteDialog.value = false
    }
  }
  </script>
