import React, { useState } from "react";
import { Trash } from "lucide-react";
import { toast } from "react-toastify";
function SavedPalettes({ savedPalettes, setSavedPalettes }) {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const copyToClipboard = (color) => {
    navigator.clipboard.writeText(color);
    setCopiedIndex(color);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  const deletePalette = (id) => {
    if (window.confirm("Are you sure you want to delete this palette?")) {
      const updatedPalettes = savedPalettes.filter(
        (palette) => palette.id !== id
      );
      setSavedPalettes(updatedPalettes);
      toast.success("Palette deleted successfully!");
    }
  };
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Your Saved Palettes
      </h2>

      {savedPalettes.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <p className="text-gray-500 dark:text-gray-300 mb-4">
            You don't have any saved palettes yet.
          </p>
          <p className="text-gray-600 dark:text-gray-200">
            Generate new palettes or extract colors from images, then save them
            to see them here.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {savedPalettes.map((palette) => (
            <div
              key={palette.id}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                    {palette.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    {palette.type} • {palette.colors.length} colors
                  </p>
                </div>
                <button
                  onClick={() => deletePalette(palette.id)}
                  className="mt-2 sm:mt-0 flex items-center gap-2 px-3 py-1 bg-red-100 text-red-600 dark:bg-red-800 dark:text-red-400 rounded hover:bg-red-200 dark:hover:bg-red-700"
                >
                  <Trash size={14} />
                  Delete
                </button>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-2">
                {palette.colors.map((color, index) => (
                  <div key={index} className="group relative">
                    <div
                      className="aspect-square rounded w-full cursor-pointer shadow-sm"
                      style={{ backgroundColor: color }}
                      onClick={() => copyToClipboard(color)}
                    ></div>
                    {copiedIndex === color && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 text-white text-xs rounded">
                        Copied!
                      </div>
                    )}
                    <div className="opacity-0 group-hover:opacity-100 absolute bottom-0 left-0 right-0 text-xs bg-black bg-opacity-50 text-white px-1 rounded-b text-center truncate transition-opacity">
                      {color}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

}


export default SavedPalettes;