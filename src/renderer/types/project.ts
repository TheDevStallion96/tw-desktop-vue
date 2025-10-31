// Core types for Tailwind Studio project structure

export type ElementType =
  | 'container'
  | 'row'
  | 'column'
  | 'button'
  | 'text'
  | 'heading'
  | 'image'
  | 'input'
  | 'textarea'
  | 'select';

export type Breakpoint = 'mobile' | 'tablet' | 'desktop';

export interface ElementNode {
  id: string;
  type: ElementType;
  classes: string;
  children: ElementNode[];
  properties: Record<string, string>; // text, href, alt, placeholder, etc.
}

export interface Project {
  id: string;
  name: string;
  description: string;
  rootElement: ElementNode;
  tailwindConfig?: string; // Optional Tailwind config JSON
  createdAt: string;
  updatedAt: string;
}

export interface ComponentDefinition {
  type: ElementType;
  label: string;
  icon: string;
  defaultClasses: string;
  defaultProperties: Record<string, string>;
  canHaveChildren: boolean;
}
