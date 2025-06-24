// SPDX-License-Identifier: MIT
// Copyright (c) 2025 Jon Breid

export interface Task {
    publicId: string 
    name: string
    description: string
    complete: boolean
    deadline: Date
    priority: number
  }