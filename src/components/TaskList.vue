

<template>
    <div>
      <div v-if="tasks.length === 0" class="text-center text-gray-400 dark:text-gray-500 p-4">
      No tasks found.
      </div>
  
      <div class="space-y-3 max-h-[70vh] overflow-y-auto pr-2">
        <TaskItem
          v-for="task in tasks"
          :key="task.id"
          :task="task"
          @complete="$emit('complete', task.id)"
          @edit="$emit('edit', task)"
          @delete="$emit('delete', task.id)"
        />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import TaskItem from './TaskItem.vue'
  import { defineProps, defineEmits } from 'vue'
  import type { Task } from '../types/task'
  
  const props = defineProps<{
    tasks: Task[]
  }>()
  
  defineEmits<{
    (e: 'complete', id: string): void
    (e: 'edit', task: Task): void
    (e: 'delete', id: string): void
  }>()
  </script>