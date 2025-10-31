<script setup lang="ts">
import { computed } from 'vue';
import { useProject } from '../../composables/useProject';
import type { ElementNode } from '../../types/project';

interface Props {
  element: ElementNode;
  isRoot?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isRoot: false,
});

const { selectedElement, selectElement, removeElement } = useProject();

const isSelected = computed(
  () => selectedElement.value?.id === props.element.id
);

const handleClick = (event: MouseEvent) => {
  event.stopPropagation();
  selectElement(props.element);
};

const handleDelete = (event: MouseEvent) => {
  event.stopPropagation();
  if (!props.isRoot) {
    removeElement(props.element.id);
  }
};

const renderElement = computed(() => {
  const { type, properties } = props.element;

  switch (type) {
    case 'container':
    case 'row':
    case 'column':
      return 'div';
    case 'button':
      return 'button';
    case 'heading':
      return properties.level || 'h1';
    case 'text':
      return 'p';
    case 'image':
      return 'img';
    case 'input':
      return 'input';
    case 'textarea':
      return 'textarea';
    case 'select':
      return 'select';
    default:
      return 'div';
  }
});

const elementProps = computed(() => {
  const { type, properties } = props.element;
  const attrs: Record<string, string> = {};

  if (type === 'image') {
    attrs.src = properties.src || '';
    attrs.alt = properties.alt || '';
  } else if (type === 'input') {
    attrs.type = properties.type || 'text';
    attrs.placeholder = properties.placeholder || '';
  } else if (type === 'textarea') {
    attrs.placeholder = properties.placeholder || '';
    attrs.rows = properties.rows || '4';
  }

  return attrs;
});

const hasChildren = computed(() => {
  return ['container', 'row', 'column'].includes(props.element.type);
});

const textContent = computed(() => {
  const { type, properties } = props.element;
  if (['button', 'heading', 'text'].includes(type)) {
    return properties.text || '';
  }
  return null;
});
</script>

<template>
  <component
    :is="renderElement"
    :class="[
      element.classes,
      {
        'outline outline-2 outline-blue-500 outline-offset-2':
          isSelected && !isRoot,
        'relative group': !isRoot,
      },
    ]"
    v-bind="elementProps"
    @click="handleClick"
  >
    <!-- Delete button for selected non-root elements -->
    <button
      v-if="isSelected && !isRoot"
      class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 z-10"
      title="Delete element"
      @click="handleDelete"
    >
      ×
    </button>

    <!-- Text content for text-based elements -->
    <template v-if="textContent">
      {{ textContent }}
    </template>

    <!-- Render children for container elements -->
    <template v-if="hasChildren">
      <CanvasElement
        v-for="child in element.children"
        :key="child.id"
        :element="child"
      />
    </template>

    <!-- Render select options -->
    <template v-if="element.type === 'select'">
      <option
        v-for="(option, index) in (element.properties.options || '').split(',')"
        :key="index"
        :value="option.trim()"
      >
        {{ option.trim() }}
      </option>
    </template>
  </component>
</template>
