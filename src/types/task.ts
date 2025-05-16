
export interface Task {
    publicId: string 
    name: string
    description: string
    complete: boolean
    deadline: Date
    priority: number
  }