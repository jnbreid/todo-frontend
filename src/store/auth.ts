
import { defineStore } from 'pinia'
import type { AuthResponse } from '../types/authResponse'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    username: localStorage.getItem('username') || ''
  }),

  actions: {
    setAuth(data: AuthResponse) {
      this.token = data.token
      this.username = data.username
      localStorage.setItem('token', data.token)
      localStorage.setItem('username', data.username)
    },
    logout() {
      this.token = ''
      this.username = ''
      localStorage.removeItem('token')
      localStorage.removeItem('username')
    }
  },

  getters: {
    isAuthenticated: (state) => !!state.token,
  }
})