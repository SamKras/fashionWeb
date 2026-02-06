import { useState, useEffect } from 'react';
import FolderIcon from './FolderIcon';
import Window from './Window';
import Taskbar from './Taskbar';
import BSOD from './BSOD';
import PasswordDialog from './PasswordDialog';
import { FolderData, WindowState } from '../types';

// Импорты контента
import LookbookContent from './contents/LookbookContent';
import EditorialsContent from './contents/EditorialsContent';
import AIModelsContent from './contents/AIModelsContent';
import ContactsContent from './contents/ContactsContent';
import ServicesGameContent from './contents/ServicesGameContent';

const folderNames: FolderData[] = [
  { id: 'lookbook', name: 'Lookbook', icon: '📁', position: { x: 20, y: 20 } },
  { id: 'editorials', name: 'Editorials', icon: '📁', position: { x: 20, y: 120 } },
  { id: 'ai-models', name: 'AI-models', icon: '📁', position: { x: 20, y: 220 } },
  { id: 'contacts', name: 'Contacts', icon: '📁', position: { x: 20, y: 320 } },
  { id: 'services', name: 'SERVICES AND PRICES', icon: '💾', position: { x: 140, y: 120 } }, 
  { id: 'password-file', name: 'AI Models Password.txt', icon: '📄', position: { x: 140, y: 20 } },
];

const getRandomPosition = () => {
  const isMobile = window.innerWidth < 600;
  return {
    x: Math.random() * (window.innerWidth - (isMobile ? 100 : 150)),
    y: Math.random() * (window.innerHeight - (isMobile ? 200 : 250)),
  };
};

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
      setWindows(windows.map(w =>
        w.id === folderId
          ? { ...w, isMinimized: false, zIndex: maxZIndex + 1 }
          : w
      ));
      setMaxZIndex(prev => prev + 1);
    } else {
      const folderInfo = folderNames.find(f => f.id === folderId);
      const isMobile = window.innerWidth < 600;

      const newWindow: WindowState = {
        id: folderId,
        title: folderInfo?.name || '',
        isOpen: true,
        isMinimized: false,
        position: isMobile 
          ? { x: 5, y: 45 } 
          : { x: 100 + (windows.length * 20), y: 80 + (windows.length * 20) },
        size: isMobile 
          ? { width: window.innerWidth - 10, height: window.innerHeight - 110 }
          : (folderId === 'password-file' ? { width: 350, height: 250 } : { width: 800, height: 600 }),
        zIndex: maxZIndex + 1,
      };
      setWindows([...windows, newWindow]);
      setMaxZIndex(prev => prev + 1);
    }
  };

  const handleFolderClick = (folderId: string) => {
    if (Math.random() < 0.005) {
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
    setWindows(prev => prev.filter(w => w.id !== windowId));
  };

  const handleMinimizeWindow = (windowId: string) => {
    setWindows(prev => prev.map(w =>
      w.id === windowId ? { ...w, isMinimized: true } : w
    ));
  };

  const handleBringToFront = (windowId: string) => {
    setWindows(prev => prev.map(w =>
      w.id === windowId ? { ...w, zIndex: maxZIndex + 1 } : w
    ));
    setMaxZIndex(prev => prev + 1);
  };

  const handleUpdateWindow = (windowId: string, updates: Partial<WindowState>) => {
    setWindows(prev => prev.map(w => {
      if (w.id === windowId) {
        const updated = { ...w, ...updates };
        if (updates.position) {
          updated.position = {
            x: Math.max(0, Math.min(updates.position.x, window.innerWidth - (updated.size?.width || 50))),
            y: Math.max(0, Math.min(updates.position.y, window.innerHeight - (updated.size?.height || 50) - 48))
          };
        }
        return updated;
      }
      return w;
    }));
  };

  const handleBSODRestart = () => {
    setShowBSOD(false);
    setWindows([]);
    setPasswordAttempts(0);
    setShowPasswordDialog(false);
  };

  const handleFolderDrag = (folderId: string, x: number, y: number) => {
    setFolders(prev => prev.map(f =>
      f.id === folderId
        ? { ...f, position: { x: Math.max(0, x), y: Math.max(0, y) } }
        : f
    ));
  };

  const getWindowContent = (windowId: string) => {
    switch (windowId) {
      case 'lookbook': return <LookbookContent />;
      case 'editorials': return <EditorialsContent />;
      case 'ai-models': return <AIModelsContent />;
      case 'contacts': return <ContactsContent />;
      // ПЕРЕДАЕМ onTriggerBSOD В КОМПОНЕНТ ИГРЫ
      case 'services': return <ServicesGameContent onTriggerBSOD={() => setShowBSOD(true)} />; 
      case 'password-file': return (
        <div className="p-4 bg-white font-mono text-black h-full select-text cursor-text overflow-y-auto">
          <div className="border-b-2 border-gray-200 mb-4 pb-2 text-[10px] text-gray-400 uppercase tracking-widest">
            I.AI System Notepad v1.0
          </div>
          <p className="text-lg font-bold">PASSWORD: 1234</p>
          <div className="mt-12 text-[9px] text-gray-400 leading-tight">
            --- INTERNAL USE ONLY ---<br />
            This file contains sensitive credentials.<br />
            Unauthorized access is prohibited.
          </div>
        </div>
      );
      default: return null;
    }
  };

  if (showBSOD) return <BSOD onRestart={handleBSODRestart} />;

  return (
    <div
      className="h-screen w-screen bg-cover bg-center relative overflow-hidden select-none"
      style={{
        backgroundImage: 'url("./BG1.png")',
        fontFamily: '"MS Sans Serif", "Pixelify Sans", monospace',
        imageRendering: 'pixelated',
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
        <div 
          key={window.id} 
          style={{ 
            display: window.isMinimized ? 'none' : 'block',
            zIndex: window.zIndex 
          }}
        >
          <Window
            window={window}
            onClose={handleCloseWindow}
            onMinimize={handleMinimizeWindow}
            onBringToFront={handleBringToFront}
            onUpdate={handleUpdateWindow}
          >
            {getWindowContent(window.id)}
          </Window>
        </div>
      ))}

      <Taskbar
        windows={windows}
        onWindowClick={(id) => {
          const win = windows.find(w => w.id === id);
          if (win?.isMinimized) {
            openFolderWindow(id);
          } else {
            handleBringToFront(id);
          }
        }}
      />
    </div>
  );
}

export default Desktop;