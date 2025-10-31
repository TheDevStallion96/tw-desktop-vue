<!-- Alert.vue -->
<template>
  <div
    class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
    role="alert"
  >
    <strong class="font-bold">{{ title }}</strong>
    <span class="block sm:inline">{{ message }}</span>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, default: 'Error!' },
  message: { type: String, default: 'Something went wrong. Please try again.' },
});
</script>
