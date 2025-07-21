import React, { useState } from 'react';
import { Terminal } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import LinuxNewsHub from './components/LinuxNewsHub';
import TrendingSection from './components/TrendingSection';
import KernelTracker from './components/KernelTracker';
import DistroGrid from './components/DistroGrid';
import SecurityFeed from './components/SecurityFeed';
import RSSFeedManager from './components/RSSFeedManager';
import RealDataFetcher from './components/RealDataFetcher';
import RealTimeDiscussions from './components/RealTimeDiscussions';

function App() {
  const [currentSection, setCurrentSection] = useState('home');

  const renderContent = () => {
    switch (currentSection) {
      case 'home':
        return <LinuxNewsHub />;
      case 'news':
        return <LinuxNewsHub />;
      case 'discussions':
        return <RealTimeDiscussions />;
      case 'trending':
        return <TrendingSection />;
      case 'kernel':
        return <KernelTracker />;
      case 'distros':
        return <DistroGrid />;
      case 'security':
        return <SecurityFeed />;
      case 'feeds':
        return <RSSFeedManager />;
      case 'sources':
        return <RealDataFetcher />;
      default:
        return <LinuxNewsHub />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1f2937',
            color: '#fff',
            border: '1px solid #374151'
          }
        }}
      />
      <Header currentSection={currentSection} onSectionChange={setCurrentSection} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
      <footer className="bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 border-t border-green-500/20 mt-16 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl"></div>
                  <Terminal className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                  LibreVerse
                </h3>
              </div>
              <p className="text-gray-400 text-sm">
                🐧 Your comprehensive Linux community hub for news, discussions, and updates. Join thousands of Linux enthusiasts worldwide!
              </p>
            </div>
            <div>
              <h4 className="text-white font-medium mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="https://kernel.org" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Latest Kernel</a></li>
                <li><a href="https://distrowatch.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Distro Releases</a></li>
                <li><a href="https://nvd.nist.gov" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Security Alerts</a></li>
                <li><button onClick={() => setCurrentSection('discussions')} className="hover:text-white transition-colors">Forum Rules</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-3">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button onClick={() => setCurrentSection('feeds')} className="hover:text-white transition-colors">RSS Feeds</button></li>
                <li><a href="https://github.com/torvalds/linux" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">API Documentation</a></li>
                <li><a href="https://github.com/torvalds/linux/blob/master/CONTRIBUTING" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Contributing</a></li>
                <li><a href="https://github.com/torvalds/linux" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Source Code</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-3">Community</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="https://discord.gg/linux" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Discord</a></li>
                <li><a href="https://matrix.to/#/#linux:matrix.org" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Matrix</a></li>
                <li><a href="https://fosstodon.org" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Mastodon</a></li>
                <li><a href="https://libera.chat" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">IRC</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2025 LibreVerse. Open source, privacy-focused, and community-driven.
            </p>
            <p className="text-gray-500 text-xs mt-2">
              Built with ❤️ for the Linux community by Nakshatra
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;