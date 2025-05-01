import React, { useState, useEffect, useRef } from "react";
import { Copy, Trash, Save, Image } from "lucide-react";
import { hexToHSL, HSLToHex } from "../utils/colorUtils";
import { calculateTextColor } from "../utils/colorUtils";
import { toast } from "react-toastify";


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

    canvas.width = img.width;
    canvas.height = img.height;

    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

    const colorMap = {};
    const pixelCount = imageData.length / 4; 
    const sampleRate = Math.max(1, Math.floor(pixelCount / 10000)); 

    for (let i = 0; i < pixelCount; i += sampleRate) {
      const offset = i * 4;
      const r = imageData[offset];
      const g = imageData[offset + 1];
      const b = imageData[offset + 2];

      if (imageData[offset + 3] < 128) continue;

      const hex = rgbToHex(r, g, b);
      if (colorMap[hex]) {
        colorMap[hex]++;
      } else {
        colorMap[hex] = 1;
      }
    }

    const sortedColors = Object.keys(colorMap)
      .sort((a, b) => colorMap[b] - colorMap[a])
      .slice(0, 20);

    const distinctColors = [];
    for (const color of sortedColors) {
      if (!distinctColors.some((c) => isColorSimilar(color, c))) {
        distinctColors.push(color);
        if (distinctColors.length >= 10) break;
      }
    }

    setExtractedColors(distinctColors);
    setSelectedColors([]); 
  };

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
  const isColorSimilar = (color1, color2) => {
    const c1 = hexToHSL(color1);
    const c2 = hexToHSL(color2);

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
      
      toast.error("Please select at least one color for your palette", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      
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

   
    toast.success(`Image palette "${name}" saved successfully!`, {
      position: "top-right",
      autoClose: 2000,
      theme: "light",
      
    });
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



export default ImageExtractor; 