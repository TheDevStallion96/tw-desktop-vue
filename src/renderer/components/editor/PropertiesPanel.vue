<script setup lang="ts">
import { ref, watch } from 'vue';
import { useProject } from '../../composables/useProject';
import { getComponentDefinition } from '../../data/components';

const { selectedElement, updateElement } = useProject();

// Local state for editing
const localClasses = ref('');
const localProperties = ref<Record<string, string>>({});

// Watch for selection changes
watch(
  selectedElement,
  (newElement) => {
    if (newElement) {
      localClasses.value = newElement.classes;
      localProperties.value = { ...newElement.properties };
    } else {
      localClasses.value = '';
      localProperties.value = {};
    }
  },
  { immediate: true }
);

const updateClasses = () => {
  if (selectedElement.value) {
    updateElement(selectedElement.value.id, { classes: localClasses.value });
  }
};

const updateProperty = (key: string, value: string) => {
  if (selectedElement.value) {
    const updatedProperties = {
      ...selectedElement.value.properties,
      [key]: value,
    };
    updateElement(selectedElement.value.id, { properties: updatedProperties });
    localProperties.value = updatedProperties;
  }
};

const getPropertyFields = () => {
  if (!selectedElement.value) return [];

  const definition = getComponentDefinition(selectedElement.value.type);
  if (!definition) return [];

  const fields: { key: string; label: string; type: string }[] = [];

  // Add type-specific property fields
  switch (selectedElement.value.type) {
    case 'button':
    case 'heading':
    case 'text':
      fields.push({ key: 'text', label: 'Text', type: 'text' });
      break;
    case 'image':
      fields.push(
        { key: 'src', label: 'Source URL', type: 'text' },
        { key: 'alt', label: 'Alt Text', type: 'text' }
      );
      break;
    case 'input':
      fields.push(
        { key: 'type', label: 'Input Type', type: 'select' },
        { key: 'placeholder', label: 'Placeholder', type: 'text' }
      );
      break;
    case 'textarea':
      fields.push(
        { key: 'placeholder', label: 'Placeholder', type: 'text' },
        { key: 'rows', label: 'Rows', type: 'number' }
      );
      break;
    case 'select':
      fields.push({
        key: 'options',
        label: 'Options (comma-separated)',
        type: 'text',
      });
      break;
  }

  if (selectedElement.value.type === 'heading') {
    fields.push({ key: 'level', label: 'Heading Level', type: 'select' });
  }

  return fields;
};
</script>

<template>
  <div class="p-4">
    <h3 class="text-lg font-semibold mb-4 text-white">Properties</h3>

    <div v-if="selectedElement" class="space-y-4">
      <!-- Element Type -->
      <div>
        <label class="block text-sm font-medium text-gray-300 mb-2">
          Element Type
        </label>
        <div class="px-3 py-2 bg-gray-700 rounded text-white text-sm">
          {{ selectedElement.type }}
        </div>
      </div>

      <!-- Tailwind Classes -->
      <div>
        <label class="block text-sm font-medium text-gray-300 mb-2">
          Tailwind Classes
        </label>
        <textarea
          v-model="localClasses"
          class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
          rows="4"
          placeholder="Enter Tailwind classes..."
          @blur="updateClasses"
        />
      </div>

      <!-- Element-specific properties -->
      <div v-for="field in getPropertyFields()" :key="field.key">
        <label class="block text-sm font-medium text-gray-300 mb-2">
          {{ field.label }}
        </label>

        <!-- Text input -->
        <input
          v-if="field.type === 'text'"
          :value="localProperties[field.key] || ''"
          class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          @input="
            updateProperty(field.key, ($event.target as HTMLInputElement).value)
          "
        />

        <!-- Number input -->
        <input
          v-else-if="field.type === 'number'"
          type="number"
          :value="localProperties[field.key] || ''"
          class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          @input="
            updateProperty(field.key, ($event.target as HTMLInputElement).value)
          "
        />

        <!-- Select for heading level -->
        <select
          v-else-if="field.type === 'select' && field.key === 'level'"
          :value="localProperties[field.key] || 'h1'"
          class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          @change="
            updateProperty(
              field.key,
              ($event.target as HTMLSelectElement).value
            )
          "
        >
          <option value="h1">H1</option>
          <option value="h2">H2</option>
          <option value="h3">H3</option>
          <option value="h4">H4</option>
          <option value="h5">H5</option>
          <option value="h6">H6</option>
        </select>

        <!-- Select for input type -->
        <select
          v-else-if="field.type === 'select' && field.key === 'type'"
          :value="localProperties[field.key] || 'text'"
          class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          @change="
            updateProperty(
              field.key,
              ($event.target as HTMLSelectElement).value
            )
          "
        >
          <option value="text">Text</option>
          <option value="email">Email</option>
          <option value="password">Password</option>
          <option value="number">Number</option>
          <option value="tel">Tel</option>
          <option value="url">URL</option>
        </select>
      </div>
    </div>

    <div v-else class="text-gray-400 text-center py-8">
      <p class="text-sm">No element selected</p>
      <p class="text-xs mt-2">
        Click an element on the canvas to edit its properties
      </p>
    </div>
  </div>
</template>
