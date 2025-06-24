// SPDX-License-Identifier: MIT
// Copyright (c) 2025 Jon Breid

import axios from 'axios'
import { useAuthStore } from '../store/auth' // adjust path

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add request interceptor
apiClient.interceptors.request.use(
  config => {
    const authStore = useAuthStore()
    if (authStore.token) {
      config.headers = config.headers || {}
      config.headers['Authorization'] = `Bearer ${authStore.token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

export default apiClient