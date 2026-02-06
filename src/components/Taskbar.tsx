import { useState, useEffect } from 'react';
import { WindowState } from '../types';

interface TaskbarProps {
  windows: WindowState[];
  onWindowClick: (windowId: string) => void;
}

interface ClockState {
  time: string;
  date: string;
}

function Taskbar({ windows, onWindowClick }: TaskbarProps) {
  const [clock, setClock] = useState<ClockState>({
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    date: new Date().toLocaleDateString([], { month: '2-digit', day: '2-digit', year: 'numeric' }),
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setClock({
        time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        date: now.toLocaleDateString([], { month: '2-digit', day: '2-digit', year: 'numeric' }),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-b from-blue-500 to-blue-600 border-t-2 border-white flex items-center px-2 gap-2 z-[9999]"
      style={{
        boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.5), 0 -2px 4px rgba(0,0,0,0.3)',
        fontFamily: '"MS Sans Serif", "Pixelify Sans", monospace',
      }}
    >
      {/* КНОПКА START С ФУНКЦИЕЙ ПЕРЕЗАГРУЗКИ */}
      <button
        onClick={() => window.location.reload()}
        className="h-9 px-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded flex items-center gap-2 border-2 border-green-800 transition-colors active:scale-95"
        style={{
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3), 2px 2px 0 rgba(0,0,0,0.3)',
        }}
      >
        <span className="text-xl">⊞</span>
        <span>Start</span>
      </button>

      <div className="flex-1 flex gap-1 overflow-x-auto no-scrollbar">
        {windows.map(window => (
          <button
            key={window.id}
            onClick={() => onWindowClick(window.id)}
            className={`h-9 px-3 text-[11px] font-bold border-2 flex items-center gap-2 transition-all ${
              window.isMinimized
                ? 'bg-blue-400 border-blue-600 opacity-70'
                : 'bg-blue-300 border-blue-700'
            }`}
            style={{
              boxShadow: window.isMinimized
                ? 'inset 1px 1px 2px rgba(0,0,0,0.3)'
                : 'inset 0 1px 0 rgba(255,255,255,0.5), 2px 2px 0 rgba(0,0,0,0.2)',
            }}
          >
            <span className="truncate max-w-[100px] md:max-w-[150px]">{window.title}</span>
          </button>
        ))}
      </div>

      <div
        className="h-9 px-3 bg-blue-400 border-2 border-blue-700 flex items-center gap-2 text-xs font-bold shrink-0"
        style={{
          boxShadow: 'inset 1px 1px 0 rgba(255,255,255,0.3), inset -1px -1px 0 rgba(0,0,0,0.3)',
        }}
      >
        <span className="hidden sm:inline">🔊</span>
        <div className="flex flex-col justify-center leading-none text-right">
          <span className="text-[10px]">{clock.time}</span>
          <span className="text-[9px] opacity-80">{clock.date}</span>
        </div>
      </div>
    </div>
  );
}

export default Taskbar;