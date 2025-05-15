<template>
  <div class="max-w-3xl mx-auto p-6 space-y-6 text-gray-900 dark:text-gray-100">
    <h1 class="text-2xl font-bold">
      Welcome<span v-if="authStore.isAuthenticated">, {{ authStore.username }}</span>
    </h1>

    <div class="flex justify-between items-center">
      <h2 class="text-xl font-semibold">Your Tasks</h2>
      <Button
        label="New Task"
        icon="pi pi-plus"
        severity="primary"
        @click="openNewTaskForm"
      />
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
    >
      <TaskForm @submit="handleCreate" />
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
import { ref } from 'vue'
import TaskForm from '../components/TaskForm.vue'
import TaskList from '../components/TaskList.vue'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import { useAuthStore } from '../store/auth'
import type { Task } from '../types/task'

const authStore = useAuthStore()

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

const handleCreate = (task: Task) => {
  tasks.value.push({ ...task, id: Date.now().toString() })
  showCreateForm.value = false
}

const handleUpdate = (updatedTask: Task) => {
  const index = tasks.value.findIndex(t => t.id === updatedTask.id)
  if (index !== -1) {
    tasks.value[index] = { ...updatedTask }
  }
  showEditForm.value = false
}

const handleComplete = (id: string) => {
  const t = tasks.value.find(t => t.id === id)
  if (t) t.completed = true
}

const handleDelete = (id: string) => {
  tasks.value = tasks.value.filter(t => t.id !== id)
}
</script>

<style scoped>
.p-dialog {
  @apply dark:bg-gray-800 dark:text-gray-100;
}
</style>