import React, { useState } from 'react';
import { Menu, X, Terminal, Search, User, Settings, Bell, Rss, TrendingUp, Shield, Globe, MessageSquare, Activity, MessageCircle, Database, RefreshCw } from 'lucide-react';

interface HeaderProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentSection, onSectionChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const navItems = [
    { id: 'home', label: 'Latest News', icon: Activity, color: 'from-blue-400 to-purple-500' },
    { id: 'news', label: 'All News', icon: MessageSquare, color: 'from-green-400 to-blue-500' },
    { id: 'discussions', label: 'Discussions', icon: MessageCircle, color: 'from-purple-400 to-pink-500' },
    { id: 'trending', label: 'Trending', icon: TrendingUp, color: 'from-orange-400 to-red-500' },
    { id: 'kernel', label: 'Kernel News', icon: Terminal, color: 'from-purple-400 to-pink-500' },
    { id: 'distros', label: 'Distro Updates', icon: Globe, color: 'from-green-400 to-teal-500' },
    { id: 'security', label: 'Security', icon: Shield, color: 'from-red-400 to-orange-500' },
    { id: 'feeds', label: 'RSS Feeds', icon: Rss, color: 'from-yellow-400 to-orange-500' },
    { id: 'sources', label: 'Data Sources', icon: Database, color: 'from-indigo-400 to-purple-500' },
  ];

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      // Trigger a global refresh
      window.location.reload();
    } catch (error) {
      console.error('Refresh failed:', error);
    } finally {
      setTimeout(() => setIsRefreshing(false), 2000);
    }
  };

  return (
    <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-green-500/30 sticky top-0 z-50 shadow-2xl backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Enhanced Logo */}
          <div className="flex items-center space-x-4">
            <div className="relative group">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"></div>
                <Terminal className="h-9 w-9 text-white relative z-10" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full animate-pulse shadow-lg flex items-center justify-center">
                <span className="text-xs">🐧</span>
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                LibreVerse
              </h1>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-green-400 font-medium tracking-wide">🐧 Your Linux Forum Hub</span>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Enhanced Desktop Navigation */}
          <nav className="hidden lg:flex space-x-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={`group relative flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  currentSection === item.id
                    ? `bg-gradient-to-r ${item.color} text-white shadow-lg shadow-green-500/25 scale-105`
                    : 'text-gray-300 hover:bg-gray-800/50 hover:text-white hover:scale-105'
                }`}
              >
                <div className={`p-2 rounded-lg mr-3 ${
                  currentSection === item.id 
                    ? 'bg-white/20' 
                    : 'bg-gray-700/50 group-hover:bg-gray-600/50'
                } transition-colors duration-300`}>
                  <item.icon className="h-4 w-4" />
                </div>
                {item.label}
                {currentSection === item.id && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full"></div>
                )}
              </button>
            ))}
          </nav>

          {/* Enhanced Search and User Actions */}
          <div className="flex items-center space-x-4">
            <div className="relative hidden sm:block group">
              <Search className="h-5 w-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2 group-focus-within:text-green-400 transition-colors" />
              <input
                type="text"
                placeholder="Search Linux discussions..."
                className="bg-gray-800/80 text-white pl-12 pr-6 py-3 rounded-xl border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500/50 focus:outline-none transition-all duration-300 w-80 backdrop-blur-sm"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <kbd className="px-2 py-1 text-xs text-gray-400 bg-gray-700 rounded border">⌘K</kbd>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="relative group">
                <button 
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="p-3 text-gray-400 hover:text-green-400 transition-all duration-300 relative bg-gray-800/50 rounded-xl hover:bg-green-500/20 disabled:opacity-50 hover:scale-110"
                  title="Refresh all data"
                >
                  <RefreshCw className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
                </button>
              </div>
              
              <div className="relative group">
                <button 
                  onClick={() => alert('Notifications feature coming soon!')}
                  className="p-3 text-gray-400 hover:text-white transition-colors relative bg-gray-800/50 rounded-xl hover:bg-gray-700/50 hover:scale-110"
                  title="View notifications"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-lg">3</span>
                </button>
              </div>
              
              <button 
                onClick={() => alert('User profile feature coming soon!')}
                className="p-3 text-gray-400 hover:text-white transition-colors bg-gray-800/50 rounded-xl hover:bg-gray-700/50 hover:scale-110"
                title="User profile"
              >
                <User className="h-5 w-5" />
              </button>
              
              <button 
                onClick={() => alert('Settings feature coming soon!')}
                className="p-3 text-gray-400 hover:text-white transition-colors bg-gray-800/50 rounded-xl hover:bg-gray-700/50 hover:scale-110"
                title="Settings"
              >
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-3 text-gray-400 hover:text-white bg-gray-800/50 rounded-xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Enhanced Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-700/50 bg-gray-900/95 backdrop-blur-lg">
            <div className="px-4 pt-4 pb-6 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onSectionChange(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`flex items-center w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                    currentSection === item.id
                      ? `bg-gradient-to-r ${item.color} text-white shadow-lg`
                      : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
                  }`}
                >
                  <div className={`p-2 rounded-lg mr-3 ${
                    currentSection === item.id 
                      ? 'bg-white/20' 
                      : 'bg-gray-700/50'
                  }`}>
                    <item.icon className="h-4 w-4" />
                  </div>
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;