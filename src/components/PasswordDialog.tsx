import { useState } from 'react';

interface PasswordDialogProps {
  onSubmit: (password: string) => void;
  onCancel: () => void;
  failedAttempts: number;
}

function PasswordDialog({ onSubmit, onCancel, failedAttempts }: PasswordDialogProps) {
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    onSubmit(password);
    setPassword('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-100 border-4 border-gray-400 shadow-lg w-80">
        <div
          className="bg-gradient-to-r from-blue-700 to-blue-600 text-white px-3 py-2 font-bold border-b-2 border-blue-900"
          style={{
            fontFamily: '"MS Sans Serif", "Pixelify Sans", monospace',
          }}
        >
          Protected Resource
        </div>

        <div className="p-6 space-y-4">
          <p className="text-sm font-bold text-gray-900">
            The AI-models folder is password protected.
          </p>
          <p className="text-xs text-gray-700">Enter password to continue:</p>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter password"
            className="w-full px-3 py-2 border-2 border-gray-400 bg-white focus:outline-none"
            autoFocus
            style={{
              boxShadow: 'inset 1px 1px 0 rgba(0,0,0,0.1)',
              fontFamily: '"MS Sans Serif", "Pixelify Sans", monospace',
            }}
          />

          {failedAttempts > 0 && (
            <div
              className="text-xs p-2 bg-red-100 border-2 border-red-400 text-red-900"
              style={{
                fontFamily: '"MS Sans Serif", "Pixelify Sans", monospace',
              }}
            >
              Failed attempts: {failedAttempts}/3
            </div>
          )}

          <div className="flex gap-2 justify-end">
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-gray-300 border-2 border-gray-500 font-bold hover:bg-gray-400"
              style={{
                boxShadow: '2px 2px 0 rgba(0,0,0,0.3)',
                fontFamily: '"MS Sans Serif", "Pixelify Sans", monospace',
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-500 border-2 border-blue-700 font-bold text-white hover:bg-blue-600"
              style={{
                boxShadow: '2px 2px 0 rgba(0,0,0,0.3)',
                fontFamily: '"MS Sans Serif", "Pixelify Sans", monospace',
              }}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PasswordDialog;
