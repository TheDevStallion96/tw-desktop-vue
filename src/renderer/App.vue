<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import AppHeader from './components/layout/AppHeader.vue';
import AppSidebar from './components/layout/AppSidebar.vue';

const route = useRoute();

// Check if we're on the editor route
const isEditorRoute = computed(() => route.path === '/editor');
</script>

<template>
  <div class="flex h-screen bg-gray-900 text-white">
    <!-- Sidebar -->
    <AppSidebar />

    <!-- Main Content Area -->
    <div class="flex flex-col flex-1">
      <!-- Header (hide on editor route for more space) -->
      <AppHeader v-if="!isEditorRoute" />

      <!-- Main Content -->
      <main
        :class="
          isEditorRoute ? 'flex-1 overflow-hidden' : 'flex-1 overflow-auto p-6'
        "
      >
        <div v-if="!isEditorRoute" class="max-w-7xl mx-auto">
          <router-view />
        </div>
        <router-view v-else />
      </main>
    </div>
  </div>
</template>
