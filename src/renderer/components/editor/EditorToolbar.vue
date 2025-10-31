<script setup lang="ts">
import { ref } from 'vue';
import { useProject } from '../../composables/useProject';
import type { Breakpoint } from '../../types/project';
import { parseTailwindConfig } from '../../utils/tailwindConfig';

const {
  currentProject,
  currentBreakpoint,
  setBreakpoint,
  saveProject,
  exportProjectJSON,
  importProjectJSON,
  updateProject,
} = useProject();

const showExportModal = ref(false);
const exportFormat = ref<'html' | 'react'>('html');
const exportedCode = ref('');

const breakpoints: { value: Breakpoint; label: string; icon: string }[] = [
  { value: 'mobile', label: 'Mobile', icon: '📱' },
  { value: 'tablet', label: 'Tablet', icon: '📱' },
  { value: 'desktop', label: 'Desktop', icon: '🖥️' },
];

const handleBreakpointChange = (breakpoint: Breakpoint) => {
  setBreakpoint(breakpoint);
};

const handleSave = () => {
  saveProject();
  alert('Project saved successfully!');
};

const handleExportJSON = () => {
  const json = exportProjectJSON();
  if (!json) return;

  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${currentProject.value?.name || 'project'}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

const handleImportJSON = () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  input.onchange = (e) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const json = event.target?.result as string;
      if (importProjectJSON(json)) {
        alert('Project imported successfully!');
      } else {
        alert('Failed to import project. Invalid JSON format.');
      }
    };
    reader.readAsText(file);
  };
  input.click();
};

const handleImportTailwindConfig = () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.js,.cjs,.mjs,.json';
  input.onchange = (e) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const configString = event.target?.result as string;
      const config = parseTailwindConfig(configString);

      if (config && currentProject.value) {
        updateProject({ tailwindConfig: JSON.stringify(config) });
        alert('Tailwind config imported successfully!');
      } else {
        alert('Failed to import Tailwind config. Invalid format.');
      }
    };
    reader.readAsText(file);
  };
  input.click();
};

const generateHTMLExport = (): string => {
  if (!currentProject.value) return '';

  const generateElementHTML = (element: any, indent = 0): string => {
    const spacing = '  '.repeat(indent);
    const { type, classes, properties, children } = element;

    let html = '';
    const classAttr = classes ? ` class="${classes}"` : '';

    switch (type) {
      case 'container':
      case 'row':
      case 'column':
        html = `${spacing}<div${classAttr}>\n`;
        children.forEach((child: any) => {
          html += generateElementHTML(child, indent + 1);
        });
        html += `${spacing}</div>\n`;
        break;

      case 'button':
        html = `${spacing}<button${classAttr}>${properties.text || 'Button'}</button>\n`;
        break;

      case 'heading': {
        const level = properties.level || 'h1';
        html = `${spacing}<${level}${classAttr}>${properties.text || 'Heading'}</${level}>\n`;
        break;
      }

      case 'text':
        html = `${spacing}<p${classAttr}>${properties.text || 'Text'}</p>\n`;
        break;

      case 'image':
        html = `${spacing}<img${classAttr} src="${properties.src || ''}" alt="${properties.alt || ''}" />\n`;
        break;

      case 'input':
        html = `${spacing}<input${classAttr} type="${properties.type || 'text'}" placeholder="${properties.placeholder || ''}" />\n`;
        break;

      case 'textarea':
        html = `${spacing}<textarea${classAttr} rows="${properties.rows || '4'}" placeholder="${properties.placeholder || ''}"></textarea>\n`;
        break;

      case 'select': {
        html = `${spacing}<select${classAttr}>\n`;
        const options = (properties.options || '').split(',');
        options.forEach((option: string) => {
          html += `${spacing}  <option value="${option.trim()}">${option.trim()}</option>\n`;
        });
        html += `${spacing}</select>\n`;
        break;
      }
    }

    return html;
  };

  let htmlContent = generateElementHTML(currentProject.value.rootElement);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${currentProject.value.name}</title>
  ${'<'}script src="https://cdn.tailwindcss.com"${'><'}/script>
</head>
<body>
${htmlContent}
</body>
</html>`;
};

const generateReactExport = (): string => {
  if (!currentProject.value) return '';

  const generateComponentCode = (element: any, indent = 0): string => {
    const spacing = '  '.repeat(indent);
    const { type, classes, properties, children } = element;

    let jsx = '';
    const classAttr = classes ? ` className="${classes}"` : '';

    switch (type) {
      case 'container':
      case 'row':
      case 'column':
        jsx = `${spacing}<div${classAttr}>\n`;
        children.forEach((child: any) => {
          jsx += generateComponentCode(child, indent + 1);
        });
        jsx += `${spacing}</div>\n`;
        break;

      case 'button':
        jsx = `${spacing}<button${classAttr}>${properties.text || 'Button'}</button>\n`;
        break;

      case 'heading': {
        const level = properties.level || 'h1';
        jsx = `${spacing}<${level}${classAttr}>${properties.text || 'Heading'}</${level}>\n`;
        break;
      }

      case 'text':
        jsx = `${spacing}<p${classAttr}>${properties.text || 'Text'}</p>\n`;
        break;

      case 'image':
        jsx = `${spacing}<img${classAttr} src="${properties.src || ''}" alt="${properties.alt || ''}" />\n`;
        break;

      case 'input':
        jsx = `${spacing}<input${classAttr} type="${properties.type || 'text'}" placeholder="${properties.placeholder || ''}" />\n`;
        break;

      case 'textarea':
        jsx = `${spacing}<textarea${classAttr} rows="${properties.rows || '4'}" placeholder="${properties.placeholder || ''}"></textarea>\n`;
        break;

      case 'select': {
        jsx = `${spacing}<select${classAttr}>\n`;
        const options = (properties.options || '').split(',');
        options.forEach((option: string) => {
          jsx += `${spacing}  <option value="${option.trim()}">${option.trim()}</option>\n`;
        });
        jsx += `${spacing}</select>\n`;
        break;
      }
    }

    return jsx;
  };

  const componentName =
    currentProject.value.name.replace(/[^a-zA-Z0-9]/g, '') || 'Component';
  const jsxContent = generateComponentCode(currentProject.value.rootElement, 1);

  return `import React from 'react';

export default function ${componentName}() {
  return (
${jsxContent}  );
}`;
};

const handleExportCode = () => {
  if (exportFormat.value === 'html') {
    exportedCode.value = generateHTMLExport();
  } else {
    exportedCode.value = generateReactExport();
  }
  showExportModal.value = true;
};

const copyToClipboard = () => {
  navigator.clipboard.writeText(exportedCode.value);
  alert('Code copied to clipboard!');
};

const downloadCode = () => {
  const extension = exportFormat.value === 'html' ? 'html' : 'jsx';
  const blob = new Blob([exportedCode.value], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${currentProject.value?.name || 'component'}.${extension}`;
  a.click();
  URL.revokeObjectURL(url);
};
</script>

