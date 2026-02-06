function AIModelsContent() {
  const models = [
    {
      name: 'NOVA-X1',
      img: 'https://images.pexels.com/photos/2690323/pexels-photo-2690323.jpeg?auto=compress&cs=tinysrgb&w=300',
      status: 'ONLINE',
      specs: 'Neural Processing Unit v3.4',
    },
    {
      name: 'CIPHER-7',
      img: 'https://images.pexels.com/photos/1898555/pexels-photo-1898555.jpeg?auto=compress&cs=tinysrgb&w=300',
      status: 'ONLINE',
      specs: 'Quantum Style Engine',
    },
    {
      name: 'AURORA-9',
      img: 'https://images.pexels.com/photos/2787341/pexels-photo-2787341.jpeg?auto=compress&cs=tinysrgb&w=300',
      status: 'TRAINING',
      specs: 'Deep Fashion Network',
    },
  ];

  return (
    <div className="p-4 bg-black min-h-full">
      <div className="border-4 border-green-500 bg-black p-4 mb-4">
        <div className="text-green-500 font-mono text-sm mb-2">
          <span className="animate-pulse">▸</span> SYSTEM INITIALIZED
        </div>
        <h1 className="text-green-500 font-mono text-2xl font-bold">
          AI MODEL DATABASE v2.0
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {models.map((model, index) => (
          <div
            key={index}
            className="border-4 border-green-500 bg-gray-900 p-4 hover:bg-gray-800 transition-colors"
          >
            <div className="flex gap-4">
              <div className="relative">
                <img
                  src={model.img}
                  alt={model.name}
                  className="w-32 h-32 object-cover border-2 border-green-500"
                  style={{ imageRendering: 'pixelated' }}
                />
                <div className="absolute top-0 right-0 bg-green-500 text-black px-2 py-1 text-xs font-bold">
                  {model.status}
                </div>
              </div>

              <div className="flex-1 text-green-500 font-mono">
                <h3 className="text-xl font-bold mb-2">{model.name}</h3>
                <div className="space-y-1 text-sm">
                  <div>
                    <span className="text-green-300">STATUS:</span> {model.status}
                  </div>
                  <div>
                    <span className="text-green-300">SPECS:</span> {model.specs}
                  </div>
                  <div>
                    <span className="text-green-300">VERSION:</span> 3.{index + 1}.{Math.floor(Math.random() * 10)}
                  </div>
                  <div>
                    <span className="text-green-300">ACCURACY:</span> {95 + index}%
                  </div>
                </div>

                <div className="mt-3 flex gap-2">
                  <button className="px-3 py-1 bg-green-500 text-black font-bold text-xs hover:bg-green-400">
                    DEPLOY
                  </button>
                  <button className="px-3 py-1 border-2 border-green-500 text-green-500 font-bold text-xs hover:bg-green-500 hover:text-black">
                    CONFIGURE
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 border-4 border-green-500 bg-gray-900 p-4 text-green-500 font-mono text-xs">
        <div>$ system_status --verbose</div>
        <div className="mt-2">
          [OK] Neural networks synchronized<br />
          [OK] Fashion algorithms loaded<br />
          [OK] Style matrix computed<br />
          <span className="animate-pulse">▸</span> Ready for deployment
        </div>
      </div>
    </div>
  );
}

export default AIModelsContent;
