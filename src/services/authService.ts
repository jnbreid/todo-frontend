
import apiClient from './apiClient'
import type { User } from '../types/user'
import type { AuthResponse } from '../types/authResponse'

export class AuthService {
  async login(user: User): Promise<AuthResponse> {
    try {
        const response = await apiClient.post<AuthResponse>('/users/login', user)
        return response.data
    } catch (error) {
        throw new Error('Login failed')
    }
  }

  async register(user: User): Promise<void> {
    await apiClient.post('/users/register', user)
  }

  async delete(user: User): Promise<void> {
    await apiClient.delete('/users/delete', {data: user})
  }
}
