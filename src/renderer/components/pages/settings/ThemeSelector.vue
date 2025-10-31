<script setup lang="ts"></script>

<template>
  <div>
    <label class="block text-sm font-medium mb-2">Theme</label>
    <select
      v-model="settings.theme"
      class="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="dark">Dark</option>
      <option value="light">Light</option>
      <option value="auto">Auto</option>
    </select>
  </div>
</template>
