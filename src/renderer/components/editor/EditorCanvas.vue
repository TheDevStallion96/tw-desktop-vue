<script setup lang="ts">
import { computed } from 'vue';
import { useProject } from '../../composables/useProject';
import CanvasElement from './CanvasElement.vue';
import type { Breakpoint } from '../../types/project';

const { currentProject, currentBreakpoint } = useProject();

const canvasWidth = computed(() => {
  const breakpoint = currentBreakpoint.value as Breakpoint;
  switch (breakpoint) {
    case 'mobile':
      return '375px';
    case 'tablet':
      return '768px';
    case 'desktop':
      return '100%';
    default:
      return '100%';
  }
});

const canvasMaxWidth = computed(() => {
  const breakpoint = currentBreakpoint.value as Breakpoint;
  return breakpoint === 'desktop' ? '1440px' : canvasWidth.value;
});
</script>

<template>
  <div class="flex items-start justify-center p-8 min-h-full">
    <div
      v-if="currentProject"
      class="bg-white shadow-2xl transition-all duration-300"
      :style="{
        width: canvasWidth,
        maxWidth: canvasMaxWidth,
        minHeight: '600px',
      }"
    >
      <!-- Render the root element and its children -->
      <CanvasElement :element="currentProject.rootElement" :is-root="true" />
    </div>
    <div v-else class="text-gray-400 text-center">
      <p class="text-xl">No project loaded</p>
      <p class="text-sm mt-2">Create a new project to get started</p>
    </div>
  </div>
</template>
