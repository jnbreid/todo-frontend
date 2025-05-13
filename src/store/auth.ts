
import { defineStore } from 'pinia'
import type { AuthResponse } from '../types/authResponse'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: '' as string,
        username: '' as string,
    }),

    actions: {
        setAuth(data: AuthResponse) {
            this.token = data.token
            this.username = data.username
        },
        logout() {
            this.token = ''
            this.username = ''
        }
    }
})