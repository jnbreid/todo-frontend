

<template>
    <form @submit.prevent="submitForm" class="space-y-4">
      <div>
        <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">Title</label>
        <InputText
          v-model="form.title"
          class="w-full"
          inputClass="py-0.5 px-2"
          placeholder="Enter task title"
          required
        />
      </div>
  
      <div>
        <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">Title</label>
        <Textarea
          v-model="form.description"
          class="w-full"
          autoResize
          inputClass="py-0.5 px-2"
          rows="3"
          placeholder="Enter task description"
        />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">Deadline</label>
        <InputText
          v-model="form.deadline"
          class="w-full"
          inputClass="py-0.5 px-2"
          placeholder="e.g. 2025-06-01"
          type="date"
        />
      </div>
  
      <div class="flex justify-end">
        <Button
          label="Save Task"
          icon="pi pi-check"
          type="submit"
          severity="primary"
        />
      </div>
    </form>
  </template>
  
  <script setup lang="ts">
  import { ref, watch, defineProps, defineEmits } from 'vue'
  import InputText from 'primevue/inputtext'
  import Textarea from 'primevue/textarea'
  import Button from 'primevue/button'
  import type { Task } from '../types/task'  

  
  const props = defineProps<{
    task?: Task
  }>()
  
  const emit = defineEmits<{
    (e: 'submit', task: Task): void
  }>()
  
  const form = ref<Task>({
    id: '',
    title: '',
    description: '',
    completed: false,
    deadline: ''
  })
  
  const initializeForm = (task?: Task) => {
  form.value = task
    ? { ...task }
    : {
        id: '',
        title: '',
        description: '',
        completed: false,
        deadline: ''
      }
  }
 
  watch(
  () => props.task,
  (newTask) => {
    initializeForm(newTask)
  },
  { immediate: true }
  )
  
  const submitForm = () => {
    if (!form.value.title.trim()) return
    emit('submit', { ...form.value })
    if (!props.task) {
      initializeForm() 
    }
  }
  </script>