import React , {useState , useEffect} from 'react'
import {
  Palette,
  UserPlus,
  Grid,
  Image,
  Plus,
  X,
  Menu

} from "lucide-react";
import GeneratePalette from "./GeneratePalette";
import CustomPalette from "./CustomPalette";
import ImageExtractor from "./ImageExtractor";
import SavedPalettes from "./SavedPalettes";
import ThemeToggle from "./ThemeToggle";
// import Navbar from "./Navbar";




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
     <div className="min-h-screen bg-white dark:bg-slate-900 text-gray-800 dark:text-gray-100 font-sans">
       {/* Navbar access : disabled */}
       {/* <Navbar activeTab={activeTab} setActiveTab={setActiveTab} /> */}

       {/* Mobile Navigation */}
       <div className="md:hidden p-4 shadow-inner bg-white dark:bg-slate-900 flex items-center justify-between">
         <h1 className="text-lg font-bold">Rainbow Canvas</h1>
         <button
           onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
           className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 shadow-inner hover:shadow-md transition"
         >
           {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
         </button>
       </div>

       {/* Mobile Menu */}
       {isMobileMenuOpen && (
         <div className="md:hidden px-4 py-2 space-y-2 bg-white dark:bg-slate-800 shadow-md">
           {navItems.map((item) => (
             <button
               key={item.id}
               onClick={() => {
                 setActiveTab(item.id);
                 setIsMobileMenuOpen(false);
               }}
               className={`w-full px-4 py-2 rounded-xl text-left shadow-inner transition ${
                 activeTab === item.id
                   ? "bg-blue-100 dark:bg-blue-900 text-blue-600"
                   : "hover:bg-gray-100 dark:hover:bg-gray-700"
               }`}
             >
               <div className="flex items-center gap-2">
                 {item.icon}
                 <span>{item.label}</span>
               </div>
             </button>
           ))}
           <div className="mt-5">
             <ThemeToggle />
           </div>
         </div>
       )}

       <div className="flex flex-col md:flex-row">
         {/* Desktop Sidebar */}
         <div className="hidden md:flex md:w-64 bg-white dark:bg-slate-900 h-screen p-6 shadow-inner flex-col">
           <div className="flex items-center mb-6">
             <img src="/logo.png" alt="Logo" className="h-16" />
             <h1 className="text-2xl font-bold ml-2">Rainbow Canvas</h1>
           </div>

           <nav className="space-y-3">
             {navItems.map((item) => (
               <button
                 key={item.id}
                 onClick={() => setActiveTab(item.id)}
                 className={`w-full px-4 py-3 rounded-xl text-left transition shadow-inner ${
                   activeTab === item.id
                     ? "bg-blue-100 dark:bg-blue-900 text-blue-600"
                     : "hover:bg-gray-100 dark:hover:bg-gray-700"
                 }`}
               >
                 <div className="flex items-center gap-3">
                   {item.icon}
                   <span>{item.label}</span>
                 </div>
               </button>
             ))}
           </nav>
           <div className="mt-5">
             <ThemeToggle />
           </div>
         </div>

         {/* Main Content */}
         <div className="flex-1 p-6 md:p-10 bg-white dark:bg-slate-900">
           <div className="rounded-3xl shadow-inner bg-gray-100 dark:bg-blue-950 p-6 transition">
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
