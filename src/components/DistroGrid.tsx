import React from 'react';
import { Download, Calendar, Shield, Info, Star, Users, Globe, ExternalLink } from 'lucide-react';
import { DistroInfo } from '../types';

const DistroGrid: React.FC = () => {
  const distros: DistroInfo[] = [
    {
      name: 'Ubuntu',
      version: '24.04 LTS',
      codename: 'Noble Numbat',
      releaseDate: '2024-04-25',
      supportUntil: '2034-04-25',
      downloadUrl: 'https://ubuntu.com/download/desktop',
      logo: 'https://assets.ubuntu.com/v1/29985a98-ubuntu-logo32.png',
      description: 'The most popular Linux distribution for desktop and server with excellent hardware support and user-friendly interface.',
      popularity: 95,
      category: 'desktop'
    },
    {
      name: 'Debian',
      version: '12.0',
      codename: 'Bookworm',
      releaseDate: '2023-06-10',
      supportUntil: '2028-06-10',
      downloadUrl: 'https://www.debian.org/download',
      logo: 'https://www.debian.org/logos/openlogo-nd-25.png',
      description: 'The universal operating system, known for rock-solid stability, security, and extensive package repository.',
      popularity: 88,
      category: 'server'
    },
    {
      name: 'Fedora',
      version: '40',
      codename: 'Workstation',
      releaseDate: '2024-04-23',
      supportUntil: '2025-05-13',
      downloadUrl: 'https://fedoraproject.org/workstation/download/',
      logo: 'https://fedoraproject.org/static/images/fedora-logotext.png',
      description: 'Innovation platform with cutting-edge features, latest packages, and excellent developer tools.',
      popularity: 82,
      category: 'desktop'
    },
    {
      name: 'Arch Linux',
      version: 'Rolling',
      codename: 'Rolling Release',
      releaseDate: '2024-10-01',
      supportUntil: 'Ongoing',
      downloadUrl: 'https://archlinux.org/download/',
      logo: 'https://archlinux.org/static/logos/archlinux-logo-dark-90dpi.ebdee92a15b3.png',
      description: 'A simple, lightweight distribution for advanced users who want complete control and customization.',
      popularity: 75,
      category: 'desktop'
    },
    {
      name: 'openSUSE',
      version: '15.6',
      codename: 'Leap',
      releaseDate: '2024-06-12',
      supportUntil: '2025-12-31',
      downloadUrl: 'https://get.opensuse.org/leap/',
      logo: 'https://en.opensuse.org/images/c/cd/Button-filled-colour.png',
      description: 'Professional Linux distribution with excellent YaST configuration tools and enterprise features.',
      popularity: 70,
      category: 'enterprise'
    },
    {
      name: 'Linux Mint',
      version: '22',
      codename: 'Wilma',
      releaseDate: '2024-07-29',
      supportUntil: '2029-07-29',
      downloadUrl: 'https://linuxmint.com/download.php',
      logo: 'https://linuxmint.com/img/logo.png',
      description: 'Elegant, easy-to-use desktop Linux distribution perfect for Windows migrants and beginners.',
      popularity: 85,
      category: 'desktop'
    },
    {
      name: 'Kali Linux',
      version: '2024.3',
      codename: 'Penetration Testing',
      releaseDate: '2024-08-15',
      supportUntil: '2025-08-15',
      downloadUrl: 'https://www.kali.org/get-kali/',
      logo: 'https://www.kali.org/images/kali-logo.svg',
      description: 'Advanced penetration testing platform with 600+ security tools for ethical hackers and security professionals.',
      popularity: 78,
      category: 'security'
    },
    {
      name: 'Manjaro',
      version: '23.1',
      codename: 'Vulcan',
      releaseDate: '2024-09-10',
      supportUntil: 'Rolling',
      downloadUrl: 'https://manjaro.org/download/',
      logo: 'https://manjaro.org/img/logo.svg',
      description: 'User-friendly Arch-based distribution with easy installation and pre-configured desktop environments.',
      popularity: 72,
      category: 'desktop'
    },
    {
      name: 'Pop!_OS',
      version: '22.04 LTS',
      codename: 'System76',
      releaseDate: '2024-04-21',
      supportUntil: '2027-04-21',
      downloadUrl: 'https://pop.system76.com/',
      logo: 'https://pop.system76.com/icon-192.png',
      description: 'Ubuntu-based OS optimized for developers and creators with excellent NVIDIA support and productivity features.',
      popularity: 80,
      category: 'desktop'
    }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'desktop': return '🖥️';
      case 'server': return '🖥️';
      case 'enterprise': return '🏢';
      case 'security': return '🔒';
      default: return '🐧';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'desktop': return 'from-blue-500 to-purple-600';
      case 'server': return 'from-green-500 to-blue-600';
      case 'enterprise': return 'from-purple-500 to-indigo-600';
      case 'security': return 'from-red-500 to-orange-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getDistroEmoji = (name: string) => {
    const emojiMap: { [key: string]: string } = {
      'Ubuntu': '🟠',
      'Debian': '🔴',
      'Fedora': '🔵',
      'Arch Linux': '⚡',
      'Linux Mint': '🟢',
      'openSUSE': '🦎',
      'Kali Linux': '🐉',
      'Manjaro': '💚',
      'Pop!_OS': '🚀'
    };
    return emojiMap[name] || '🐧';
  };

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
            <Globe className="h-10 w-10 text-white" />
          </div>
          <div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              🐧 Linux Distributions
            </h2>
            <p className="text-gray-400 text-lg">Discover the perfect Linux distro for your needs</p>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="flex justify-center space-x-8 mt-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400">{distros.length}</div>
            <div className="text-sm text-gray-400">Popular Distros</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400">4</div>
            <div className="text-sm text-gray-400">Categories</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400">100%</div>
            <div className="text-sm text-gray-400">Free & Open</div>
          </div>
        </div>
      </div>

      {/* Enhanced Distro Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {distros.map((distro, index) => (
          <div
            key={index}
            className="group bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 rounded-2xl border border-gray-700 hover:border-green-500 transition-all duration-300 p-8 hover:shadow-2xl hover:shadow-green-500/20 hover:scale-105"
          >
            {/* Distro Header with Logo */}
            <div className="flex items-center space-x-4 mb-6">
              <div className={`w-20 h-20 bg-gradient-to-br ${getCategoryColor(distro.category)} rounded-2xl flex items-center justify-center shadow-xl relative overflow-hidden group-hover:scale-110 transition-transform duration-300`}>
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                <div className="text-3xl font-bold text-white relative z-10">
                  {getDistroEmoji(distro.name)}
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-400 rounded-full opacity-80 animate-pulse"></div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white flex items-center group-hover:text-green-400 transition-colors">
                  {distro.name}
                  <span className="ml-3 text-sm bg-green-500/20 text-green-400 px-3 py-1 rounded-full">
                    {getCategoryIcon(distro.category)} {distro.category}
                  </span>
                </h3>
                <p className="text-green-400 text-lg font-semibold">{distro.version}</p>
                <p className="text-gray-400 text-sm">{distro.codename}</p>
              </div>
            </div>

            {/* Popularity Bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">Popularity</span>
                <span className="text-white font-medium">{distro.popularity}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${distro.popularity}%` }}
                ></div>
              </div>
            </div>

            {/* Distro Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-gray-300 text-sm">
                <Calendar className="h-4 w-4 mr-3 text-blue-400" />
                <span>Released: {formatDate(distro.releaseDate)}</span>
              </div>
              <div className="flex items-center text-gray-300 text-sm">
                <Shield className="h-4 w-4 mr-3 text-green-400" />
                <span>Support until: {formatDate(distro.supportUntil)}</span>
              </div>
              <div className="flex items-center text-gray-300 text-sm">
                <Users className="h-4 w-4 mr-3 text-purple-400" />
                <span>Category: {distro.category}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed">
              {distro.description}
            </p>

            {/* Action Buttons */}
            <div className="space-y-3">
              <a
                href={distro.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => window.open(distro.downloadUrl, '_blank', 'noopener,noreferrer')}
                className="flex items-center justify-center w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-3 px-6 rounded-xl transition-all duration-300 font-medium shadow-lg hover:shadow-xl group-hover:scale-105"
              >
                <Download className="h-5 w-5 mr-2" />
                Download {distro.name}
              </a>
              <div className="flex space-x-2">
                <button className="flex-1 flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white py-2 px-4 rounded-lg transition-colors text-sm">
                  onClick={() => window.open(distro.downloadUrl, '_blank', 'noopener,noreferrer')}
                  <Info className="h-4 w-4 mr-1" />
                  Details
                </button>
                <button className="flex-1 flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white py-2 px-4 rounded-lg transition-colors text-sm">
                  onClick={() => window.open(`https://${distro.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.org`, '_blank', 'noopener,noreferrer')}
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Website
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Stats Section */}
      <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 rounded-2xl border border-gray-700 p-8 shadow-2xl">
        <h3 className="text-2xl font-bold text-white mb-6 text-center">📊 Distribution Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-xl border border-blue-500/30">
            <div className="text-3xl font-bold text-blue-400">{distros.filter(d => d.category === 'desktop').length}</div>
            <div className="text-sm text-gray-400">Desktop Distros</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-green-500/20 to-blue-600/20 rounded-xl border border-green-500/30">
            <div className="text-3xl font-bold text-green-400">{distros.filter(d => d.version.includes('LTS')).length}</div>
            <div className="text-sm text-gray-400">LTS Releases</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-yellow-500/20 to-orange-600/20 rounded-xl border border-yellow-500/30">
            <div className="text-3xl font-bold text-yellow-400">{distros.filter(d => d.version.includes('Rolling')).length}</div>
            <div className="text-sm text-gray-400">Rolling Release</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-purple-500/20 to-pink-600/20 rounded-xl border border-purple-500/30">
            <div className="text-3xl font-bold text-purple-400">100%</div>
            <div className="text-sm text-gray-400">Free & Open</div>
          </div>
        </div>
      </div>

      {/* Recommendation Section */}
      <div className="bg-gradient-to-r from-green-600/10 via-blue-600/10 to-purple-600/10 rounded-2xl border border-green-500/30 p-8">
        <h3 className="text-2xl font-bold text-white mb-4 text-center">🎯 Find Your Perfect Distro</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-gray-800/50 rounded-xl">
            <div className="text-4xl mb-3">🚀</div>
            <h4 className="text-lg font-semibold text-white mb-2">Beginners</h4>
            <p className="text-gray-400 text-sm mb-3">New to Linux? Start here!</p>
            <div className="text-green-400 font-medium">Ubuntu • Linux Mint • Pop!_OS</div>
          </div>
          <div className="text-center p-6 bg-gray-800/50 rounded-xl">
            <div className="text-4xl mb-3">⚡</div>
            <h4 className="text-lg font-semibold text-white mb-2">Advanced Users</h4>
            <p className="text-gray-400 text-sm mb-3">Want full control?</p>
            <div className="text-blue-400 font-medium">Arch Linux • Manjaro • Fedora</div>
          </div>
          <div className="text-center p-6 bg-gray-800/50 rounded-xl">
            <div className="text-4xl mb-3">🏢</div>
            <h4 className="text-lg font-semibold text-white mb-2">Enterprise</h4>
            <p className="text-gray-400 text-sm mb-3">Business & servers</p>
            <div className="text-purple-400 font-medium">Debian • openSUSE • Ubuntu LTS</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DistroGrid;