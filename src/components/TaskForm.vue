

<template>
    <form @submit.prevent="submitForm" class="space-y-4">
      <div>
        <label class="block text-sm font-medium mb-1">Title</label>
        <InputText
          v-model="form.title"
          class="w-full"
          placeholder="Enter task title"
          required
        />
      </div>
  
      <div>
        <label class="block text-sm font-medium mb-1">Description</label>
        <Textarea
          v-model="form.description"
          class="w-full"
          rows="3"
          placeholder="Enter task description"
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
    title: '',
    description: '',
    completed: false,
  })
  
  // If editing, populate the form
  watch(
    () => props.task,
    (newTask) => {
      if (newTask) {
        form.value = { ...newTask }
      }
    },
    { immediate: true }
  )
  
  const submitForm = () => {
    if (!form.value.title.trim()) return
    emit('submit', { ...form.value })
  }
  </script>