<script setup lang="ts">
import { ref } from 'vue';

const menuItems = ref([
  { id: 1, name: 'Dashboard', icon: '📊', path: '/' },
  { id: 2, name: 'Projects', icon: '📁', path: '/projects' },
  { id: 3, name: 'Settings', icon: '⚙️', path: '/settings' },
]);
</script>

<template>
  <aside class="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
    <div class="p-4 border-b border-gray-700">
      <h2 class="text-lg font-semibold">Navigation</h2>
    </div>
    <nav class="flex-1 overflow-y-auto p-4">
      <ul class="space-y-2">
        <li v-for="item in menuItems" :key="item.id">
          <router-link v-slot="{ isActive }" :to="item.path">
            <div
              :class="[
                'w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center space-x-3 cursor-pointer',
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700',
              ]"
            >
              <span class="text-xl">{{ item.icon }}</span>
              <span class="font-medium">{{ item.name }}</span>
            </div>
          </router-link>
        </li>
      </ul>
    </nav>
    <div class="p-4 border-t border-gray-700">
      <p class="text-xs text-gray-500">v0.0.0</p>
    </div>
  </aside>
</template>
