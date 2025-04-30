import { useState, useEffect, useRef } from "react";
import {
  Copy,
  Trash,
  RefreshCw,
  Save,
  Image,
  Plus,
  Palette,
  UserPlus,
  Grid,
  X,
} from "lucide-react";
import ColorSwatch from "./components/ColorSwatch";
import { calculateTextColor , hexToHSL, HSLToHex } from "./utils/colorUtils";
import GeneratePalette from "./components/GeneratePalette";







// function GeneratePalette({ savedPalettes, setSavedPalettes }) {
//   const [baseColors, setBaseColors] = useState(["#4287f5"]);
//   const [newColor, setNewColor] = useState("#000000");
//   const [relationshipType, setRelationshipType] = useState("Analogous");
//   const [palette, setPalette] = useState([]);
//   const [copiedIndex, setCopiedIndex] = useState(null);
//   const [paletteName, setPaletteName] = useState("");

//   // Generate palette when baseColors or relationshipType changes
//   useEffect(() => {
//     const newPalette = generatePalette(baseColors, relationshipType);
//     setPalette(newPalette);
//   }, [baseColors, relationshipType]);

//   const addBaseColor = () => {
//     if (baseColors.length < 3) {
//       setBaseColors([...baseColors, newColor]);
//     }
//   };

//   const removeBaseColor = (index) => {
//     const updatedColors = baseColors.filter((_, i) => i !== index);
//     setBaseColors(updatedColors);
//   };

//   const copyToClipboard = (color, index) => {
//     navigator.clipboard.writeText(color);
//     setCopiedIndex(index);
//     setTimeout(() => setCopiedIndex(null), 1500);
//   };

//   const regeneratePalette = () => {
//     const newPalette = generatePalette(baseColors, relationshipType);
//     setPalette(newPalette);
//   };

//   const savePalette = () => {
//     if (palette.length === 0) return;

//     const name = paletteName.trim() || `Palette ${savedPalettes.length + 1}`;
//     const newPalette = {
//       id: Date.now(),
//       name: name,
//       colors: palette,
//       type: relationshipType,
//     };

//     setSavedPalettes([...savedPalettes, newPalette]);
//     setPaletteName("");

//     // Show save success notification
//     alert(`Palette "${name}" saved successfully!`);
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-lg p-6">
//       <h2 className="text-2xl font-bold mb-6 text-gray-800">
//         Generate Color Palette
//       </h2>

//       {/* Color Input Section */}
//       <div className="mb-8 p-6 bg-gray-50 rounded-lg">
//         <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
//           <div className="relative w-full md:w-auto">
//             <input
//               type="color"
//               value={newColor}
//               onChange={(e) => setNewColor(e.target.value)}
//               className="w-16 h-16 rounded cursor-pointer"
//             />
//             <span className="ml-2 text-gray-700">{newColor}</span>
//           </div>

//           <button
//             onClick={addBaseColor}
//             disabled={baseColors.length >= 3}
//             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
//           >
//             Add Base Color {baseColors.length < 3 ? "" : "(Max 3)"}
//           </button>
//         </div>

