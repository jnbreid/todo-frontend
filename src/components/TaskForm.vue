<!--
  SPDX-License-Identifier: MIT
  Copyright (c) 2025 Jon Breid
-->

<template>
    <form @submit.prevent="submitForm" class="space-y-4">
      <div>
        <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">Title</label>
        <InputText
          v-model="form.name"
          class="w-full dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700"
          inputClass="py-0.5 px-2"
          placeholder="Enter task title"
          required
        />
      </div>
  
      <div>
        <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">Descirption</label>
        <Textarea
          v-model="form.description"
          class="w-full mt-2 border dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700 rounded-lg"
          autoResize
          inputClass="py-0.5 px-2"
          rows="3"
          placeholder="Enter task description"
        />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">Deadline</label>
        <input
          v-model="deadlineString"
          type="date"
          class="w-full py-0.5 px-2 border dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
        />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">Priority</label>
          <Dropdown
            v-model="form.priority"
            :options="priorityOptions"
            optionLabel="label"
            optionValue="value"
            placeholder="Select priority"
            contentClass="dark:bg-gray-800 dark:text-gray-100"
            class="w-full mt-2 border dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700 rounded-lg"
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
  import { ref, watch, defineProps, computed } from 'vue'
  import InputText from 'primevue/inputtext'
  import Textarea from 'primevue/textarea'
  import Button from 'primevue/button'
  import Dropdown from 'primevue/dropdown'
  import type { Task } from '../types/task'  

  const deadlineString = computed({
    get() {
      return form.value.deadline ? form.value.deadline.toISOString().slice(0,10) : ''
    },
    set(newDateStr: string) {
      form.value.deadline = new Date(newDateStr)
    }
  })

  const props = defineProps<{
    task?: Task
  }>()
  
  const emit = defineEmits<{
    (e: 'submit', task: Task): void
  }>()

  const priorityOptions = [
    { label: '1 (Lowest)', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5 (Highest)', value: 5 }
  ]
  
  const form = ref<Task>({
    publicId: '',
    name: '',
    description: '',
    complete: false,
    deadline: new Date(),
    priority: 1 // default to minimum priority
  })
  
  const initializeForm = (task?: Task) => {
  form.value = task
    ? { ...task }
    : {
        publicId: '',
        name: '',
        description: '',
        complete: false,
        deadline: new Date(),
        priority: 1
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
    if (!form.value.name.trim()) return
    emit('submit', { ...form.value })
    if (!props.task) {
      initializeForm() 
    }
  }
  </script>