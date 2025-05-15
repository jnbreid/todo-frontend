
import { defineStore } from 'pinia'
import type { Task } from '../types/task'
import * as taskService from '../services/taskService'

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [] as Task[],
  }),

  actions: {
    async fetchTasks() {
      this.tasks = await taskService.fetchMyTasks()
    },

    async addTask(task: Task) {
      await taskService.createTask(task)
      await this.fetchTasks()  // Refresh after creation
    },

    async updateTask(task: Task) {
      await taskService.updateTask(task)
      await this.fetchTasks()
    },

    async completeTask(publicId: string) {
      await taskService.completeTask(publicId)
      await this.fetchTasks()
    },

    async deleteTask(publicId: string) {
      await taskService.deleteTask(publicId)
      await this.fetchTasks()
    }
  }
})