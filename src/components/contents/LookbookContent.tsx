import { useState, useEffect } from 'react';

function LookbookContent() {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  // ИСПРАВЛЕНО: Добавлены точки (./) перед именами файлов для GitHub Pages
  const images = [
    './CP1.png', './CP2.png', './CP3.png', 
    './JG1.jpg', './JG2.jpg', './JG3.jpg', './JG4.jpg', './JG5.jpg'
  ];

  // Функции переключения
  const showNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentIndex !== null) {
      setCurrentIndex((currentIndex + 1) % images.length);
    }
  };

  const showPrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentIndex !== null) {
      setCurrentIndex((currentIndex - 1 + images.length) % images.length);
    }
  };

  // Управление клавиатурой
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentIndex === null) return;
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'Escape') setCurrentIndex(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  return (
    <div className="p-4 bg-gray-100 min-h-full relative">
      <div className="bg-blue-600 text-white px-3 py-2 mb-4 font-bold border-2 border-blue-800">
        📸 Lookbook Gallery
      </div>

      {/* Сетка миниатюр */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((img, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className="border-4 border-gray-400 bg-white p-2 hover:border-blue-600 transition-colors cursor-pointer"
            style={{
              boxShadow: '3px 3px 0 rgba(0,0,0,0.3)',
            }}
          >
            <img
              src={img}
              alt={`Lookbook ${index + 1}`}
              className="w-full h-32 object-cover"
              style={{ imageRendering: 'pixelated' }}
            />
            <div className="text-[10px] mt-2 font-bold text-center truncate">
              Look_{index + 1}.jpg
            </div>
          </div>
        ))}
      </div>

      {/* Слайдер на полный экран */}
      {currentIndex !== null && (
        <div 
          className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center p-4"
          onClick={() => setCurrentIndex(null)}
        >
          {/* Кнопка Назад */}
          <button 
            onClick={showPrev}
            className="absolute left-2 md:left-4 text-white text-5xl hover:text-blue-400 p-4 z-[10000]"
          >
            ‹
          </button>

          <img 
            src={images[currentIndex]} 
            className="max-w-full max-h-[75vh] md:max-h-[85vh] border-4 border-white shadow-2xl"
            alt="Full view"
            onClick={(e) => e.stopPropagation()} 
          />

          {/* Кнопка Вперед */}
          <button 
            onClick={showNext}
            className="absolute right-2 md:right-4 text-white text-5xl hover:text-blue-400 p-4 z-[10000]"
          >
            ›
          </button>

          {/* Инфо-панель снизу */}
          <div className="absolute bottom-6 md:bottom-10 flex flex-col items-center gap-2">
            <div className="bg-blue-600 text-white px-4 py-1 text-xs md:text-sm font-mono border-2 border-white shadow-lg">
              {currentIndex + 1} / {images.length} — Look_{currentIndex + 1}.jpg
            </div>
            <div className="text-gray-400 text-[10px] uppercase tracking-widest hidden md:block">
              Click outside or press ESC to close
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LookbookContent;