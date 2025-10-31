<script setup lang="ts">
import { ref, onMounted } from 'vue';

const electronVersion = ref('...');
const chromeVersion = ref('...');
const nodeVersion = ref('...');

onMounted(() => {
  if (window.electron) {
    electronVersion.value = window.electron.versions.electron();
    chromeVersion.value = window.electron.versions.chrome();
    nodeVersion.value = window.electron.versions.node();
  }
});
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">Dashboard</h1>
    <p class="text-gray-300 mb-4">
      Welcome to TW Desktop - an Electron app built with Vue 3, Vite, and
      Tailwind CSS v4.
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- System Info Card -->
      <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 class="text-xl font-semibold mb-4">System Information</h2>
        <div class="space-y-2 text-sm text-gray-400">
          <p>
            <span class="font-medium text-gray-200">Electron:</span>
            {{ electronVersion }}
          </p>
          <p>
            <span class="font-medium text-gray-200">Chromium:</span>
            {{ chromeVersion }}
          </p>
          <p>
            <span class="font-medium text-gray-200">Node.js:</span>
            {{ nodeVersion }}
          </p>
        </div>
      </div>

      <!-- Stats Card -->
      <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 class="text-xl font-semibold mb-4">Statistics</h2>
        <div class="space-y-3">
          <div>
            <p class="text-sm text-gray-400">Total Projects</p>
            <p class="text-2xl font-bold text-blue-500">12</p>
          </div>
          <div>
            <p class="text-sm text-gray-400">Active Tasks</p>
            <p class="text-2xl font-bold text-green-500">8</p>
          </div>
        </div>
      </div>

      <!-- Quick Actions Card -->
      <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 class="text-xl font-semibold mb-4">Quick Actions</h2>
        <div class="space-y-2">
          <button
            class="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm font-medium transition-colors"
          >
            New Project
          </button>
          <button
            class="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-sm font-medium transition-colors"
          >
            Import Data
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
