export interface FolderData {
  id: string;
  name: string;
  icon: string;
  position: { x: number; y: number };
}

export interface FolderPosition {
  [key: string]: { x: number; y: number };
}

export interface WindowState {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
}
