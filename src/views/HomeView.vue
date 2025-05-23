<template>
  <div class="max-w-3xl mx-auto p-6 space-y-6 text-gray-900 dark:text-gray-100">
    <h1 class="text-2xl font-bold">
      Welcome<span v-if="authStore.isAuthenticated">, {{ authStore.username }}</span>
    </h1>
  
    <div class="flex justify-between items-center">
      <h2 class="text-xl font-semibold">Your Tasks</h2>
      <div v-if="isLoggedIn">
        <Button
          label="New Task"
          icon="pi pi-plus"
          severity="primary"
          @click="openNewTaskForm"
        />
      </div>
    </div>

    <TaskList
      :tasks="tasks"
      @complete="handleComplete"
      @edit="openEditTaskForm"
      @delete="handleDelete"
    />

    <!-- Create Task Modal -->
    <Dialog
      v-model:visible="showCreateForm"
      modal
      header="Create New Task"
      class="w-full md:w-[30rem]"
      :closable="true"
      contentClass="dark:bg-gray-800 dark:text-gray-100"
      headerClass="dark:bg-gray-900 dark:text-gray-100"
    >
      <div class="dark:bg-gray-800 dark:text-gray-100 p-4">
        <TaskForm @submit="handleCreate" />
      </div>
    </Dialog>

    <!-- Edit Task Modal -->
    <Dialog
      v-model:visible="showEditForm"
      modal
      header="Edit Task"
      class="w-full md:w-[30rem]"
      :closable="true"
    >
      <TaskForm :task="editingTask" @submit="handleUpdate" />
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import TaskForm from '../components/TaskForm.vue'
import TaskList from '../components/TaskList.vue'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import { useAuthStore } from '../store/auth'
import type { Task } from '../types/task'

import {
  fetchMyTasks,
  createTask,
  updateTask,
  completeTask,
  deleteTask
} from '../services/taskService'

const authStore = useAuthStore()
const isLoggedIn = computed(() => !!authStore.token)

const tasks = ref<Task[]>([])

const showCreateForm = ref(false)
const showEditForm = ref(false)
const editingTask = ref<Task | undefined>(undefined)

const openNewTaskForm = () => {
  showCreateForm.value = true
}

const openEditTaskForm = (task: Task) => {
  editingTask.value = task
  showEditForm.value = true
}

onMounted(async () => {
  try {
    tasks.value = await fetchMyTasks()
  } catch (error) {
    console.error('Failed to load tasks:', error)
  }
})

const handleCreate = async (task: Task) => {
  try {
    await createTask(task)
    // After creation, reload all tasks to get updated list from backend (or optimistically add task)
    tasks.value = await fetchMyTasks()
    showCreateForm.value = false
  } catch (error) {
    console.error('Failed to create task:', error)
  }
}

const handleUpdate = async (updatedTask: Task) => {
  try {
    await updateTask(updatedTask)
    // Reload full list after update
    tasks.value = await fetchMyTasks()
    showEditForm.value = false
  } catch (error) {
    console.error('Failed to update task:', error)
  }
}

const handleComplete = async (publicId: string) => {
  try {
    await completeTask(publicId)
    // Reload full list after update
    tasks.value = await fetchMyTasks()
  } catch (error) {
    console.error('Failed to complete task:', error)
  }
}

const handleDelete = async (publicId: string) => {
  try {
    await deleteTask(publicId)
    // Reload full list after delete
    tasks.value = await fetchMyTasks()
  } catch (error) {
    console.error('Failed to delete task:', error)
  }
}
</script>

<style scoped>
.p-dialog {
  @apply dark:bg-gray-800 dark:text-gray-100;
}
</style>