import { useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { FolderData } from '../types';

interface FolderIconProps {
  folder: FolderData;
  onClick: (id: string) => void;
  onDragEnd: (id: string, x: number, y: number) => void;
}

function FolderIcon({ folder, onClick, onDragEnd }: FolderIconProps) {
  const nodeRef = useRef(null);
  const startPos = useRef({ x: 0, y: 0 });
  const [displayPos, setDisplayPos] = useState(folder.position);

  const handleStart = (_e: any, data: any) => {
    startPos.current = { x: data.x, y: data.y };
  };

  const handleDrag = (_e: any, data: any) => {
    const factor = 0.5; // Твой эффект замедления
    const dx = data.x - startPos.current.x;
    const dy = data.y - startPos.current.y;

    setDisplayPos({
      x: startPos.current.x + dx * factor,
      y: startPos.current.y + dy * factor
    });
  };

  const handleStop = (_e: any, data: any) => {
    const factor = 0.5;
    const dx = data.x - startPos.current.x;
    const dy = data.y - startPos.current.y;

    const finalX = startPos.current.x + dx * factor;
    const finalY = startPos.current.y + dy * factor;

    if (Math.abs(dx * factor) < 3 && Math.abs(dy * factor) < 3) {
      onClick(folder.id);
    } else {
      onDragEnd(folder.id, finalX, finalY);
    }
  };

  return (
    <Draggable
      nodeRef={nodeRef}
      position={displayPos}
      onStart={handleStart}
      onDrag={handleDrag}
      onStop={handleStop}
      bounds="parent"
    >
      <div
        ref={nodeRef}
        // УВЕЛИЧИЛИ КОНТЕЙНЕР: w-20 на мобилках, w-28 на ПК (md:w-28)
        className="absolute w-20 md:w-28 flex flex-col items-center gap-1 md:gap-2 p-2 cursor-pointer group z-10 active:z-50 select-none touch-none"
      >
        <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center relative pointer-events-none">
          {folder.id === 'password-file' || folder.icon === '📄' ? (
            /* ИКОНКА ФАЙЛА: md:w-10 md:h-14 для ПК */
            <div className="w-8 h-10 md:w-10 md:h-14 bg-white border-2 border-gray-800 shadow-[2px_2px_0_rgba(0,0,0,0.3)] md:shadow-[3px_3px_0_rgba(0,0,0,0.3)] relative">
              <div className="absolute top-0 right-0 w-2 h-2 md:w-3 md:h-3 bg-gray-200 border-l-2 border-b-2 border-gray-800" />
              <div className="mt-4 md:mt-6 px-1 space-y-1 md:space-y-2">
                <div className="h-[1px] bg-gray-400 w-full" />
                <div className="h-[1px] bg-gray-400 w-full" />
                <div className="h-[1px] bg-gray-400 w-2/3 hidden md:block" />
              </div>
            </div>
          ) : (
            /* ИКОНКА ПАПКИ: md:w-14 md:h-10 для ПК */
            <div className="w-10 h-7 md:w-14 md:h-10 bg-[#ffd700] border-2 border-gray-800 shadow-[2px_2px_0_rgba(0,0,0,0.3)] md:shadow-[3px_3px_0_rgba(0,0,0,0.3)] relative before:content-[''] before:absolute before:-top-1.5 md:before:-top-2.5 before:left-0 before:w-4 md:before:w-6 before:h-1.5 md:before:h-2.5 before:bg-[#ffd700] before:border-t-2 before:border-l-2 before:border-r-2 before:border-gray-800" />
          )}
        </div>

        {/* ТЕКСТ: text-[10px] на мобилках, text-[13px] на ПК (md:text-[13px]) */}
        <span className="text-white text-[10px] md:text-[13px] font-bold text-center leading-tight drop-shadow-[1px_1px_1px_#000] px-1 group-active:bg-blue-800 pointer-events-none">
          {folder.name}
        </span>
      </div>
    </Draggable>
  );
}

export default FolderIcon;