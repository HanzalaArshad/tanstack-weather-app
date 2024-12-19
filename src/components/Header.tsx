import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/themeprovider";
import { Moon, Sun } from "lucide-react";
import CitySearch from "./CitySearch";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur py-2 supports-[backdrop-filter]:bg-background/90">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/">
          <img src="/logo2.png" alt="Logo" className="h-20" />
        </Link>
    
       
       <div  className="flex gap-4">
    
        <CitySearch/>


        <div
          className={`flex items-center cursor-pointer  transition-transform duration-500  ${isDark? "rotate-180": "rotate-0"}` }
          onClick={() => setTheme(isDark ? "light" : "dark")}
        >
          {isDark? <Sun className="h-8 w-8 text-yellow-500 rotate-0 transition-all"/>:<Moon className="w-8 h-8 text-blue-200 rotate-0 transition-all"/>}
        </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
