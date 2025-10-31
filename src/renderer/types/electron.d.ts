// Type definitions for Electron API exposed via preload
export interface ElectronAPI {
  versions: {
    node: () => string;
    chrome: () => string;
    electron: () => string;
  };
}

declare global {
  interface Window {
    electron: ElectronAPI;
  }
}
