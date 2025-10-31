import type { ComponentDefinition } from '../types/project';

export const componentDefinitions: ComponentDefinition[] = [
  {
    type: 'container',
    label: 'Container',
    icon: '📦',
    defaultClasses: 'container mx-auto px-4',
    defaultProperties: {},
    canHaveChildren: true,
  },
  {
    type: 'row',
    label: 'Row (Flex)',
    icon: '➡️',
    defaultClasses: 'flex flex-row gap-4',
    defaultProperties: {},
    canHaveChildren: true,
  },
  {
    type: 'column',
    label: 'Column',
    icon: '⬇️',
    defaultClasses: 'flex flex-col gap-4',
    defaultProperties: {},
    canHaveChildren: true,
  },
  {
    type: 'button',
    label: 'Button',
    icon: '🔘',
    defaultClasses:
      'px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700',
    defaultProperties: { text: 'Button' },
    canHaveChildren: false,
  },
  {
    type: 'heading',
    label: 'Heading',
    icon: '🔤',
    defaultClasses: 'text-3xl font-bold text-gray-900',
    defaultProperties: { text: 'Heading', level: 'h1' },
    canHaveChildren: false,
  },
  {
    type: 'text',
    label: 'Text',
    icon: '📝',
    defaultClasses: 'text-base text-gray-700',
    defaultProperties: { text: 'Lorem ipsum dolor sit amet.' },
    canHaveChildren: false,
  },
  {
    type: 'image',
    label: 'Image',
    icon: '🖼️',
    defaultClasses: 'w-full h-64 object-cover rounded',
    defaultProperties: {
      src: 'https://via.placeholder.com/400x300',
      alt: 'Placeholder image',
    },
    canHaveChildren: false,
  },
  {
    type: 'input',
    label: 'Input',
    icon: '✏️',
    defaultClasses:
      'px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500',
    defaultProperties: { type: 'text', placeholder: 'Enter text...' },
    canHaveChildren: false,
  },
  {
    type: 'textarea',
    label: 'Textarea',
    icon: '📄',
    defaultClasses:
      'px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 w-full',
    defaultProperties: { placeholder: 'Enter text...', rows: '4' },
    canHaveChildren: false,
  },
  {
    type: 'select',
    label: 'Select',
    icon: '📋',
    defaultClasses:
      'px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500',
    defaultProperties: { options: 'Option 1,Option 2,Option 3' },
    canHaveChildren: false,
  },
];

export const getComponentDefinition = (
  type: string
): ComponentDefinition | undefined => {
  return componentDefinitions.find((def) => def.type === type);
};
