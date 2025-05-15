
import apiClient from './apiClient'
import type { Task } from '../types/task'

try {
    const response = await apiClient.post<AuthResponse>('/users/login', user)
    return response.data
} catch (error) {
    throw new Error('Login failed')
}

export async function fetchMyTasks(): Promise<Task[]> {
  try {
    const response = await apiClient.get('/tasks/my-tasks')
    return response.data
  } catch (error) {
    throw new Error('Loading tasks failed.')
  }
}

export async function createTask(task: Task): Promise<void> {
    try {
        await apiClient.post('/tasks', task)
    } catch (error) {
        throw new Error('Creating task failed.')
    }
}

export async function updateTask(task: Task): Promise<void> {
    try {
        await apiClient.put('/tasks/update', task)
    } catch (error) {
        throw new Error('Updating task failed.')
    }
}

export async function completeTask(publicId: string): Promise<void> {
    try {
        await apiClient.patch(`/tasks/public/${publicId}/complete`)
    } catch (error) {
        throw new Error('Task could not be updated.')
    }
}

export async function deleteTask(publicId: string): Promise<void> {
    try {
        await apiClient.delete(`/tasks/public/${publicId}`)
    } catch (error) {
        throw new Error('Deleting task failed.')
    }
}