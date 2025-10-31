// Utility functions for handling Tailwind config

export interface TailwindConfig {
  theme?: {
    extend?: Record<string, unknown>;
    colors?: Record<string, unknown>;
    spacing?: Record<string, unknown>;
    fontSize?: Record<string, unknown>;
    fontFamily?: Record<string, unknown>;
    borderRadius?: Record<string, unknown>;
    [key: string]: unknown;
  };
  plugins?: unknown[];
  content?: string[];
  [key: string]: unknown;
}

export const parseTailwindConfig = (
  configString: string
): TailwindConfig | null => {
  try {
    // Try to parse as JSON first
    return JSON.parse(configString) as TailwindConfig;
  } catch {
    // LIMITATION: This is a simplified parser for basic JavaScript config files.
    // For complex configs with functions, requires, or advanced JavaScript features,
    // users should convert their config to JSON format before importing.
    // A production implementation should use @babel/parser or similar for robust parsing.
    try {
      // Remove any comments
      let cleaned = configString.replace(/\/\*[\s\S]*?\*\//g, '');
      cleaned = cleaned.replace(/\/\/.*/g, '');

      // Extract the object from module.exports or export default
      const exportMatch =
        cleaned.match(/module\.exports\s*=\s*(\{[\s\S]*\})/) ||
        cleaned.match(/export\s+default\s+(\{[\s\S]*\})/);

      if (exportMatch && exportMatch[1]) {
        // This is a simplified parser - for production use, consider using a proper JS parser
        // For now, we'll just try to extract basic theme configuration
        const configObj = exportMatch[1];

        // Try to parse as JSON (after some cleanup)
        const jsonLike = configObj
          .replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2":') // Quote keys
          .replace(/'/g, '"') // Replace single quotes with double
          .replace(/,(\s*[}\]])/g, '$1'); // Remove trailing commas

        return JSON.parse(jsonLike) as TailwindConfig;
      }
    } catch (innerError) {
      console.error('Failed to parse Tailwind config:', innerError);
    }
  }

  return null;
};

export const formatTailwindConfig = (config: TailwindConfig): string => {
  return JSON.stringify(config, null, 2);
};

/**
 * Extracts custom CSS class names from a Tailwind config.
 * This generates a list of available classes based on the custom theme configuration,
 * which can be used for class suggestions in the editor.
 *
 * @param config - The parsed Tailwind configuration object
 * @returns Array of CSS class names derived from the custom theme configuration
 */
export const extractCustomClasses = (config: TailwindConfig): string[] => {
  const classes: string[] = [];

  if (config.theme?.extend?.colors) {
    const colors = config.theme.extend.colors as Record<string, unknown>;
    Object.keys(colors).forEach((color) => {
      classes.push(`bg-${color}`, `text-${color}`, `border-${color}`);
    });
  }

  if (config.theme?.extend?.spacing) {
    const spacing = config.theme.extend.spacing as Record<string, unknown>;
    Object.keys(spacing).forEach((space) => {
      classes.push(`p-${space}`, `m-${space}`, `gap-${space}`);
    });
  }

  return classes;
};
