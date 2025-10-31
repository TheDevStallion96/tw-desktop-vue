<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  route: string;
}>();
</script>

<template>
  <a :href="props.route" class="button">
    <slot />
  </a>
</template>
