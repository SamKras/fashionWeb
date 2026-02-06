import { useState, useEffect } from 'react';

function EditorialsContent() {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  // Список твоих EDIT-файлов
  const editorialImages = [
    '/EDIT1.1.jpg', '/EDIT1.2.jpg', '/EDIT2.1.jpg', 
    '/EDIT2.2.jpg', '/EDIT2.3.jpg', '/EDIT3.1.jpg',
    '/EDIT3.2.jpg', '/EDIT3.3.jpg', '/EDIT3.4.jpg'
  ];

  // Функции для переключения
  const showNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentIndex !== null) {
      setCurrentIndex((currentIndex + 1) % editorialImages.length);
    }
  };

  const showPrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentIndex !== null) {
      setCurrentIndex((currentIndex - 1 + editorialImages.length) % editorialImages.length);
    }
  };

  // Управление с клавиатуры
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
      {/* Заголовок журнала (стилизован под плашку системы) */}
      <div className="bg-gray-800 text-white px-4 py-3 mb-6 font-bold text-2xl border-4 border-black text-center uppercase tracking-widest">
        I.AI TEAM MAGAZINE
      </div>

      {/* Вступительная статья */}
      <article className="border-4 border-gray-400 p-6 bg-white mb-8 shadow-[3px_3px_0_rgba(0,0,0,0.3)]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-blue-900 tracking-tighter uppercase">
            THE FUTURE IS NOW
          </h2>
          <p className="text-md leading-relaxed mb-4 text-gray-800">
            In a world where pixels meet passion, fashion transcends the digital realm. 
            Our exclusive editorial showcases the intersection of technology and style, 
            blurring the line between virtual and reality.
          </p>
          <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">
            By I.AI.Team • Winter 2026
          </div>
        </div>
      </article>

      {/* Сетка галереи (как в Лукбуке) */}
      <div className="grid grid-cols-4 gap-4">
        {editorialImages.map((img, index) => (
          <div 
            key={index}
            onClick={() => setCurrentIndex(index)}
            className="border-4 border-gray-400 bg-white p-2 hover:border-blue-600 transition-colors cursor-pointer"
            style={{
              boxShadow: '3px 3px 0 rgba(0,0,0,0.3)',
            }}
          >
            <div className="aspect-[3/4] overflow-hidden border-2 border-gray-200">
              <img
                src={img}
                alt={`Editorial ${index + 1}`}
                className="w-full h-full object-cover"
                style={{ imageRendering: 'pixelated' }}
              />
            </div>
            <div className="text-[10px] mt-2 font-bold text-center truncate text-gray-600 font-mono">
              ED_{index + 1}.jpg
            </div>
          </div>
        ))}
      </div>

      {/* Слайдер (Модальное окно) */}
      {currentIndex !== null && (
        <div 
          className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center p-4 cursor-default"
          onClick={() => setCurrentIndex(null)}
        >
          <button 
            onClick={showPrev}
            className="absolute left-4 md:left-10 text-white text-5xl hover:text-blue-400 p-4 z-[10000]"
          >
            ‹
          </button>

          <img 
            src={editorialImages[currentIndex]} 
            className="max-w-full max-h-[85vh] border-4 border-white shadow-2xl"
            alt="Full size"
            onClick={(e) => e.stopPropagation()} 
          />

          <button 
            onClick={showNext}
            className="absolute right-4 md:right-10 text-white text-5xl hover:text-blue-400 p-4 z-[10000]"
          >
            ›
          </button>

          <div className="absolute bottom-10 flex flex-col items-center gap-2">
            <div className="bg-gray-800 text-white px-4 py-1 text-sm font-mono border-2 border-white shadow-lg">
              {currentIndex + 1} / {editorialImages.length} — ED_{currentIndex + 1}.jpg
            </div>
          </div>

          <button className="absolute top-6 right-6 text-white text-xs font-bold border-2 border-white px-4 py-2 hover:bg-white hover:text-black transition-colors">
            CLOSE [ESC]
          </button>
        </div>
      )}

      <div className="mt-12 pt-6 border-t-4 border-black text-center text-xs font-bold text-gray-400 italic">
        © 2026 I.AI.TEAM PRODUCTIONS. ALL RIGHTS RESERVED.
      </div>
    </div>
  );
}

export default EditorialsContent;