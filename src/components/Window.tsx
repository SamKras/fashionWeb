import { motion } from 'framer-motion';
import { X, Minus, Square } from 'lucide-react';
import { WindowState } from '../types';
import { useRef } from 'react';

interface WindowProps {
  window: WindowState;
  children: React.ReactNode;
  onClose: (windowId: string) => void;
  onMinimize: (windowId: string) => void;
  onBringToFront: (windowId: string) => void;
  onUpdate: (windowId: string, updates: Partial<WindowState>) => void;
}

function Window({ window: win, children, onClose, onMinimize, onBringToFront, onUpdate }: WindowProps) {
  const windowRef = useRef<HTMLDivElement>(null);

  // Теперь мы берем ФИНАЛЬНЫЕ координаты из события, а не прибавляем offset
  const handleDragEnd = (event: any, info: any) => {
    onUpdate(win.id, {
      position: {
        x: win.position.x + info.offset.x,
        y: win.position.y + info.offset.y,
      },
    });
  };

  return (
    <motion.div
      ref={windowRef}
      drag
      dragMomentum={false} // КЛЮЧЕВОЕ: отключает инерцию (окно не улетает)
      dragElastic={0}     // Отключает "резиновый" эффект у границ
      onDragStart={() => onBringToFront(win.id)}
      onDragEnd={handleDragEnd}
      className="absolute bg-gray-200 shadow-2xl flex flex-col overflow-hidden select-none"
      style={{
        left: win.position.x,
        top: win.position.y,
        width: win.size.width,
        height: win.size.height,
        zIndex: win.zIndex,
        border: '2px solid',
        borderColor: '#0831d9',
      }}
      initial={false} // Отключаем анимацию появления при каждом перетаскивании
    >
      {/* СИНЯЯ ПОЛОСКА (ЗАГОЛОВОК) */}
      <div
        className="h-8 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 flex items-center justify-between px-2 cursor-move border-b-2 border-blue-900 shrink-0"
        style={{
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3)',
        }}
      >
        <div className="flex items-center gap-2 pointer-events-none">
          <div className="w-4 h-4 bg-blue-400 border border-blue-800 flex items-center justify-center text-xs">
            📁
          </div>
          <span className="text-white font-bold text-sm">{win.title}</span>
        </div>

        <div className="flex gap-1">
          <button
            onPointerDown={(e) => e.stopPropagation()} 
            onClick={() => onMinimize(win.id)}
            className="w-6 h-6 bg-gray-300 hover:bg-gray-400 border-2 border-white flex items-center justify-center"
          >
            <Minus size={12} className="text-black" />
          </button>

          <button
            onPointerDown={(e) => e.stopPropagation()}
            className="w-6 h-6 bg-gray-300 hover:bg-gray-400 border-2 border-white flex items-center justify-center"
          >
            <Square size={10} className="text-black" />
          </button>

          <button
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => onClose(win.id)}
            className="w-6 h-6 bg-red-600 hover:bg-red-700 border-2 border-white flex items-center justify-center text-white"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* КОНТЕНТ ПАПКИ */}
      <div
        className="flex-1 overflow-auto bg-white"
        onPointerDown={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </motion.div>
  );
}

export default Window;