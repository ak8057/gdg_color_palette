import React, { useState, useEffect } from "react";
import { Trash, RefreshCw, Save } from "lucide-react";
import ColorSwatch from "./ColorSwatch";
import { hexToHSL, HSLToHex } from "../utils/colorUtils";
import { toast } from "react-toastify";



const colorRelationships = [
  {
    name: "Analogous",
    description: "Colors that are adjacent to each other on the color wheel",
  },
  {
    name: "Complementary",
    description: "Colors that are opposite each other on the color wheel",
  },
  {
    name: "Triadic",
    description: "Three colors equally spaced around the color wheel",
  },
  {
    name: "Monochromatic",
    description: "Different shades and tints of the same hue",
  },
  {
    name: "Split Complementary",
    description: "A base color and two colors adjacent to its complement",
  },
];

function generatePalette(baseColors, relationshipType) {
  const palette = [...baseColors];

  const hslColors = baseColors.map((color) => hexToHSL(color));

  if (baseColors.length === 0) return [];

  switch (relationshipType) {
    case "Analogous":
      if (baseColors.length > 0) {
        const mainHSL = hslColors[0];
        palette.push(HSLToHex((mainHSL.h + 30) % 360, mainHSL.s, mainHSL.l));
        palette.push(HSLToHex((mainHSL.h + 60) % 360, mainHSL.s, mainHSL.l));
        palette.push(
          HSLToHex((mainHSL.h - 30 + 360) % 360, mainHSL.s, mainHSL.l)
        );
        palette.push(
          HSLToHex((mainHSL.h - 60 + 360) % 360, mainHSL.s, mainHSL.l)
        );
      }
      break;

    case "Complementary":
      hslColors.forEach((color) => {
        palette.push(HSLToHex((color.h + 180) % 360, color.s, color.l));
      });
      break;

    case "Triadic":
      if (baseColors.length > 0) {
        const mainHSL = hslColors[0];
        palette.push(HSLToHex((mainHSL.h + 120) % 360, mainHSL.s, mainHSL.l));
        palette.push(HSLToHex((mainHSL.h + 240) % 360, mainHSL.s, mainHSL.l));
      }
      break;

    case "Monochromatic":
      hslColors.forEach((color) => {
        palette.push(HSLToHex(color.h, color.s, Math.min(color.l + 20, 95)));
        palette.push(HSLToHex(color.h, color.s, Math.min(color.l + 40, 98)));

    
        palette.push(HSLToHex(color.h, color.s, Math.max(color.l - 20, 5)));
        palette.push(HSLToHex(color.h, color.s, Math.max(color.l - 40, 2)));
      });
      break;

    case "Split Complementary":
      if (baseColors.length > 0) {
        const mainHSL = hslColors[0];
        palette.push(HSLToHex((mainHSL.h + 150) % 360, mainHSL.s, mainHSL.l));
        palette.push(HSLToHex((mainHSL.h + 210) % 360, mainHSL.s, mainHSL.l));
      }
      break;

    default:
      break;
  }

  return [...new Set(palette)];
}


