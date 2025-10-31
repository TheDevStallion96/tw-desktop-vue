<script setup lang="ts">
import { onMounted } from 'vue';
import { useProject } from '../composables/useProject';
import ComponentsPalette from '../components/editor/ComponentsPalette.vue';
import EditorCanvas from '../components/editor/EditorCanvas.vue';
import PropertiesPanel from '../components/editor/PropertiesPanel.vue';
import EditorToolbar from '../components/editor/EditorToolbar.vue';

const { currentProject, createNewProject } = useProject();

onMounted(() => {
  // Create a default project if none exists
  if (!currentProject.value) {
    createNewProject('Untitled Project', 'A new Tailwind Studio project');
  }
});
</script>

<template>
  <div class="flex flex-col h-full">
    <!-- Toolbar -->
    <EditorToolbar />

    <!-- Editor Layout: 3 columns -->
    <div class="flex flex-1 overflow-hidden">
      <!-- Left: Components Palette -->
      <div class="w-64 border-r border-gray-700 bg-gray-800 overflow-y-auto">
        <ComponentsPalette />
      </div>

      <!-- Center: Canvas -->
      <div class="flex-1 bg-gray-900 overflow-auto">
        <EditorCanvas />
      </div>

      <!-- Right: Properties Panel -->
      <div class="w-80 border-l border-gray-700 bg-gray-800 overflow-y-auto">
        <PropertiesPanel />
      </div>
    </div>
  </div>
</template>
