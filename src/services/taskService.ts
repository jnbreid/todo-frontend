
import apiClient from './apiClient'
import type { Task } from '../types/task'

export async function fetchMyTasks(): Promise<Task[]> {
    try {
        const response = await apiClient.get('/tasks/my-tasks')
        const tasks: Task[] = response.data.map((task: any) => ({
            ...task,
            deadline: task.deadline ? new Date(task.deadline) : null,
        }))
        return tasks
    } catch (error) {
        throw new Error('Loading tasks failed.')
    }
}

export async function createTask(task: Task): Promise<void> {
 
        task.id = "00000000-0000-0000-0000-000000000000" // empty/Nil UUID as placeholder (is changed in backend)
        const payload = {
            ...task,
            deadline: task.deadline ? task.deadline.toISOString() : null,//.toISOString().split('T')[0] : null,
        }
        await apiClient.post('/tasks', payload)

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