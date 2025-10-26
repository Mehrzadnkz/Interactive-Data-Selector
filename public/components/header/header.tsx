// 🛍️ USER MANAGEMENT Header Component
import React, { useEffect } from "react";

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearch: (query: string) => void;
  userCount: number;
  userLimit: number;
  setUserLimit: (limit: number) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  searchQuery, 
  setSearchQuery, 
  onSearch, 
  userCount, 
  userLimit, 
  setUserLimit
}) => {
  
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = saved || (prefersDark ? "dark" : "light");
    const html = document.documentElement;
    html.classList.toggle("dark", theme === "dark");
    html.style.colorScheme = theme;
  }, []);

  const toggleDarkMode = () => {
    const html = document.documentElement;
    const isDark = html.classList.toggle("dark");
    const theme = isDark ? "dark" : "light";
    localStorage.setItem("theme", theme);
    html.style.colorScheme = theme;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(searchQuery);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* لوگو */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-lg font-bold text-gray-800 dark:text-white">👥 User Manager</span>
          </div>
          
          {/* جستجو */}
          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="جستجو در کاربران..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full px-4 py-2 pl-10 text-sm border border-gray-300 dark:border-gray-600 rounded-lg 
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-white 
                         placeholder-gray-500 dark:placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <span className="text-gray-400 text-lg">🔍</span>
              </div>
            </div>
          </div>

          {/* کنترل‌ها */}
          <div className="flex items-center gap-3 shrink-0">
            {/* تعداد کاربران */}
            <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span className="bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded-full">
                📊 {userCount}
              </span>
            </div>

            {/* انتخابگر تعداد */}
            <select 
              value={userLimit} 
              onChange={(e) => setUserLimit(Number(e.target.value))}
              className="text-sm border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                       focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
              <option value={50}>50</option>
            </select>

            {/* دکمه تم */}
            <button 
              onClick={toggleDarkMode} 
              className="text-lg p-2 rounded-lg border border-gray-300 dark:border-gray-600 
                       hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              🌓
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;