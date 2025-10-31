import { ref, computed } from 'vue';
import type { Project, ElementNode, Breakpoint } from '../types/project';

const currentProject = ref<Project | null>(null);
const selectedElement = ref<ElementNode | null>(null);
const currentBreakpoint = ref<Breakpoint>('desktop');
const isDirty = ref(false);

// Helper to generate UUIDs
const generateId = () => {
  return window.crypto.randomUUID();
};

export function useProject() {
  const createNewProject = (
    name: string,
    description: string = ''
  ): Project => {
    const project: Project = {
      id: generateId(),
      name,
      description,
      rootElement: {
        id: generateId(),
        type: 'container',
        classes: 'w-full min-h-screen bg-white p-4',
        children: [],
        properties: {},
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    currentProject.value = project;
    isDirty.value = false;
    return project;
  };

  const loadProject = (project: Project) => {
    currentProject.value = project;
    selectedElement.value = null;
    isDirty.value = false;
  };

  const saveProject = (): Project | null => {
    if (!currentProject.value) return null;

    currentProject.value.updatedAt = new Date().toISOString();
    isDirty.value = false;
    return currentProject.value;
  };

  const exportProjectJSON = (): string | null => {
    if (!currentProject.value) return null;
    return JSON.stringify(currentProject.value, null, 2);
  };

  const importProjectJSON = (json: string): boolean => {
    try {
      const project = JSON.parse(json) as Project;
      loadProject(project);
      return true;
    } catch (error) {
      console.error('Failed to import project:', error);
      return false;
    }
  };

  const addElement = (element: ElementNode, parentId?: string) => {
    if (!currentProject.value) return;

    if (!parentId) {
      currentProject.value.rootElement.children.push(element);
    } else {
      const parent = findElementById(
        currentProject.value.rootElement,
        parentId
      );
      if (parent) {
        parent.children.push(element);
      }
    }

    isDirty.value = true;
  };

  const removeElement = (elementId: string) => {
    if (!currentProject.value) return;

    removeElementFromTree(currentProject.value.rootElement, elementId);
    if (selectedElement.value?.id === elementId) {
      selectedElement.value = null;
    }
    isDirty.value = true;
  };

  const updateElement = (elementId: string, updates: Partial<ElementNode>) => {
    if (!currentProject.value) return;

    const element = findElementById(
      currentProject.value.rootElement,
      elementId
    );
    if (element) {
      Object.assign(element, updates);
      isDirty.value = true;
    }
  };

  const updateProject = (updates: Partial<Project>) => {
    if (!currentProject.value) return;

    Object.assign(currentProject.value, updates);
    currentProject.value.updatedAt = new Date().toISOString();
    isDirty.value = true;
  };

  const selectElement = (element: ElementNode | null) => {
    selectedElement.value = element;
  };

  const setBreakpoint = (breakpoint: Breakpoint) => {
    currentBreakpoint.value = breakpoint;
  };

  // Helper functions
  const findElementById = (
    node: ElementNode,
    id: string
  ): ElementNode | null => {
    if (node.id === id) return node;

    for (const child of node.children) {
      const found = findElementById(child, id);
      if (found) return found;
    }

    return null;
  };

  const removeElementFromTree = (node: ElementNode, id: string): boolean => {
    const index = node.children.findIndex((child) => child.id === id);
    if (index !== -1) {
      node.children.splice(index, 1);
      return true;
    }

    for (const child of node.children) {
      if (removeElementFromTree(child, id)) return true;
    }

    return false;
  };

  return {
    currentProject: computed(() => currentProject.value),
    selectedElement: computed(() => selectedElement.value),
    currentBreakpoint: computed(() => currentBreakpoint.value),
    isDirty: computed(() => isDirty.value),
    createNewProject,
    loadProject,
    saveProject,
    exportProjectJSON,
    importProjectJSON,
    addElement,
    removeElement,
    updateElement,
    updateProject,
    selectElement,
    setBreakpoint,
  };
}
