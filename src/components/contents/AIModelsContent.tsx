import { useState, useEffect } from 'react';

function AIModelsContent() {
  const [activeModel, setActiveModel] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  // Структура данных для твоих моделей
  const models = [
    {
      id: 1,
      name: 'NEURAL-ENTITY-01',
      cover: '/MOD12.png',
      status: 'ONLINE',
      specs: 'Cortex Style Matrix v4.2',
      images: ['/MOD11.png', '/MOD12.png', '/MOD13.png', '/MOD14.png']
    },
    {
      id: 2,
      name: 'CYBER-SOUL-02',
      cover: '/MOD22.png',
      status: 'STABLE',
      specs: 'Deep Vision Synth v1.0',
      images: ['/MOD21.png', '/MOD22.png', '/MOD23.png', '/MOD24.png']
    }
  ];

  // Слайдер внутри модели
  const showNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentIndex !== null && activeModel !== null) {
      const currentImages = models.find(m => m.id === activeModel)?.images || [];
      setCurrentIndex((currentIndex + 1) % currentImages.length);
    }
  };

  const showPrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentIndex !== null && activeModel !== null) {
      const currentImages = models.find(m => m.id === activeModel)?.images || [];
      setCurrentIndex((currentIndex - 1 + currentImages.length) % currentImages.length);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentIndex !== null) {
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'Escape') setCurrentIndex(null);
      } else if (activeModel !== null && e.key === 'Escape') {
        setActiveModel(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, activeModel]);

  // ЭКРАН 1: СПИСОК МОДЕЛЕЙ
  if (activeModel === null) {
    return (
      <div className="p-4 bg-black min-h-full font-mono">
        <div className="border-4 border-green-500 bg-black p-4 mb-4">
          <div className="text-green-500 text-sm mb-2">
            <span className="animate-pulse">▸</span> SYSTEM_CORE_ACCESS: GRANTED
          </div>
          <h1 className="text-green-500 text-2xl font-bold uppercase tracking-tighter">
            AI_AGENT_DATABASE v3.0
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {models.map((model) => (
            <div
              key={model.id}
              onClick={() => setActiveModel(model.id)}
              className="border-4 border-green-500 bg-black p-4 cursor-pointer hover:bg-green-900/20 transition-all group"
            >
              <div className="flex gap-6">
                <div className="relative">
                  <img
                    src={model.cover}
                    alt={model.name}
                    className="w-40 h-40 object-cover border-2 border-green-500 grayscale group-hover:grayscale-0"
                    style={{ imageRendering: 'pixelated' }}
                  />
                  <div className="absolute bottom-0 left-0 bg-green-500 text-black px-2 py-1 text-[10px] font-bold">
                    ID_00{model.id}
                  </div>
                </div>

                <div className="flex-1 text-green-500">
                  <h3 className="text-2xl font-bold mb-2 tracking-widest">{model.name}</h3>
                  <div className="space-y-1 text-xs uppercase">
                    <div><span className="text-green-800">[STATUS]:</span> {model.status}</div>
                    <div><span className="text-green-800">[SPECS]:</span> {model.specs}</div>
                    <div><span className="text-green-800">[ASSETS]:</span> {model.images.length} FILES FOUND</div>
                  </div>
                  <div className="mt-6 flex gap-4">
                    <div className="px-4 py-1 bg-green-500 text-black font-bold text-xs uppercase animate-pulse">
                      DEPLOY_UNIT
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ЭКРАН 2: ВНУТРИ КАРТОЧКИ МОДЕЛИ (ГАЛЕРЕЯ)
  const currentModelData = models.find(m => m.id === activeModel)!;

  return (
    <div className="p-4 bg-black min-h-full font-mono text-green-500 relative">
      <div className="flex justify-between items-center mb-6 border-b-2 border-green-900 pb-2">
        <button 
          onClick={() => setActiveModel(null)}
          className="bg-green-500 text-black px-3 py-1 font-bold text-xs hover:bg-green-400"
        >
          &lt; BACK_TO_MAIN
        </button>
        <span className="text-xs">{currentModelData.name} // ASSET_VIEWER</span>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {currentModelData.images.map((img, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className="border-2 border-green-500 p-1 bg-black cursor-pointer hover:border-white transition-colors"
          >
            <img
              src={img}
              alt="Asset"
              className="w-full aspect-square object-cover"
              style={{ imageRendering: 'pixelated' }}
            />
            <div className="text-[10px] mt-1 text-center truncate">
              {img.replace('/', '')}
            </div>
          </div>
        ))}
      </div>

      {/* МОДАЛЬНОЕ ОКНО (СЛАЙДЕР) */}
      {currentIndex !== null && (
        <div 
          className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center p-4"
          onClick={() => setCurrentIndex(null)}
        >
          <button onClick={showPrev} className="absolute left-4 text-green-500 text-5xl p-4 hover:text-white">‹</button>
          
          <div className="relative border-4 border-green-500">
            <img 
              src={currentModelData.images[currentIndex]} 
              className="max-w-full max-h-[80vh] object-contain"
              alt="Full view"
              onClick={(e) => e.stopPropagation()} 
            />
            <div className="absolute -bottom-10 left-0 right-0 text-center text-xs">
              FILE: {currentModelData.images[currentIndex]} | {currentIndex + 1} / {currentModelData.images.length}
            </div>
          </div>

          <button onClick={showNext} className="absolute right-4 text-green-500 text-5xl p-4 hover:text-white">›</button>
        </div>
      )}
    </div>
  );
}

export default AIModelsContent;