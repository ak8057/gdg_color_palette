import { useState, useEffect } from "react";
import { Copy, Trash, RefreshCw } from "lucide-react";

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

function hexToHSL(hex) {
  // Convert hex to RGB first
  let r = 0,
    g = 0,
    b = 0;
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) {
    r = parseInt(hex.substring(1, 3), 16);
    g = parseInt(hex.substring(3, 5), 16);
    b = parseInt(hex.substring(5, 7), 16);
  }

  // Convert RGB to HSL
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
}

function HSLToHex(h, s, l) {
  s /= 100;
  l /= 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2,
    r = 0,
    g = 0,
    b = 0;

  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }

  // Convert to hex
  r = Math.round((r + m) * 255).toString(16);
  g = Math.round((g + m) * 255).toString(16);
  b = Math.round((b + m) * 255).toString(16);

  // Ensure two digits
  if (r.length === 1) r = "0" + r;
  if (g.length === 1) g = "0" + g;
  if (b.length === 1) b = "0" + b;

  return "#" + r + g + b;
}

function generatePalette(baseColors, relationshipType) {
  const palette = [...baseColors];

  // Convert all base colors to HSL
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
        // Lighter variants
        palette.push(HSLToHex(color.h, color.s, Math.min(color.l + 20, 95)));
        palette.push(HSLToHex(color.h, color.s, Math.min(color.l + 40, 98)));

        // Darker variants
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

  // Ensure unique colors in palette
  return [...new Set(palette)];
}

function calculateTextColor(hexColor) {
  // Extract RGB components
  const r = parseInt(hexColor.substring(1, 3), 16);
  const g = parseInt(hexColor.substring(3, 5), 16);
  const b = parseInt(hexColor.substring(5, 7), 16);

  // Calculate relative luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Return white for dark colors, black for light colors
  return luminance > 0.5 ? "text-black" : "text-white";
}

export default function ColorPaletteGenerator() {
  const [baseColors, setBaseColors] = useState(["#4287f5"]);
  const [newColor, setNewColor] = useState("#000000");
  const [relationshipType, setRelationshipType] = useState("Analogous");
  const [palette, setPalette] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(null);

  // Generate palette when baseColors or relationshipType changes
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

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Color Palette Generator
        </h1>

        {/* Color Input Section */}
        <div className="mb-8 p-6 bg-gray-50 rounded-lg">
          <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
            <div className="relative w-full md:w-auto">
              <input
                type="color"
                value={newColor}
                onChange={(e) => setNewColor(e.target.value)}
                className="w-16 h-16 rounded cursor-pointer"
              />
              <span className="ml-2 text-gray-700">{newColor}</span>
            </div>

            <button
              onClick={addBaseColor}
              disabled={baseColors.length >= 3}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Add Base Color {baseColors.length < 3 ? "" : "(Max 3)"}
            </button>
          </div>

          {/* Base Color Display */}
          <div className="flex flex-wrap gap-4 mt-4">
            {baseColors.map((color, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="w-12 h-12 rounded shadow-md"
                  style={{ backgroundColor: color }}
                ></div>
                <span className="text-gray-700">{color}</span>
                <button
                  onClick={() => removeBaseColor(index)}
                  className="p-1 text-red-500 hover:text-red-700"
                >
                  <Trash size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Palette Type Selection */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Choose Palette Type
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {colorRelationships.map((relation) => (
              <div
                key={relation.name}
                onClick={() => setRelationshipType(relation.name)}
                className={`p-4 rounded-lg cursor-pointer border-2 transition-all ${
                  relationshipType === relation.name
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-blue-300"
                }`}
              >
                <h3 className="font-medium text-gray-800">{relation.name}</h3>
                <p className="text-sm text-gray-600">{relation.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Generated Palette Display */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-700">
              Generated Palette
            </h2>
            <button
              onClick={regeneratePalette}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              <RefreshCw size={16} />
              Regenerate
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {palette.map((color, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className="w-full aspect-square rounded-lg shadow-md flex items-center justify-center mb-2 relative overflow-hidden group"
                  style={{ backgroundColor: color }}
                >
                  <button
                    onClick={() => copyToClipboard(color, index)}
                    className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity ${calculateTextColor(
                      color
                    )}`}
                  >
                    <Copy size={24} />
                  </button>
                  {copiedIndex === index && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white">
                      Copied!
                    </div>
                  )}
                </div>
                <span className="text-gray-700 font-mono">{color}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-700 mb-2">How to use:</h3>
          <ol className="list-decimal pl-5 text-gray-600 space-y-1">
            <li>Select and add up to 3 base colors</li>
            <li>Choose a palette relationship type</li>
            <li>Click on any color swatch to copy its hex value</li>
            <li>Use the "Regenerate" button to refresh your palette</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
