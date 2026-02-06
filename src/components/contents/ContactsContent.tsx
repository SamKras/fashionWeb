import { Mail, Globe, Instagram } from 'lucide-react';

function ContactsContent() {
  const systemInfo = {
    system: "I.AI XP Professional",
    version: "2026.1.0 Build 2600",
    registered: "Fashion Forward Studios"
  };

  return (
    <div className="p-6 bg-[#c0c0c0] min-h-full font-mono text-sm select-none">
      {/* СИСТЕМНАЯ ИНФОРМАЦИЯ (КАК НА СКРИНШОТЕ) */}
      <div className="mb-8 bg-white border-2 border-gray-600 p-4 shadow-[inset_1px_1px_#000]">
        <h2 className="text-blue-800 font-bold text-lg border-b-2 border-blue-800 mb-4 pb-1">
          General
        </h2>
        <div className="space-y-4 text-black">
          <div>
            <span className="font-bold block text-base">System:</span>
            <span className="text-gray-800">{systemInfo.system}</span>
          </div>
          <div>
            <span className="font-bold block text-base">Version:</span>
            <span className="text-gray-800">{systemInfo.version}</span>
          </div>
          <div>
            <span className="font-bold block text-base">Registered to:</span>
            <span className="text-gray-800">{systemInfo.registered}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {/* КНОПКА ПОЧТЫ */}
        <a
          href="mailto:aiateamconnect@gmail.com"
          className="flex items-center gap-4 p-4 bg-gray-100 border-2 border-white shadow-[1px_1px_0_0_#000,inset_1px_1px_0_0_#fff] active:shadow-[inset_1px_1px_2px_#000] hover:bg-gray-200 transition-colors"
        >
          <div className="w-10 h-10 bg-blue-600 flex items-center justify-center border border-black">
            <Mail className="text-white" size={24} />
          </div>
          <div>
            <div className="font-bold text-blue-900 uppercase">Email Support</div>
            <div className="text-xs text-gray-600 font-bold">aiateamconnect@gmail.com</div>
          </div>
        </a>

        {/* КНОПКА ИНСТАГРАМА */}
        <a
          href="https://www.instagram.com/i.ai.team/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 p-4 bg-gray-100 border-2 border-white shadow-[1px_1px_0_0_#000,inset_1px_1px_0_0_#fff] active:shadow-[inset_1px_1px_2px_#000] hover:bg-gray-200 transition-colors"
        >
          <div className="w-10 h-10 bg-pink-600 flex items-center justify-center border border-black">
            <Instagram className="text-white" size={24} />
          </div>
          <div>
            <div className="font-bold text-pink-900 uppercase">Instagram Feed</div>
            <div className="text-xs text-gray-600 font-bold">@i.ai.team</div>
          </div>
        </a>

        {/* КНОПКА САЙТА */}
        <a
          href="#"
          className="flex items-center gap-4 p-4 bg-gray-100 border-2 border-white shadow-[1px_1px_0_0_#000,inset_1px_1px_0_0_#fff] active:shadow-[inset_1px_1px_2px_#000] hover:bg-gray-200 transition-colors"
        >
          <div className="w-10 h-10 bg-green-600 flex items-center justify-center border border-black">
            <Globe className="text-white" size={24} />
          </div>
          <div>
            <div className="font-bold text-green-900 uppercase">Official Website</div>
            <div className="text-xs text-gray-600 font-bold">WWW.I.AI.COM</div>
          </div>
        </a>
      </div>

      <div className="mt-8 text-center text-[10px] text-gray-500 font-bold uppercase tracking-widest">
        Support ID: {Math.random().toString(36).substring(7).toUpperCase()}
      </div>
    </div>
  );
}

export default ContactsContent;