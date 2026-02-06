import { motion } from 'framer-motion';
import { X, Minus, Square } from 'lucide-react';
import { WindowState } from '../types';
import { useRef, useState } from 'react';

interface WindowProps {
  window: WindowState;
  children: React.ReactNode;
  onClose: (windowId: string) => void;
  onMinimize: (windowId: string) => void;
  onBringToFront: (windowId: string) => void;
  onUpdate: (windowId: string, updates: Partial<WindowState>) => void;
}

function Window({ window, children, onClose, onMinimize, onBringToFront, onUpdate }: WindowProps) {
  const windowRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);

  const handleDragStart = () => {
    setIsDragging(true);
    onBringToFront(window.id);
  };

  const handleDragEnd = (event: any, info: any) => {
    setIsDragging(false);
    onUpdate(window.id, {
      position: {
        x: window.position.x + info.offset.x,
        y: window.position.y + info.offset.y,
      },
    });
  };

  const handleResizeStart = () => {
    setIsResizing(true);
    onBringToFront(window.id);
  };

  const handleResize = (event: any, info: any) => {
    const newWidth = Math.max(400, window.size.width + info.offset.x);
    const newHeight = Math.max(300, window.size.height + info.offset.y);

    onUpdate(window.id, {
      size: { width: newWidth, height: newHeight },
    });
  };

  return (
    <motion.div
      ref={windowRef}
      className="absolute bg-gray-200 shadow-2xl"
      style={{
        left: window.position.x,
        top: window.position.y,
        width: window.size.width,
        height: window.size.height,
        zIndex: window.zIndex,
        border: '2px solid',
        borderColor: '#0831d9',
      }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      <motion.div
        className="h-8 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 flex items-center justify-between px-2 cursor-move border-b-2 border-blue-900"
        drag
        dragMomentum={false}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        dragElastic={0}
        style={{
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3)',
        }}
      >
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-400 border border-blue-800 flex items-center justify-center text-xs">
            📁
          </div>
          <span className="text-white font-bold text-sm">{window.title}</span>
        </div>

        <div className="flex gap-1">
          <button
            onClick={() => onMinimize(window.id)}
            className="w-6 h-6 bg-gray-300 hover:bg-gray-400 border-2 border-white flex items-center justify-center"
            style={{
              boxShadow: 'inset 0 0 0 1px #000, 1px 1px 0 rgba(0,0,0,0.3)',
            }}
          >
            <Minus size={12} className="text-black" />
          </button>

          <button
            className="w-6 h-6 bg-gray-300 hover:bg-gray-400 border-2 border-white flex items-center justify-center"
            style={{
              boxShadow: 'inset 0 0 0 1px #000, 1px 1px 0 rgba(0,0,0,0.3)',
            }}
          >
            <Square size={10} className="text-black" />
          </button>

          <button
            onClick={() => onClose(window.id)}
            className="w-6 h-6 bg-red-600 hover:bg-red-700 border-2 border-white flex items-center justify-center"
            style={{
              boxShadow: 'inset 0 0 0 1px #000, 1px 1px 0 rgba(0,0,0,0.3)',
            }}
          >
            <X size={14} className="text-white" />
          </button>
        </div>
      </motion.div>

      <div
        className="overflow-auto bg-white h-full"
        style={{
          height: `calc(${window.size.height}px - 32px)`,
        }}
        onClick={() => onBringToFront(window.id)}
      >
        {children}
      </div>

      <motion.div
        className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
        style={{
          background: 'linear-gradient(135deg, transparent 50%, #666 50%)',
        }}
        drag
        dragMomentum={false}
        dragElastic={0}
        onDragStart={handleResizeStart}
        onDrag={handleResize}
        onDragEnd={() => setIsResizing(false)}
      />
    </motion.div>
  );
}

export default Window;
