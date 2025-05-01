import React, { useState } from "react";
import { Save } from "lucide-react";
import ColorSwatch from "./ColorSwatch";


function CustomPalette({ savedPalettes, setSavedPalettes }) {
  const [customColors, setCustomColors] = useState([
    "#4287f5",
    "#42f5a7",
    "#f542a7",
    "#f5a742",
    "#a742f5",
  ]);
  const [newCustomColor, setNewCustomColor] = useState("#000000");
  const [customPaletteName, setCustomPaletteName] = useState("");
  const [copiedIndex, setCopiedIndex] = useState(null);

  const addCustomColor = () => {
    if (customColors.length < 10) {
      setCustomColors([...customColors, newCustomColor]);
    }
  };

  const removeCustomColor = (colorToRemove) => {
    const updatedColors = customColors.filter(
      (color) => color !== colorToRemove
    );
    setCustomColors(updatedColors);
  };

  const copyToClipboard = (color, index) => {
    navigator.clipboard.writeText(color);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  const saveCustomPalette = () => {
    if (customColors.length === 0) return;

    const name =
      customPaletteName.trim() || `Custom Palette ${savedPalettes.length + 1}`;
    const newPalette = {
      id: Date.now(),
      name: name,
      colors: customColors,
      type: "Custom",
    };

    setSavedPalettes([...savedPalettes, newPalette]);
    setCustomPaletteName("");

    // Show save success notification
    alert(`Custom palette "${name}" saved successfully!`);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Create Custom Palette
      </h2>

      {/* Color Input */}
      <div className="mb-8 p-6 bg-gray-50 rounded-lg">
        <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
          <div className="relative w-full md:w-auto">
            <input
              type="color"
              value={newCustomColor}
              onChange={(e) => setNewCustomColor(e.target.value)}
              className="w-16 h-16 rounded cursor-pointer"
            />
            <span className="ml-2 text-gray-700">{newCustomColor}</span>
          </div>

          <button
            onClick={addCustomColor}
            disabled={customColors.length >= 10}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Add Color {customColors.length < 10 ? "" : "(Max 10)"}
          </button>
        </div>
      </div>

      {/* Custom Palette Display */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Your Custom Palette
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
          {customColors.map((color, index) => (
            <ColorSwatch
              key={index}
              color={color}
              onCopy={() => copyToClipboard(color, index)}
              isCopied={copiedIndex === index}
              onRemove={removeCustomColor}
            />
          ))}
        </div>

        {/* Save Custom Palette */}
        {customColors.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-4 items-center mt-6">
            <input
              type="text"
              placeholder="Name your custom palette"
              value={customPaletteName}
              onChange={(e) => setCustomPaletteName(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded w-full sm:w-auto"
            />
            <button
              onClick={saveCustomPalette}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 w-full sm:w-auto"
            >
              <Save size={16} />
              Save Custom Palette
            </button>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold text-gray-700 mb-2">How to use:</h3>
        <ol className="list-decimal pl-5 text-gray-600 space-y-1">
          <li>Pick colors and add them to your custom palette</li>
          <li>
            Remove any colors you don't want by clicking the X when hovering
          </li>
          <li>Name your palette and save it to access it later</li>
          <li>Click on any color swatch to copy its hex value</li>
        </ol>
      </div>
    </div>
  );
}


export default CustomPalette;