// SPDX-License-Identifier: MIT
// Copyright (c) 2025 Jon Breid

import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'

const routes: Array<RouteRecordRaw> = [
    { 
        path: '/', 
        name: 'Home', 
        component: HomeView 
    },
    { 
        path: '/login', 
        name: 'Login', 
        component: LoginView
    },
    { 
        path: '/register', 
        name: 'Register', 
        component: RegisterView
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router

