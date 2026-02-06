import React from 'react';

interface BSODProps {
  onRestart: () => void;
}

const BSOD: React.FC<BSODProps> = ({ onRestart }) => {
  return (
    <div className="fixed inset-0 bg-[#0000aa] text-white p-6 md:p-10 font-mono z-[9999] flex flex-col justify-start select-none cursor-default overflow-y-auto">
      <div className="max-w-4xl">
        <div className="bg-white text-[#0000aa] inline-block px-2 mb-6 font-bold uppercase">
          CRITICAL_EXCEPTION
        </div>
        
        <h1 className="text-2xl md:text-3xl mb-8 font-bold text-white uppercase">
          A PROBLEM HAS BEEN DETECTED
        </h1>
        
        <p className="mb-6 text-lg md:text-xl">
          ERROR_CODE: BETTER_QUALITY_NOT_FOUND (0x0000007B)
        </p>

        <p className="mb-6 leading-relaxed">
          The system attempt to find "cheaper competitors" resulted in a fatal exception. 
          Your computer knows that nobody provides better service and quality than we do. 
          Searching for alternatives has overwhelmed the processor's logic.
        </p>

        <p className="mb-8 leading-relaxed">
          * Stop searching for competitors; it upsets the CPU.<br />
          * Return to viewing our high-end digital works.<br />
          * Trust the system: you are already in the right place.
        </p>

        <div className="space-y-1 mb-10 opacity-80 text-xs md:text-sm">
          <p>Technical Information:</p>
          <p>*** STOP: 0x00000001 (BEST_CHOICE_ALREADY_MADE)</p>
          <p>*** REFRESH_TO_CONTINUE.sys - Address F84B521A base at F84B5000</p>
        </div>

        {/* КНОПКА ПЕРЕЗАГРУЗКИ */}
        <button 
          onClick={onRestart}
          className="mt-4 px-6 py-3 bg-white text-[#0000aa] font-bold hover:bg-gray-200 transition-colors uppercase shadow-[4px_4px_0_rgba(0,0,0,0.5)] active:translate-y-1 active:shadow-none"
        >
          {'>'} Restart System
        </button>

        <div className="mt-8 animate-pulse text-sm opacity-70">
          Press the button above to return to excellence...
        </div>
      </div>
    </div>
  );
};

export default BSOD;