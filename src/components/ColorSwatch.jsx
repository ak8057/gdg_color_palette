
import React from 'react';
import { Copy, X } from 'lucide-react';
import { calculateTextColor } from '../utils/colorUtils';



// function calculateTextColor(hexColor) {

//   const r = parseInt(hexColor.substring(1, 3), 16);
//   const g = parseInt(hexColor.substring(3, 5), 16);
//   const b = parseInt(hexColor.substring(5, 7), 16);

//   const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

//   // Return white for dark colors, black for light colors
//   return luminance > 0.5 ? "text-black" : "text-white";
// }


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
      <span className="text-gray-700 font-mono">{color}</span>
    </div>
  );
}


export default ColorSwatch;