import React from 'react';
import { Search, Bell } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex-1" />
        
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              data-testid="search-input"
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent w-64"
            />
          </div>
          
          {/* Notifications */}
          <button 
            className="relative p-2 hover:bg-gray-50 rounded-lg transition-colors"
            data-testid="notifications-button"
          >
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-blue-600 rounded-full" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
