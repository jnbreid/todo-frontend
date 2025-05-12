<!-- src/App.vue -->
<template>
  <div class="min-h-screen bg-gray-100 text-gray-800">
    <!-- Navbar -->
    <nav class="bg-white p-4 shadow flex justify-between">
      <div class="text-lg font-semibold">My To-Do App</div>
      <div class="space-x-4">
        <router-link to="/" class="text-blue-600 hover:underline">Home</router-link>
        <router-link to="/login" class="text-blue-600 hover:underline">Login</router-link>
      </div>
    </nav>

    <!-- Page content -->
    <div class="p-6">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
// No logic needed here for now
</script>
