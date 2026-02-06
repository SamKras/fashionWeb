interface BSODProps {
  onRestart: () => void;
}

function BSOD({ onRestart }: BSODProps) {
  return (
    <div
      className="h-screen w-screen bg-blue-900 text-white flex items-center justify-center"
      style={{
        fontFamily: '"MS Sans Serif", "Pixelify Sans", monospace',
        imageRendering: 'pixelated',
      }}
    >
      <div className="max-w-3xl px-8">
        <div className="text-center space-y-8">
          <div className="text-6xl font-bold mb-8">:(</div>

          <h1 className="text-3xl font-bold mb-4">
            A problem has been detected and Windows has been shut down to prevent damage to your computer.
          </h1>

          <div className="text-xl font-bold text-red-400 mb-6">
            SYSTEM ERROR: STYLE_TOO_SHARP
          </div>

          <div className="text-left space-y-2 text-sm bg-blue-800 p-6 border-2 border-white">
            <p>If this is the first time you've seen this stop error screen,</p>
            <p>restart your computer. If this screen appears again, follow</p>
            <p>these steps:</p>
            <br />
            <p>Check to make sure your style is properly configured.</p>
            <p>If problems continue, disable or remove any newly installed</p>
            <p>fashion accessories. Disable FASHION_MODE in your wardrobe settings.</p>
            <br />
            <p>Technical information:</p>
            <br />
            <p>*** STOP: 0x000000F4 (0x00000003, 0x87E0B030, 0x87E0B1A4, 0x805DB03C)</p>
          </div>

          <button
            onClick={onRestart}
            className="mt-8 px-8 py-3 bg-gray-300 hover:bg-gray-400 text-black font-bold border-4 border-white"
            style={{
              boxShadow: 'inset 0 0 0 2px #000, 4px 4px 0 rgba(0,0,0,0.5)',
            }}
          >
            RESTART SYSTEM
          </button>
        </div>
      </div>
    </div>
  );
}

export default BSOD;
