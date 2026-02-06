import { useState, useEffect } from 'react';
import FolderIcon from './FolderIcon';
import Window from './Window';
import Taskbar from './Taskbar';
import BSOD from './BSOD';
import PasswordDialog from './PasswordDialog';
import { FolderData, WindowState, FolderPosition } from '../types';
import LookbookContent from './contents/LookbookContent';
import EditorialsContent from './contents/EditorialsContent';
import AIModelsContent from './contents/AIModelsContent';
import ContactsContent from './contents/ContactsContent';

const folderNames: FolderData[] = [
  { id: 'lookbook', name: 'Lookbook', icon: '📁', position: { x: 20, y: 20 } },
  { id: 'editorials', name: 'Editorials', icon: '📁', position: { x: 20, y: 120 } },
  { id: 'ai-models', name: 'AI-models', icon: '📁', position: { x: 20, y: 220 } },
  { id: 'contacts', name: 'Contacts', icon: '📁', position: { x: 20, y: 320 } },
];

const getRandomPosition = () => ({
  x: Math.random() * (window.innerWidth - 150),
  y: Math.random() * (window.innerHeight - 250),
});

function Desktop() {
  const [folders, setFolders] = useState<FolderData[]>([]);
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [showBSOD, setShowBSOD] = useState(false);
  const [maxZIndex, setMaxZIndex] = useState(100);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [passwordAttempts, setPasswordAttempts] = useState(0);
  const [pendingFolderId, setPendingFolderId] = useState<string | null>(null);

  useEffect(() => {
    const randomFolders = folderNames.map(folder => ({
      ...folder,
      position: getRandomPosition(),
    }));
    setFolders(randomFolders);
  }, []);

  const handlePasswordSubmit = (password: string) => {
    if (password === '1234') {
      setShowPasswordDialog(false);
      setPasswordAttempts(0);
      if (pendingFolderId) {
        openFolderWindow(pendingFolderId);
      }
    } else {
      const newAttempts = passwordAttempts + 1;
      setPasswordAttempts(newAttempts);
      if (newAttempts >= 3) {
        setShowBSOD(true);
        setShowPasswordDialog(false);
      }
    }
  };

  const openFolderWindow = (folderId: string) => {
    const existingWindow = windows.find(w => w.id === folderId);

    if (existingWindow) {
      if (existingWindow.isMinimized) {
        setWindows(windows.map(w =>
          w.id === folderId
            ? { ...w, isMinimized: false, zIndex: maxZIndex + 1 }
            : w
        ));
        setMaxZIndex(maxZIndex + 1);
      } else {
        setWindows(windows.map(w =>
          w.id === folderId
            ? { ...w, zIndex: maxZIndex + 1 }
            : w
        ));
        setMaxZIndex(maxZIndex + 1);
      }
    } else {
      const newWindow: WindowState = {
        id: folderId,
        title: folders.find(f => f.id === folderId)?.name || '',
        isOpen: true,
        isMinimized: false,
        position: { x: 100 + windows.length * 30, y: 80 + windows.length * 30 },
        size: { width: 800, height: 600 },
        zIndex: maxZIndex + 1,
      };
      setWindows([...windows, newWindow]);
      setMaxZIndex(maxZIndex + 1);
    }
  };

  const handleFolderClick = (folderId: string) => {
    if (Math.random() < 0.01) {
      setShowBSOD(true);
      return;
    }

    if (folderId === 'ai-models') {
      setShowPasswordDialog(true);
      setPendingFolderId(folderId);
      return;
    }

    openFolderWindow(folderId);
  };

  const handleCloseWindow = (windowId: string) => {
    setWindows(windows.filter(w => w.id !== windowId));
  };

  const handleMinimizeWindow = (windowId: string) => {
    setWindows(windows.map(w =>
      w.id === windowId ? { ...w, isMinimized: true } : w
    ));
  };

  const handleBringToFront = (windowId: string) => {
    setWindows(windows.map(w =>
      w.id === windowId ? { ...w, zIndex: maxZIndex + 1 } : w
    ));
    setMaxZIndex(maxZIndex + 1);
  };

  const handleUpdateWindow = (windowId: string, updates: Partial<WindowState>) => {
    setWindows(windows.map(w =>
      w.id === windowId ? { ...w, ...updates } : w
    ));
  };

  const handleBSODRestart = () => {
    setShowBSOD(false);
    setWindows([]);
    setPasswordAttempts(0);
    setShowPasswordDialog(false);
  };

  const handleFolderDrag = (folderId: string, x: number, y: number) => {
    setFolders(folders.map(f =>
      f.id === folderId
        ? { ...f, position: { x: Math.max(0, x), y: Math.max(0, y) } }
        : f
    ));
  };

  const getWindowContent = (windowId: string) => {
    switch (windowId) {
      case 'lookbook':
        return <LookbookContent />;
      case 'editorials':
        return <EditorialsContent />;
      case 'ai-models':
        return <AIModelsContent />;
      case 'contacts':
        return <ContactsContent />;
      default:
        return null;
    }
  };

  if (showBSOD) {
    return <BSOD onRestart={handleBSODRestart} />;
  }

  return (
    <div
      className="h-screen w-screen bg-cover bg-center relative overflow-hidden"
      style={{
        backgroundImage: 'url("https://images.pexels.com/photos/3280130/pexels-photo-3280130.jpeg?auto=compress&cs=tinysrgb&w=2000&h=2000&fit=crop")',
        fontFamily: '"MS Sans Serif", "Pixelify Sans", monospace',
        imageRendering: 'pixelated',
        filter: 'pixelate(8px)',
        WebkitFilter: 'pixelate(8px)',
      }}
    >
      {showPasswordDialog && (
        <PasswordDialog
          onSubmit={handlePasswordSubmit}
          onCancel={() => {
            setShowPasswordDialog(false);
            setPendingFolderId(null);
          }}
          failedAttempts={passwordAttempts}
        />
      )}
      {folders.map(folder => (
        <FolderIcon
          key={folder.id}
          folder={folder}
          onClick={handleFolderClick}
          onDragEnd={handleFolderDrag}
        />
      ))}

      {windows.map(window => (
        !window.isMinimized && (
          <Window
            key={window.id}
            window={window}
            onClose={handleCloseWindow}
            onMinimize={handleMinimizeWindow}
            onBringToFront={handleBringToFront}
            onUpdate={handleUpdateWindow}
          >
            {getWindowContent(window.id)}
          </Window>
        )
      ))}

      <Taskbar
        windows={windows}
        onWindowClick={handleFolderClick}
      />
    </div>
  );
}

export default Desktop;
