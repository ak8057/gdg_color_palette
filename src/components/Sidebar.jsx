import React , {useState , useEffect} from 'react'
import {
  Palette,
  UserPlus,
  Grid,
  Image,
  Plus,
  Menu

} from "lucide-react";
import GeneratePalette from "./GeneratePalette";
import CustomPalette from "./CustomPalette";
import ImageExtractor from "./ImageExtractor";
import SavedPalettes from "./SavedPalettes";




export const Sidebar = () => {
  const [activeTab, setActiveTab] = useState("generate");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [savedPalettes, setSavedPalettes] = useState(() => {
    const storedPalettes = localStorage.getItem("colorPalettes");
    return storedPalettes ? JSON.parse(storedPalettes) : [];
  });

  useEffect(() => {
    localStorage.setItem("colorPalettes", JSON.stringify(savedPalettes));
  }, [savedPalettes]);

  const navItems = [
    { id: "generate", label: "Generate Palette", icon: <Palette size={20} /> },
    { id: "custom", label: "Custom Palette", icon: <UserPlus size={20} /> },
    { id: "extract", label: "Extract from Image", icon: <Image size={20} /> },
    { id: "saved", label: "Saved Palettes", icon: <Grid size={20} /> },
  ];

   return (
     <div className="min-h-screen bg-[#f5f7fa] font-sans text-gray-800">
       {/* Mobile Navigation */}
       <div className="md:hidden p-4 shadow-inner bg-[#f5f7fa] flex items-center justify-between">
         <h1 className="text-lg font-bold text-gray-700">Rainbow Canvas</h1>
         <button
           onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
           className="p-2 rounded-full bg-[#e0e5ec] shadow-inner hover:shadow-md transition"
         >
           {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
         </button>
       </div>

       {isMobileMenuOpen && (
         <div className="md:hidden px-4 py-2 space-y-2 bg-[#f5f7fa] shadow-md">
           {navItems.map((item) => (
             <button
               key={item.id}
               onClick={() => {
                 setActiveTab(item.id);
                 setIsMobileMenuOpen(false);
               }}
               className={`w-full px-4 py-2 rounded-xl text-left shadow-inner transition ${
                 activeTab === item.id
                   ? "bg-[#dde5f0] text-blue-600"
                   : "text-gray-700 hover:bg-[#e7ecf3]"
               }`}
             >
               <div className="flex items-center gap-2">
                 {item.icon}
                 <span>{item.label}</span>
               </div>
             </button>
           ))}
         </div>
       )}

       <div className="flex flex-col md:flex-row">
         {/* Desktop Sidebar */}
         <div className="hidden md:flex md:w-64 bg-[#f5f7fa] h-screen p-6 shadow-inner flex-col">
           <div className='flex items-center mb-6'>
             <img src="/logo.png" alt="Logo" className="h-16" />
             <h1 className="text-2xl font-bold text-gray-700">
               Rainbow Canvas
             </h1>
           </div>

           <nav className="space-y-3">
             {navItems.map((item) => (
               <button
                 key={item.id}
                 onClick={() => setActiveTab(item.id)}
                 className={`w-full px-4 py-3 rounded-xl text-left transition shadow-inner ${
                   activeTab === item.id
                     ? "bg-[#dde5f0] text-blue-600"
                     : "text-gray-700 hover:bg-[#e7ecf3]"
                 }`}
               >
                 <div className="flex items-center gap-3">
                   {item.icon}
                   <span>{item.label}</span>
                 </div>
               </button>
             ))}
           </nav>
         </div>

         {/* Main Content */}
         <div className="flex-1 p-6 md:p-10 bg-[#f5f7fa]">
           <div className="rounded-3xl shadow-inner bg-white p-6">
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
     </div>
   );
}
