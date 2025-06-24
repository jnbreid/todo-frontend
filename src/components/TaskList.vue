<!--
  SPDX-License-Identifier: MIT
  Copyright (c) 2025 Jon Breid
-->

<template>
    <div>
      <div v-if="tasks.length === 0" class="text-center text-gray-400 dark:text-gray-500 p-4">
      No tasks found.
      </div>
  
      <div class="space-y-3 max-h-[70vh] overflow-y-auto pr-2">
        <TaskItem
          v-for="(task, index) in tasks"
          :key="task.publicId ?? `new-task-${index}`"
          :task="task"
          @complete="$emit('complete', task.publicId)"
          @edit="$emit('edit', task)"
          @delete="$emit('delete', task.publicId)"
        />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import TaskItem from './TaskItem.vue'
  import { defineProps } from 'vue'
  import type { Task } from '../types/task'
  
  const { tasks } = defineProps<{ tasks: Task[] }>()
  
  defineEmits<{
    (e: 'complete', publicId: string): void
    (e: 'edit', task: Task): void
    (e: 'delete', publicId: string): void
  }>()
  </script>