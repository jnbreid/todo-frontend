
import axios from 'axios'
import type { User } from '../types/user'
import type { AuthResponse } from '../types/authResponse'

export const login = async (credentials: User): Promise<AuthResponse> => {
    const response = await axios.post<AuthResponse>('/api/users/login', credentials)
    return response.data
}

export const register = async (userData: User): Promise<void> => {
    await axios.post('api/users/register', userData)
}