# To-Do App Frontend

This is the frontend for a simple to-do application built with [Vue 3](https://vuejs.org/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/), [Tailwind CSS](https://tailwindcss.com/), and [PrimeVue](https://primevue.org/). It connects to a custom REST API backend.

---

##  Features

-  User registration and login
-  Create, update, delete, and complete tasks
-  Publicly shareable task links
-  Responsive UI with Tailwind and PrimeVue components
-  Fast development via Vite

---

## Technologies Used

- **Vue 3**
- **TypeScript**
- **Vite**
- **Tailwind CSS**
- **PrimeVue**
- **Axios**
- **Pinia**

## Prerequisites

- [Docker](https://www.docker.com/) installed on your machine.


## Getting Started

### 1. Build the Docker image

```bash
docker build -t todo-frontend .
```
### 2. Run the container

```bash
docker run --name frontend -p 8081:80 todo-frontend
```

This will start the frontend and expose it at: [http://localhost:8081](http://localhost:8081)


## License

This project is licensed under the MIT License - see the [LICENSE file](LICENSE) for details.