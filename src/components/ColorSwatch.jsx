
import React from 'react';
import { Copy, X } from 'lucide-react';
import { calculateTextColor } from '../utils/colorUtils';





function ColorSwatch({ color, onCopy, isCopied, onRemove = null }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="w-full aspect-square rounded-lg shadow-md flex items-center justify-center mb-2 relative overflow-hidden group"
        style={{ backgroundColor: color }}
      >
        {onCopy && (
          <button
            onClick={() => onCopy(color)}
            className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity ${calculateTextColor(
              color
            )}`}
          >
            <Copy size={24} />
          </button>
        )}

        {onRemove && (
          <button
            onClick={() => onRemove(color)}
            className="absolute top-2 right-2 p-1 rounded-full bg-white bg-opacity-50 hover:bg-opacity-80 text-black opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X size={14} />
          </button>
        )}

        {isCopied && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white">
            Copied!
          </div>
        )}
      </div>

      <span className="text-gray-700 dark:text-gray-300 font-mono">{color}</span>
    </div>
  );
}


export default ColorSwatch;