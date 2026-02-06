import { Mail, Globe, Github, Linkedin } from 'lucide-react';

function ContactsContent() {
  return (
    <div className="p-4 bg-gray-100 min-h-full">
      <div className="bg-gradient-to-r from-blue-700 to-blue-600 text-white px-3 py-2 mb-4 font-bold border-2 border-blue-900">
        System Properties
      </div>

      <div className="bg-white border-4 border-gray-400 p-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-16 h-16 bg-blue-600 border-2 border-blue-800 flex items-center justify-center text-3xl">
              💼
            </div>
            <div>
              <h2 className="text-2xl font-bold text-blue-900">Contact Information</h2>
              <p className="text-sm text-gray-600">System Administrator</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="border-2 border-gray-300 p-4 bg-gray-50">
            <h3 className="font-bold mb-3 text-blue-900 border-b-2 border-blue-900 pb-1">
              General
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <strong>System:</strong>
                <span>StyleOS XP Professional</span>
              </div>
              <div className="flex items-center gap-2">
                <strong>Version:</strong>
                <span>2026.1.0 Build 2600</span>
              </div>
              <div className="flex items-center gap-2">
                <strong>Registered to:</strong>
                <span>Fashion Forward Studios</span>
              </div>
            </div>
          </div>

          <div className="border-2 border-gray-300 p-4 bg-gray-50">
            <h3 className="font-bold mb-3 text-blue-900 border-b-2 border-blue-900 pb-1">
              Contact Links
            </h3>
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 p-3 bg-white border-2 border-gray-400 hover:bg-gray-100 transition-colors">
                <Mail size={20} className="text-blue-600" />
                <span className="font-bold">contact@styleos.com</span>
              </button>

              <button className="w-full flex items-center gap-3 p-3 bg-white border-2 border-gray-400 hover:bg-gray-100 transition-colors">
                <Globe size={20} className="text-blue-600" />
                <span className="font-bold">www.styleos.com</span>
              </button>

              <button className="w-full flex items-center gap-3 p-3 bg-white border-2 border-gray-400 hover:bg-gray-100 transition-colors">
                <Github size={20} className="text-blue-600" />
                <span className="font-bold">github.com/styleos</span>
              </button>

              <button className="w-full flex items-center gap-3 p-3 bg-white border-2 border-gray-400 hover:bg-gray-100 transition-colors">
                <Linkedin size={20} className="text-blue-600" />
                <span className="font-bold">linkedin.com/company/styleos</span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            className="px-6 py-2 bg-gray-300 border-2 border-gray-500 font-bold hover:bg-gray-400"
            style={{
              boxShadow: '2px 2px 0 rgba(0,0,0,0.3)',
            }}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

export default ContactsContent;
