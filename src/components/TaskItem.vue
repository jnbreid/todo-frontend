<template>
    <div
    class="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md transition text-gray-900 dark:text-gray-100"
    :class="{ 'opacity-50 line-through': task.completed }"
    >
      <div>
        <h3 class="text-lg font-medium truncate">{{ task.title }}</h3>
        <p class="text-sm text-gray-500 dark:text-gray-400 truncate">{{ task.description }}</p>
      </div>
  
      <div class="flex items-center gap-2">
        <Button
          icon="pi pi-check"
          severity="success"
          text
          rounded
          aria-label="Complete"
          @click="$emit('complete', task.id)"
          v-if="!task.completed"
        />
        <Button
          icon="pi pi-pencil"
          severity="info"
          text
          rounded
          aria-label="Edit"
          @click="$emit('edit', task)"
        />
        <Button
          icon="pi pi-trash"
          severity="danger"
          text
          rounded
          aria-label="Delete"
          @click="$emit('delete', task.id)"
        />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps, defineEmits } from 'vue'
  import Button from 'primevue/button'
  import type { Task } from '../types/task'
    
  const props = defineProps<{
    task: Task
  }>()
  
  defineEmits<{
    (e: 'complete', id: string): void
    (e: 'edit', task: Task): void
    (e: 'delete', id: string): void
  }>()
  </script>