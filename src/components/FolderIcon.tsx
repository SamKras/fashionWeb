import { Folder } from 'lucide-react';
import { motion } from 'framer-motion';
import { FolderData } from '../types';

interface FolderIconProps {
  folder: FolderData;
  onClick: (folderId: string) => void;
  onDragEnd: (folderId: string, x: number, y: number) => void;
}

function FolderIcon({ folder, onClick, onDragEnd }: FolderIconProps) {
  return (
    <motion.div
      className="absolute flex flex-col items-center cursor-pointer select-none group"
      drag
      dragMomentum={false}
      dragElastic={0.2}
      initial={{ x: folder.position.x, y: folder.position.y }}
      animate={{ x: folder.position.x, y: folder.position.y }}
      onDragEnd={(_, info) => {
        onDragEnd(folder.id, info.offset.x + folder.position.x, info.offset.y + folder.position.y);
      }}
      onClick={() => onClick(folder.id)}
      onDoubleClick={() => onClick(folder.id)}
      style={{
        imageRendering: 'pixelated',
        cursor: 'grab',
      }}
    >
      <div className="bg-yellow-300 p-3 rounded border-2 border-yellow-600 group-hover:bg-yellow-400 transition-colors">
        <Folder size={48} className="text-yellow-700" strokeWidth={1.5} />
      </div>
      <div
        className="mt-1 px-2 py-0.5 bg-blue-600 text-white text-sm font-bold text-center rounded shadow-md group-hover:bg-blue-700"
        style={{
          textShadow: '1px 1px 0px rgba(0,0,0,0.5)',
        }}
      >
        {folder.name}
      </div>
    </motion.div>
  );
}

export default FolderIcon;