function GeneratePalette({ savedPalettes, setSavedPalettes }) {
  const [baseColors, setBaseColors] = useState(["#4287f5"]);
  const [newColor, setNewColor] = useState("#000000");
  const [relationshipType, setRelationshipType] = useState("Analogous");
  const [palette, setPalette] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [paletteName, setPaletteName] = useState("");

  useEffect(() => {
    const newPalette = generatePalette(baseColors, relationshipType);
    setPalette(newPalette);
  }, [baseColors, relationshipType]);

  const addBaseColor = () => {
    if (baseColors.length < 3) {
      setBaseColors([...baseColors, newColor]);
    }
  };

  const removeBaseColor = (index) => {
    const updatedColors = baseColors.filter((_, i) => i !== index);
    setBaseColors(updatedColors);
  };

  const copyToClipboard = (color, index) => {
    navigator.clipboard.writeText(color);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  const regeneratePalette = () => {
    const newPalette = generatePalette(baseColors, relationshipType);
    setPalette(newPalette);
  };

  const savePalette = () => {
    if (palette.length === 0) return;

    const name = paletteName.trim() || `Palette ${savedPalettes.length + 1}`;
    const newPalette = {
      id: Date.now(),
      name: name,
      colors: palette,
      type: relationshipType,
    };

    setSavedPalettes([...savedPalettes, newPalette]);
    setPaletteName("");

    toast.success(`Custom palette "${name}" saved successfully!` , {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <div className="bg-[#f1f5f9] dark:bg-[#0f172a] rounded-2xl p-6 shadow-inner shadow-white/40 dark:shadow-black/20 transition-all duration-300">
      <h2 className="text-3xl font-semibold mb-6 text-gray-700 dark:text-white">
        Generate Color Palette
      </h2>

      {/* Color Input Section */}
      <div className="mb-8 p-6 rounded-2xl bg-[#e0e5ec] dark:bg-[#1e293b] shadow-[inset_8px_8px_16px_#d1d9e6,inset_-8px_-8px_16px_#ffffff] dark:shadow-[inset_4px_4px_12px_#0f172a,inset_-4px_-4px_12px_#1e293b]">
        <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
          <div className="relative flex items-center w-full md:w-auto">
            <input
              type="color"
              value={newColor}
              onChange={(e) => setNewColor(e.target.value)}
              className="w-16 h-16 rounded-full cursor-pointer border-none shadow-[4px_4px_10px_#d1d9e6,-4px_-4px_10px_#ffffff] dark:shadow-[4px_4px_10px_#0f172a,-4px_-4px_10px_#1e293b]"
            />
            <span className="ml-2 text-gray-600 dark:text-gray-300 font-medium">
              {newColor}
            </span>
          </div>

          <button
            onClick={addBaseColor}
            disabled={baseColors.length >= 3}
            className="px-5 py-2.5 rounded-xl bg-[#dde1e7] dark:bg-[#1e293b] shadow-[4px_4px_10px_#d1d9e6,-4px_-4px_10px_#ffffff] dark:shadow-[4px_4px_10px_#0f172a,-4px_-4px_10px_#1e293b] text-gray-700 dark:text-gray-200 font-semibold hover:brightness-105 disabled:opacity-50"
          >
            Add Base Color {baseColors.length < 3 ? "" : "(Max 3)"}
          </button>
        </div>

        {/* Base Color Display */}
        <div className="flex flex-wrap gap-4 mt-4">
          {baseColors.map((color, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-12 h-12 rounded-full shadow-[4px_4px_8px_#d1d9e6,-4px_-4px_8px_#ffffff] dark:shadow-[4px_4px_8px_#0f172a,-4px_-4px_8px_#1e293b]"
                style={{ backgroundColor: color }}
              ></div>
              <span className="text-gray-600 dark:text-gray-300 font-medium">
                {color}
              </span>
              <button
                onClick={() => removeBaseColor(index)}
                className="p-1 text-red-500 hover:text-red-400"
              >
                <Trash size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Palette Type Selection */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-600 dark:text-gray-300">
          Choose Palette Type
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {colorRelationships.map((relation) => (
            <div
              key={relation.name}
              onClick={() => setRelationshipType(relation.name)}
              className={`p-4 rounded-2xl cursor-pointer shadow-[4px_4px_10px_#d1d9e6,-4px_-4px_10px_#ffffff] dark:shadow-[4px_4px_10px_#0f172a,-4px_-4px_10px_#1e293b] transition-all ${
                relationshipType === relation.name
                  ? "bg-blue-100 dark:bg-blue-900 border-2 border-blue-300 dark:border-blue-700"
                  : "hover:bg-blue-50 dark:hover:bg-[#1e293b]"
              }`}
            >
              <h3 className="font-medium text-gray-700 dark:text-white">
                {relation.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {relation.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Generated Palette Display */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-600 dark:text-gray-300">
            Generated Palette
          </h2>
          <button
            onClick={regeneratePalette}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-400 text-white shadow hover:bg-green-500 transition"
          >
            <RefreshCw size={16} />
            Regenerate
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-6">
          {palette.map((color, index) => (
            <ColorSwatch
              key={index}
              color={color}
              onCopy={() => copyToClipboard(color, index)}
              isCopied={copiedIndex === index}
            />
          ))}
        </div>

        {/* Save Palette Section */}
        {palette.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-4 items-center mt-6">
            <input
              type="text"
              placeholder="Name your palette"
              value={paletteName}
              onChange={(e) => setPaletteName(e.target.value)}
              className="px-4 py-2 rounded-xl w-full sm:w-auto bg-[#f5f7fa] dark:bg-[#1e293b] shadow-inner border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200"
            />
            <button
              onClick={savePalette}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 transition shadow"
            >
              <Save size={16} />
              Save Palette
            </button>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="bg-[#e0e5ec] dark:bg-[#1e293b] p-4 rounded-2xl shadow-[inset_6px_6px_12px_#d1d9e6,inset_-6px_-6px_12px_#ffffff] dark:shadow-[inset_4px_4px_12px_#0f172a,inset_-4px_-4px_12px_#1e293b]">
        <h3 className="font-semibold text-gray-600 dark:text-gray-300 mb-2">
          How to use:
        </h3>
        <ol className="list-decimal pl-5 text-gray-500 dark:text-gray-400 space-y-1 text-sm">
          <li>Select and add up to 3 base colors</li>
          <li>Choose a palette relationship type</li>
          <li>Click on any color swatch to copy its hex value</li>
          <li>Use the "Regenerate" button to refresh your palette</li>
          <li>Name and save your palette to access it later</li>
        </ol>
      </div>
    </div>
  );

}

export default GeneratePalette;
