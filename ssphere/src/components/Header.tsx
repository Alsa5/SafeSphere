import React from "react";
import { Shield, Moon, Sun, Menu, User, MapPin, List, Plus } from "lucide-react";
import appLogo from "/Users/Sakthi Alagappan/ssphere/src/logo.png"; // Ensure the correct path

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  currentPage: "feed" | "map";
  setCurrentPage: (page: "feed" | "map") => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode, currentPage, setCurrentPage }) => {
  return (
    <header className={`sticky top-0 z-20 ${darkMode ? "bg-gray-900 border-b border-gray-700" : "bg-white border-b border-gray-300"} py-3 px-6 shadow-md`}>
      
      <div className="flex justify-between items-center">
        
        {/* Left Section: Logo + App Name */}
        <div className="flex items-center space-x-2">
          <img src={appLogo} alt="Safe-Sphere Logo" className="w-20 h-20 rounded-full" />
          <h1 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>Safe-Sphere</h1>
          
        </div>

        {/* Middle Section: Navigation Tabs */}
        <nav className="hidden md:flex space-x-6">
          <button
            onClick={() => setCurrentPage("feed")}
            className={`flex items-center px-4 py-2 rounded-lg font-semibold transition duration-200 ${currentPage === "feed" ? "bg-blue-600 text-white" : darkMode ? "text-gray-400 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-200"}`}
          >
            <List className="mr-2" size={18} />
            Feed
          </button>

          <button
            onClick={() => setCurrentPage("map")}
            className={`flex items-center px-4 py-2 rounded-lg font-semibold transition duration-200 ${currentPage === "map" ? "bg-blue-600 text-white" : darkMode ? "text-gray-400 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-200"}`}
          >
            <MapPin className="mr-2" size={18} />
            Secure Routes
          </button>
        </nav>

        {/* Right Section: Controls */}
        <div className="flex items-center space-x-4">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full transition duration-200 ${darkMode ? "bg-gray-700 text-yellow-400 hover:bg-gray-600" : "bg-gray-200 text-gray-800 hover:bg-gray-300"}`}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

         
          {/* Profile Menu (Placeholder for future features) */}
          <button className="relative p-2 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600">
            <User size={20} className="text-gray-700 dark:text-gray-300" />
          </button>

          {/* Mobile Menu */}
          <button className="md:hidden p-2 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600">
            <Menu size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
