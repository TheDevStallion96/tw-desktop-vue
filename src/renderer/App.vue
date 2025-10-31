<script setup lang="ts">
import AppHeader from './components/layout/AppHeader.vue';
import AppSidebar from './components/layout/AppSidebar.vue';
</script>

<template>
  <div class="flex h-screen bg-gray-900 text-white">
    <!-- Sidebar -->
    <AppSidebar />

    <!-- Main Content Area -->
    <div class="flex flex-col flex-1">
      <!-- Header -->
      <AppHeader />

      <!-- Main Content -->
      <main class="flex-1 overflow-auto p-6">
        <div class="max-w-7xl mx-auto">
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>
