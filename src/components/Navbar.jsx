import { useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";

const navLinks = [
  { id: "generate", label: "Generate" },
  { id: "custom", label: "Custom" },
  { id: "extract", label: "Extract" },
  { id: "saved", label: "Saved" },
];

const Navbar = ({ activeTab, setActiveTab }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const toggleTheme = () => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setDarkMode(!darkMode);
  };

  return (
    <nav className="w-full shadow-md bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Logo" className="h-10 w-10" />
          <span className="text-xl font-bold">Rainbow Canvas</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-6 items-center">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setActiveTab(link.id)}
              className={`px-4 py-2 rounded-xl font-medium transition ${
                activeTab === link.id
                  ? "bg-blue-100 dark:bg-blue-900 text-blue-600"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              {link.label}
            </button>
          ))}

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-full bg-gray-100 dark:bg-gray-700"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                setActiveTab(link.id);
                setIsMobileMenuOpen(false);
              }}
              className={`block w-full text-left px-4 py-2 rounded-xl transition ${
                activeTab === link.id
                  ? "bg-blue-100 dark:bg-blue-900 text-blue-600"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              {link.label}
            </button>
          ))}

          <button
            onClick={toggleTheme}
            className="w-full flex justify-start px-4 py-2 rounded-xl bg-gray-200 dark:bg-gray-700"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            <span className="ml-2">
              {darkMode ? "Light Mode" : "Dark Mode"}
            </span>
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