<template>
  <div class="bg-gray-800 border-b border-gray-700 px-4 py-3">
    <div class="flex items-center justify-between">
      <!-- Left: Project Actions -->
      <div class="flex items-center gap-2">
        <button
          class="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded text-sm font-medium transition-colors"
          @click="handleSave"
        >
          💾 Save
        </button>
        <button
          class="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded text-sm font-medium transition-colors"
          @click="handleExportJSON"
        >
          📥 Export JSON
        </button>
        <button
          class="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded text-sm font-medium transition-colors"
          @click="handleImportJSON"
        >
          📤 Import JSON
        </button>
        <button
          class="px-3 py-1.5 bg-green-600 hover:bg-green-700 rounded text-sm font-medium transition-colors"
          @click="handleExportCode"
        >
          🚀 Export Code
        </button>
        <button
          class="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 rounded text-sm font-medium transition-colors"
          title="Import tailwind.config.js"
          @click="handleImportTailwindConfig"
        >
          ⚙️ Import Config
        </button>
      </div>

      <!-- Center: Breakpoint Selector -->
      <div class="flex items-center gap-1 bg-gray-700 rounded p-1">
        <button
          v-for="bp in breakpoints"
          :key="bp.value"
          :class="[
            'px-3 py-1.5 rounded text-sm font-medium transition-colors',
            currentBreakpoint === bp.value
              ? 'bg-blue-600 text-white'
              : 'text-gray-300 hover:bg-gray-600',
          ]"
          @click="handleBreakpointChange(bp.value)"
        >
          {{ bp.icon }} {{ bp.label }}
        </button>
      </div>

      <!-- Right: Project Name -->
      <div class="text-sm text-gray-300">
        {{ currentProject?.name || 'Untitled' }}
      </div>
    </div>
  </div>

  <!-- Export Code Modal -->
  <div
    v-if="showExportModal"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    @click.self="showExportModal = false"
  >
    <div
      class="bg-gray-800 rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[80vh] flex flex-col"
    >
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold text-white">Export Code</h3>
        <button
          class="text-gray-400 hover:text-white text-2xl"
          @click="showExportModal = false"
        >
          ×
        </button>
      </div>

      <!-- Format selector -->
      <div class="flex gap-2 mb-4">
        <button
          :class="[
            'px-4 py-2 rounded text-sm font-medium transition-colors',
            exportFormat === 'html'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600',
          ]"
          @click="
            exportFormat = 'html';
            handleExportCode();
          "
        >
          HTML
        </button>
        <button
          :class="[
            'px-4 py-2 rounded text-sm font-medium transition-colors',
            exportFormat === 'react'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600',
          ]"
          @click="
            exportFormat = 'react';
            handleExportCode();
          "
        >
          React
        </button>
      </div>

      <!-- Code display -->
      <div class="flex-1 overflow-auto bg-gray-900 rounded p-4 mb-4">
        <pre class="text-sm text-gray-100 font-mono">{{ exportedCode }}</pre>
      </div>

      <!-- Actions -->
      <div class="flex gap-2">
        <button
          class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm font-medium transition-colors"
          @click="copyToClipboard"
        >
          📋 Copy to Clipboard
        </button>
        <button
          class="px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-sm font-medium transition-colors"
          @click="downloadCode"
        >
          💾 Download File
        </button>
      </div>
    </div>
  </div>
</template>
