<script setup lang="ts">
import { ref } from 'vue';

const settings = ref({
  theme: 'dark',
  notifications: true,
  autoSave: true,
  language: 'en',
});

const saveSettings = () => {
  // Settings save logic would go here
  console.log('Settings saved:', settings.value);
};
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">Settings</h1>

    <div class="max-w-2xl space-y-6">
      <!-- Appearance Section -->
      <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 class="text-xl font-semibold mb-4">Appearance</h2>

        <div class="space-y-4">
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

          <div>
            <label class="block text-sm font-medium mb-2">Language</label>
            <select
              v-model="settings.language"
              class="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Preferences Section -->
      <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 class="text-xl font-semibold mb-4">Preferences</h2>

        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="font-medium">Enable Notifications</p>
              <p class="text-sm text-gray-400">Receive desktop notifications</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input
                v-model="settings.notifications"
                type="checkbox"
                class="sr-only peer"
              />
              <div
                class="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"
              />
            </label>
          </div>

          <div class="flex items-center justify-between">
            <div>
              <p class="font-medium">Auto Save</p>
              <p class="text-sm text-gray-400">Automatically save your work</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input
                v-model="settings.autoSave"
                type="checkbox"
                class="sr-only peer"
              />
              <div
                class="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"
              />
            </label>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex gap-3">
        <button
          class="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-md font-medium transition-colors"
          @click="saveSettings"
        >
          Save Changes
        </button>
        <button
          class="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-md font-medium transition-colors"
        >
          Reset to Defaults
        </button>
      </div>
    </div>
  </div>
</template>
