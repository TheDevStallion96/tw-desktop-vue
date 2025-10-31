<script setup lang="ts">
import { ref } from 'vue';

interface Project {
  id: number;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'pending';
  progress: number;
}

const projects = ref<Project[]>([
  {
    id: 1,
    name: 'Website Redesign',
    description: 'Complete overhaul of company website',
    status: 'active',
    progress: 65,
  },
  {
    id: 2,
    name: 'Mobile App',
    description: 'iOS and Android application',
    status: 'active',
    progress: 40,
  },
  {
    id: 3,
    name: 'API Integration',
    description: 'Third-party service integration',
    status: 'pending',
    progress: 10,
  },
  {
    id: 4,
    name: 'Documentation',
    description: 'Update technical documentation',
    status: 'completed',
    progress: 100,
  },
]);

const getStatusColor = (status: Project['status']) => {
  switch (status) {
    case 'active':
      return 'text-green-500';
    case 'completed':
      return 'text-blue-500';
    case 'pending':
      return 'text-yellow-500';
  }
};

const getProgressColor = (progress: number) => {
  if (progress >= 75) return 'bg-green-500';
  if (progress >= 50) return 'bg-blue-500';
  if (progress >= 25) return 'bg-yellow-500';
  return 'bg-gray-500';
};
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold">Projects</h1>
      <button
        class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm font-medium transition-colors"
      >
        + New Project
      </button>
    </div>

    <div class="grid gap-4">
      <div
        v-for="project in projects"
        :key="project.id"
        class="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-colors"
      >
        <div class="flex justify-between items-start mb-3">
          <div>
            <h3 class="text-lg font-semibold">
              {{ project.name }}
            </h3>
            <p class="text-sm text-gray-400 mt-1">
              {{ project.description }}
            </p>
          </div>
          <span
            :class="[
              'text-xs font-medium px-2 py-1 rounded',
              getStatusColor(project.status),
            ]"
            class="bg-gray-900"
          >
            {{ project.status }}
          </span>
        </div>

        <div class="mt-4">
          <div class="flex justify-between text-sm mb-2">
            <span class="text-gray-400">Progress</span>
            <span class="font-medium">{{ project.progress }}%</span>
          </div>
          <div class="w-full bg-gray-700 rounded-full h-2">
            <div
              :class="getProgressColor(project.progress)"
              :style="{ width: `${project.progress}%` }"
              class="h-2 rounded-full transition-all"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
