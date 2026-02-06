import { useState, useEffect, useRef } from 'react';

const SERVICES = [
  { id: 'individual', title: '01. INDIVIDUAL ORDER', price: 'VARIES', desc: 'Image: $20 | 10 Images: $200 | Video: $50 | Model: $500 | Full Card: $750' },
  { id: 'batch', title: '02. BATCH ORDER', price: 'DISCOUNTED', desc: 'Image: $15 | 10 Images: $150 | Video: $50 | Model: $300 | Full Card: $500' },
  { id: 'ugc', title: '03. UGC CONTENT', price: '$300', desc: '1 Video (30 sec) - High-quality virtual human content.' },
  { id: 'competitors', title: '04. EXTERNAL SEARCH', price: 'FATAL', desc: 'Searching for cheap alternatives...' }
];

function ServicesGameContent({ onTriggerBSOD }: { onTriggerBSOD?: () => void }) {
  const [logs, setLogs] = useState<string[]>([]);
  const [step, setStep] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const [isdecoding, setIsDecoding] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [logs]);

  useEffect(() => {
    const boot = ['Initializing Price Engine...', 'Loading Currency Modules...', 'Decrypting Offers...', 'System Ready.'];
    if (step < boot.length) {
      setTimeout(() => {
        setLogs(prev => [...prev, `> ${boot[step]}`]);
        setStep(s => s + 1);
      }, 500);
    } else setShowMenu(true);
  }, [step]);

  const startDecoding = (id: string) => {
    if (isdecoding) return;
    
    if (id === 'competitors') {
      setLogs(l => [...l, '> SEARCHING FOR CHEAP COMPETITORS...', '> ERROR: QUALITY STANDARDS NOT MET!', '> SYSTEM BREACH: UNAUTHORIZED DATA DETECTED!']);
      setTimeout(() => {
        if (onTriggerBSOD) onTriggerBSOD();
      }, 1500);
      return;
    }

    setIsDecoding(id);
    setProgress(0);
    const s = SERVICES.find(x => x.id === id);
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setLogs(l => [...l, `> ACCESS GRANTED: ${s?.title}`, `> INFO: ${s?.desc}`, `> PRICE: ${s?.price}`]);
          setIsDecoding(null);
          return 100;
        }
        return p + 20;
      });
    }, 150);
  };

  return (
    <div className="bg-black h-full p-4 font-mono text-green-500 flex flex-col border-2 border-green-900">
      <div ref={scrollRef} className="flex-1 overflow-y-auto mb-4 space-y-1 text-[10px] md:text-xs">
        {logs.map((log, i) => <div key={i}>{log}</div>)}
        {isdecoding && (
          <div className="mt-2">
            <div className="w-full bg-green-900/30 h-1.5 border border-green-500">
              <div className="bg-green-500 h-full" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}
      </div>

      {showMenu && (
        <div className="grid grid-cols-1 gap-2 border-t border-green-900 pt-4">
          {SERVICES.slice(0, 3).map((s) => (
            <button key={s.id} onClick={() => startDecoding(s.id)} className="border border-green-500 p-2 text-left hover:bg-green-500 hover:text-black text-[9px] md:text-[10px] uppercase">
              [ UNLOCK {s.id} ]
            </button>
          ))}
          <button 
            onClick={() => startDecoding('competitors')} 
            className="border border-red-900 p-2 text-left hover:bg-red-700 hover:text-white text-[9px] md:text-[10px] uppercase text-red-500"
          >
            [ FIND CHEAPER COMPETITORS ]
          </button>
        </div>
      )}
    </div>
  );
}

export default ServicesGameContent;