//         {/* Base Color Display */}
//         <div className="flex flex-wrap gap-4 mt-4">
//           {baseColors.map((color, index) => (
//             <div key={index} className="flex items-center gap-2">
//               <div
//                 className="w-12 h-12 rounded shadow-md"
//                 style={{ backgroundColor: color }}
//               ></div>
//               <span className="text-gray-700">{color}</span>
//               <button
//                 onClick={() => removeBaseColor(index)}
//                 className="p-1 text-red-500 hover:text-red-700"
//               >
//                 <Trash size={16} />
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Palette Type Selection */}
//       <div className="mb-8">
//         <h2 className="text-xl font-semibold mb-4 text-gray-700">
//           Choose Palette Type
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {colorRelationships.map((relation) => (
//             <div
//               key={relation.name}
//               onClick={() => setRelationshipType(relation.name)}
//               className={`p-4 rounded-lg cursor-pointer border-2 transition-all ${
//                 relationshipType === relation.name
//                   ? "border-blue-500 bg-blue-50"
//                   : "border-gray-200 hover:border-blue-300"
//               }`}
//             >
//               <h3 className="font-medium text-gray-800">{relation.name}</h3>
//               <p className="text-sm text-gray-600">{relation.description}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Generated Palette Display */}
//       <div className="mb-8">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-semibold text-gray-700">
//             Generated Palette
//           </h2>
//           <button
//             onClick={regeneratePalette}
//             className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//           >
//             <RefreshCw size={16} />
//             Regenerate
//           </button>
//         </div>

//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-6">
//           {palette.map((color, index) => (
//             <ColorSwatch
//               key={index}
//               color={color}
//               onCopy={() => copyToClipboard(color, index)}
//               isCopied={copiedIndex === index}
//             />
//           ))}
//         </div>

//         {/* Save Palette Section */}
//         {palette.length > 0 && (
//           <div className="flex flex-col sm:flex-row gap-4 items-center mt-6">
//             <input
//               type="text"
//               placeholder="Name your palette"
//               value={paletteName}
//               onChange={(e) => setPaletteName(e.target.value)}
//               className="px-4 py-2 border border-gray-300 rounded w-full sm:w-auto"
//             />
//             <button
//               onClick={savePalette}
//               className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 w-full sm:w-auto"
//             >
//               <Save size={16} />
//               Save Palette
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Instructions */}
//       <div className="bg-gray-50 p-4 rounded-lg">
//         <h3 className="font-semibold text-gray-700 mb-2">How to use:</h3>
//         <ol className="list-decimal pl-5 text-gray-600 space-y-1">
//           <li>Select and add up to 3 base colors</li>
//           <li>Choose a palette relationship type</li>
//           <li>Click on any color swatch to copy its hex value</li>
//           <li>Use the "Regenerate" button to refresh your palette</li>
//           <li>Name and save your palette to access it later</li>
//         </ol>
//       </div>
//     </div>
//   );
// }

// Component for creating custom palettes
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

// Component for extracting colors from images
function ImageExtractor({ savedPalettes, setSavedPalettes }) {
  const [extractedColors, setExtractedColors] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [extractedPaletteName, setExtractedPaletteName] = useState("");
  const [copiedIndex, setCopiedIndex] = useState(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new window.Image();
      img.onload = () => {
        setUploadedImage(img);
        extractColorsFromImage(img);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const extractColorsFromImage = (img) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Resize canvas to match image dimensions
    canvas.width = img.width;
    canvas.height = img.height;

    // Draw image to canvas
    ctx.drawImage(img, 0, 0);

    // Get image data
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

    // Sample colors from the image
    const colorMap = {};
    const pixelCount = imageData.length / 4; // RGBA = 4 values per pixel
    const sampleRate = Math.max(1, Math.floor(pixelCount / 10000)); // Sample at most 10,000 pixels

    for (let i = 0; i < pixelCount; i += sampleRate) {
      const offset = i * 4;
      const r = imageData[offset];
      const g = imageData[offset + 1];
      const b = imageData[offset + 2];

      // Skip transparent pixels
      if (imageData[offset + 3] < 128) continue;

      // Convert to hex and add to map
      const hex = rgbToHex(r, g, b);
      if (colorMap[hex]) {
        colorMap[hex]++;
      } else {
        colorMap[hex] = 1;
      }
    }

    // Sort by frequency and take the top 20
    const sortedColors = Object.keys(colorMap)
      .sort((a, b) => colorMap[b] - colorMap[a])
      .slice(0, 20);

    // Filter for visually distinct colors
    const distinctColors = [];
    for (const color of sortedColors) {
      // Only add if it's visually distinct from colors we already have
      if (!distinctColors.some((c) => isColorSimilar(color, c))) {
        distinctColors.push(color);
        if (distinctColors.length >= 10) break;
      }
    }

    setExtractedColors(distinctColors);
    setSelectedColors([]); // Reset selection
  };

  // Helper for color extraction
  const rgbToHex = (r, g, b) => {
    return (
      "#" +
      [r, g, b]
        .map((x) => {
          const hex = x.toString(16);
          return hex.length === 1 ? "0" + hex : hex;
        })
        .join("")
    );
  };

  // Check if two colors are visually similar
  const isColorSimilar = (color1, color2) => {
    const c1 = hexToHSL(color1);
    const c2 = hexToHSL(color2);

    // Consider similar if hue is close and saturation/lightness are similar
    const hueDiff = Math.abs(c1.h - c2.h);
    const adjustedHueDiff = hueDiff > 180 ? 360 - hueDiff : hueDiff;
    const satDiff = Math.abs(c1.s - c2.s);
    const lightDiff = Math.abs(c1.l - c2.l);

    return adjustedHueDiff < 15 && satDiff < 20 && lightDiff < 20;
  };

  const toggleColorSelection = (color) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter((c) => c !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };

  const copyToClipboard = (color, index) => {
    navigator.clipboard.writeText(color);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  const saveExtractedPalette = () => {
    if (selectedColors.length === 0) {
      alert("Please select at least one color for your palette");
      return;
    }

    const name =
      extractedPaletteName.trim() ||
      `Image Palette ${savedPalettes.length + 1}`;
    const newPalette = {
      id: Date.now(),
      name: name,
      colors: selectedColors,
      type: "Extracted",
    };

    setSavedPalettes([...savedPalettes, newPalette]);
    setExtractedPaletteName("");

    // Show save success notification
    alert(`Image palette "${name}" saved successfully!`);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Extract Colors from Image
      </h2>

      {/* Image Upload */}
      <div className="mb-8">
        <div
          className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-blue-400 transition-colors"
          onClick={() => fileInputRef.current.click()}
        >
          <Image size={48} className="text-gray-400 mb-4" />
          <p className="text-gray-600 mb-2">Click to upload an image</p>
          <p className="text-gray-400 text-sm">JPG, PNG, or GIF</p>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageUpload}
          />
        </div>
      </div>

      {/* Hidden canvas for image processing */}
      <canvas ref={canvasRef} className="hidden"></canvas>

      {/* Preview uploaded image */}
      {uploadedImage && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2 text-gray-700">
            Uploaded Image
          </h3>
          <div className="max-h-64 overflow-scroll rounded-lg shadow-md">
            <img
              src={uploadedImage.src}
              alt="Uploaded"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      )}

      {/* Extracted Colors */}
      {extractedColors.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2 text-gray-700">
            Extracted Colors
          </h3>
          <p className="text-gray-600 mb-4">
            Click on colors to select them for your palette
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {extractedColors.map((color, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`w-full aspect-square rounded-lg shadow-md cursor-pointer mb-2 relative overflow-hidden ${
                    selectedColors.includes(color)
                      ? "ring-2 ring-offset-2 ring-blue-500"
                      : ""
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => toggleColorSelection(color)}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(color, index);
                    }}
                    className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity ${calculateTextColor(
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

          {/* Selected Colors */}
          {selectedColors.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-2 text-gray-700">
                Selected Colors
              </h3>
              <div className="flex flex-wrap gap-4 mb-6">
                {selectedColors.map((color, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div
                      className="w-12 h-12 rounded shadow-md"
                      style={{ backgroundColor: color }}
                    ></div>
                    <span className="text-gray-700 font-mono">{color}</span>
                    <button
                      onClick={() => toggleColorSelection(color)}
                      className="p-1 text-red-500 hover:text-red-700"
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Save Extracted Palette */}
              <div className="flex flex-col sm:flex-row gap-4 items-center mt-6">
                <input
                  type="text"
                  placeholder="Name your palette"
                  value={extractedPaletteName}
                  onChange={(e) => setExtractedPaletteName(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded w-full sm:w-auto"
                />
                <button
                  onClick={saveExtractedPalette}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 w-full sm:w-auto"
                >
                  <Save size={16} />
                  Save Palette
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Instructions */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold text-gray-700 mb-2">How to use:</h3>
        <ol className="list-decimal pl-5 text-gray-600 space-y-1">
          <li>Upload an image by clicking on the upload area</li>
          <li>We'll extract the most dominant colors from your image</li>
          <li>Click on colors to select them for your palette</li>
          <li>Name and save your palette to access it later</li>
        </ol>
      </div>
    </div>
  );
}

// Component for displaying saved palettes
function SavedPalettes({ savedPalettes, setSavedPalettes }) {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const copyToClipboard = (color) => {
    navigator.clipboard.writeText(color);
    setCopiedIndex(color);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  const deletePalette = (id) => {
    if (confirm("Are you sure you want to delete this palette?")) {
      const updatedPalettes = savedPalettes.filter(
        (palette) => palette.id !== id
      );
      setSavedPalettes(updatedPalettes);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Your Saved Palettes
      </h2>

      {savedPalettes.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <p className="text-gray-500 mb-4">
            You don't have any saved palettes yet.
          </p>
          <p className="text-gray-600">
            Generate new palettes or extract colors from images, then save them
            to see them here.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {savedPalettes.map((palette) => (
            <div
              key={palette.id}
              className="border border-gray-200 rounded-lg p-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {palette.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {palette.type} • {palette.colors.length} colors
                  </p>
                </div>
                <button
                  onClick={() => deletePalette(palette.id)}
                  className="mt-2 sm:mt-0 flex items-center gap-2 px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
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

// Main App Component
export default function ColorPaletteGenerator() {
  // Navigation state
  const [activeTab, setActiveTab] = useState("generate");

  // Load saved palettes from localStorage
  const [savedPalettes, setSavedPalettes] = useState(() => {
    const storedPalettes = localStorage.getItem("colorPalettes");
    return storedPalettes ? JSON.parse(storedPalettes) : [];
  });

  // Save palettes to localStorage when they change
  useEffect(() => {
    localStorage.setItem("colorPalettes", JSON.stringify(savedPalettes));
  }, [savedPalettes]);

  // Navigation items
  const navItems = [
    { id: "generate", label: "Generate Palette", icon: <Palette size={20} /> },
    { id: "custom", label: "Custom Palette", icon: <UserPlus size={20} /> },
    { id: "extract", label: "Extract from Image", icon: <Image size={20} /> },
    { id: "saved", label: "Saved Palettes", icon: <Grid size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Navigation */}
      <div className="md:hidden bg-white shadow-md p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">
            Color Palette Generator
          </h1>
          <div className="relative group">
            <button className="p-2 bg-gray-100 rounded-full">
              <Plus size={20} />
            </button>
          </div>
        </div>
        <div className="flex overflow-x-auto gap-4 pt-4 pb-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center px-4 py-2 rounded-lg whitespace-nowrap ${
                activeTab === item.id
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-600"
              }`}
            >
              {item.icon}
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Sidebar (Desktop) */}
        <div className="hidden md:flex md:w-64 bg-white h-screen shadow-md flex-col">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              Color Palette Generator
            </h1>
            <nav className="space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-8">
          {activeTab === "generate" && (
            <GeneratePalette
              savedPalettes={savedPalettes}
              setSavedPalettes={setSavedPalettes}
            />
          )}

          {activeTab === "custom" && (
            <CustomPalette
              savedPalettes={savedPalettes}
              setSavedPalettes={setSavedPalettes}
            />
          )}

          {activeTab === "extract" && (
            <ImageExtractor
              savedPalettes={savedPalettes}
              setSavedPalettes={setSavedPalettes}
            />
          )}

          {activeTab === "saved" && (
            <SavedPalettes
              savedPalettes={savedPalettes}
              setSavedPalettes={setSavedPalettes}
            />
          )}
        </div>
      </div>
    </div>
  );
}
