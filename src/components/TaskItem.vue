<!--
  SPDX-License-Identifier: MIT
  Copyright (c) 2025 Jon Breid
-->

<template>
  <div
    class="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md transition text-gray-900 dark:text-gray-100"
    :class="{ 'opacity-50 line-through': task.complete }"
  >
    <div class="flex flex-col">
      <h3 class="text-lg font-medium truncate">{{ task.name }}</h3>
      <p class="text-sm text-gray-500 dark:text-gray-400 truncate">
        {{ task.description }}
      </p>
      <div class="text-sm text-gray-400 dark:text-gray-500 mt-1">
        <span class="mr-4">
          Priority:
          <span class="font-semibold text-gray-600 dark:text-gray-300">{{ task.priority }}</span>
        </span>
        <span>
          Deadline:
          <span class="font-semibold text-gray-600 dark:text-gray-300">
            {{ formattedDeadline }}
          </span>
        </span>
      </div>
    </div>

    <div class="flex items-center gap-2">
      <Button
        icon="pi pi-check"
        severity="success"
        text
        rounded
        aria-label="Complete"
        @click="$emit('complete', task.publicId)"
        v-if="!task.complete"
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
        @click="$emit('delete', task.publicId)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue'
import Button from 'primevue/button'
import type { Task } from '../types/task'

const props = defineProps<{
  task: Task
}>()

defineEmits<{
  (e: 'complete', publicId: string): void
  (e: 'edit', task: Task): void
  (e: 'delete', publicId: string): void
}>()

// Format deadline as readable date (e.g. "June 1, 2025")
const formattedDeadline = computed(() => {
  if (!props.task.deadline) return 'None'
  const date = new Date(props.task.deadline)
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
})
</script>