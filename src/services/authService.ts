
import axios from 'axios'
import type { User } from '../types/user'
import type { AuthResponse } from '../types/authResponse'

const API_BASE = '/api/users'

export const register = async (user: User): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(`${API_BASE}/register`, user)
  return response.data
}

export const login = async (user: User): Promise<AuthResponse> => {
   try {
    const response = await axios.post<AuthResponse>(`${API_BASE}/login`, user)
    return response.data
  } catch (error) {
    throw new Error('Login failed')
  }
}