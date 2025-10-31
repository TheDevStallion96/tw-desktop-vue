<script setup lang="ts">
import { ref } from 'vue';
import { useProject } from '../../composables/useProject';
import { componentDefinitions } from '../../data/components';
import type { ElementNode } from '../../types/project';

const { addElement, currentProject } = useProject();
const draggedComponent = ref<string | null>(null);

const handleDragStart = (componentType: string) => {
  draggedComponent.value = componentType;
};

const handleDragEnd = () => {
  draggedComponent.value = null;
};

const createElement = (componentType: string): ElementNode => {
  const definition = componentDefinitions.find(
    (def) => def.type === componentType
  );
  if (!definition) {
    throw new Error(`Unknown component type: ${componentType}`);
  }

  return {
    id: window.crypto.randomUUID(),
    type: definition.type,
    classes: definition.defaultClasses,
    children: [],
    properties: { ...definition.defaultProperties },
  };
};

const handleComponentClick = (componentType: string) => {
  if (!currentProject.value) return;

  const element = createElement(componentType);
  // Add to root by default
  addElement(element);
};
</script>

<template>
  <div class="p-4">
    <h3 class="text-lg font-semibold mb-4 text-white">Components</h3>
    <div class="space-y-2">
      <div
        v-for="component in componentDefinitions"
        :key="component.type"
        draggable="true"
        :class="[
          'p-3 bg-gray-700 rounded-lg cursor-move hover:bg-gray-600 transition-colors',
          'border-2',
          draggedComponent === component.type
            ? 'border-blue-500'
            : 'border-transparent',
        ]"
        @dragstart="handleDragStart(component.type)"
        @dragend="handleDragEnd"
        @click="handleComponentClick(component.type)"
      >
        <div class="flex items-center gap-3">
          <span class="text-2xl">{{ component.icon }}</span>
          <div class="flex-1">
            <div class="text-sm font-medium text-white">
              {{ component.label }}
            </div>
            <div class="text-xs text-gray-400">
              {{ component.canHaveChildren ? 'Container' : 'Element' }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
