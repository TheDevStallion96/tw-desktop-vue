<script setup lang="ts">
defineProps<{
  label: string;
  name: string;
  type: string;
  value: string;
  placeholder?: string;
}>();
</script>

<template>
  <div class="tw-input--group">
    <label for="{{ name }}" class="tw-input--label">{{ label }}</label>
    <input
      type="{{ type }}"
      name="{{ name }}"
      value="{{ value }}"
      class="tw-input--control"
      placeholder="{{ placeholder }}"
    />
  </div>
</template>
