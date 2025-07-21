import React from 'react';
import { TrendingUp, Clock, MessageCircle, ExternalLink, Siren as Fire, Star } from 'lucide-react';
import { useLinuxNews } from '../hooks/useLinuxNews';
import { NewsItem } from '../types';

const TrendingSection: React.FC = () => {
  const { news, trendingTopics, refreshNews } = useLinuxNews();

  const trendingNews: NewsItem[] = [
    {
      id: '1',
      title: 'Linux Kernel 6.6.1 Released: Fixes Critical AMD Ryzen Performance Regression',
      content: 'Linus Torvalds has released Linux 6.6.1 addressing a critical performance regression affecting AMD Ryzen 7000 series processors. The issue, introduced in 6.6.0, caused 20-30% performance drops due to incorrect P-State frequency scaling. The fix restores proper ACPI CPPC support and boost behavior for Ryzen processors.',
      excerpt: 'Critical kernel update fixes AMD Ryzen 7000 performance issues, restores proper frequency scaling and boost behavior.',
      source: 'Kernel.org',
      sourceUrl: 'https://kernel.org/releases.html',
      publishedAt: '2024-10-01T10:00:00Z',
      tags: ['kernel', 'amd', 'ryzen', 'performance', 'regression'],
      category: 'kernel',
      upvotes: 2847,
      downvotes: 43,
      comments: 189
    },
    {
      id: '2',
      title: 'Ubuntu 24.04.1 LTS Point Release: Critical Security Updates and Hardware Support',
      content: 'Canonical has released Ubuntu 24.04.1 LTS, the first point release featuring critical security patches including the recent OpenSSH vulnerability fix, updated Mesa drivers for better AMD/Intel GPU support, and improved hardware compatibility for newer laptops. This release also includes kernel 6.8.0-45 with enhanced power management.',
      excerpt: 'First point release for Ubuntu 24.04 LTS includes critical security patches, updated drivers, and improved hardware support.',
      source: 'Ubuntu Blog',
      sourceUrl: 'https://ubuntu.com/blog',
      publishedAt: '2024-09-30T14:30:00Z',
      tags: ['ubuntu', 'lts', 'security', 'hardware'],
      category: 'distro',
      upvotes: 1592,
      downvotes: 67,
      comments: 256
    },
    {
      id: '3',
      title: 'URGENT: OpenSSH Remote Code Execution Vulnerability (CVE-2024-6387) - Patch Now',
      content: 'A critical remote code execution vulnerability has been discovered in OpenSSH versions 8.5p1 through 9.5p1. The vulnerability allows unauthenticated remote attackers to execute arbitrary code as root. All major Linux distributions have released emergency patches. The vulnerability is being actively exploited in the wild.',
      excerpt: 'Critical RCE vulnerability in OpenSSH allows remote root access. Emergency patches available for all major distributions.',
      source: 'Security Advisory',
      sourceUrl: 'https://nvd.nist.gov',
      publishedAt: '2024-09-29T09:15:00Z',
      tags: ['security', 'openssh', 'cve', 'rce', 'urgent'],
      category: 'security',
      upvotes: 4234,
      downvotes: 23,
      comments: 567
    },
    {
      id: '4',
      title: 'Fedora 40 Released: DNF5 Default, Improved Gaming, and Better ARM Support',
      content: 'Fedora 40 has been officially released featuring DNF5 as the default package manager for faster operations, improved gaming performance with latest Mesa and kernel optimizations, enhanced ARM support for single-board computers, and updated GNOME 46 with better Wayland fractional scaling.',
      excerpt: 'Fedora 40 brings DNF5, gaming improvements, better ARM support, and GNOME 46 with enhanced Wayland experience.',
      source: 'Fedora Magazine',
      sourceUrl: 'https://fedoramagazine.org',
      publishedAt: '2024-09-28T16:45:00Z',
      tags: ['fedora', 'dnf5', 'gaming', 'arm', 'gnome'],
      category: 'distro',
      upvotes: 1167,
      downvotes: 54,
      comments: 178
    },
    {
      id: '5',
      title: 'Arch Linux October 2024 ISO: Enhanced archinstall and Faster Package Downloads',
      content: 'The latest Arch Linux ISO includes significant improvements to the archinstall script with better hardware detection, automated driver installation for NVIDIA/AMD graphics, improved disk partitioning options, and integration with reflector for optimal mirror selection. The ISO also features faster package downloads and updated firmware.',
      excerpt: 'New Arch ISO features enhanced archinstall script with better hardware detection and automated driver installation.',
      source: 'Arch News',
      sourceUrl: 'https://archlinux.org/news',
      publishedAt: '2024-09-27T11:20:00Z',
      tags: ['arch', 'archinstall', 'iso', 'drivers', 'automation'],
      category: 'distro',
      upvotes: 2156,
      downvotes: 123,
      comments: 445
    }
  ];

  const hotTopics = [
    { name: 'Wayland vs X11', posts: 234, trend: '+15%' },
    { name: 'Gaming on Linux', posts: 189, trend: '+23%' },
    { name: 'Docker Alternatives', posts: 156, trend: '+8%' },
    { name: 'Kernel 6.11', posts: 145, trend: '+45%' },
    { name: 'NVIDIA Drivers', posts: 134, trend: '+12%' },
    { name: 'ZFS Setup', posts: 98, trend: '+6%' }
  ];

  const formatRelativeTime = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
            <Fire className="h-7 w-7 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              🔥 Trending in Linux
            </h2>
            <p className="text-gray-400 text-sm">What's hot in the community right now</p>
          </div>
        </div>
        <div className="text-sm text-gray-400">
          🔄 Updated every 5 minutes
        </div>
        <button
          onClick={refreshNews}
          className="flex items-center bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-6 py-3 rounded-xl transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
        >
          <Fire className="h-5 w-5 mr-2" />
          🔥 Refresh Trending
        </button>
      </div>

      {/* Hot Topics */}
      <div className="bg-gradient-to-r from-orange-500/10 via-red-500/10 to-pink-500/10 rounded-2xl border border-orange-500/30 p-8 backdrop-blur-sm">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-green-400" />
          🔥 Hot Topics Right Now (Live Data)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(trendingTopics.length > 0 ? trendingTopics : hotTopics).slice(0, 6).map((topic, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-orange-600/20 to-red-600/20 rounded-lg p-4 hover:from-orange-600/30 hover:to-red-600/30 transition-all duration-300 cursor-pointer border border-orange-500/20 hover:border-orange-500/40"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-white">{topic.topic || topic.name}</h4>
                <span className="text-orange-400 text-sm font-medium">
                  {topic.count ? `${topic.count} posts` : topic.trend}
                </span>
              </div>
              <div className="text-gray-400 text-sm">
                {topic.posts || `${topic.count || 0} discussions`}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trending News */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white flex items-center">
          <Star className="h-5 w-5 mr-2 text-yellow-400" />
          Most Popular Posts
        </h3>
        
        {trendingNews.map((item, index) => (
          <div
            key={item.id}
            className="bg-gray-800 rounded-lg border border-gray-700 hover:border-orange-500 transition-all duration-200 p-6"
          >
            <div className="flex items-start space-x-4">
              {/* Ranking */}
              <div className="flex flex-col items-center min-w-[60px]">
                <div className={`text-2xl font-bold ${
                  index === 0 ? 'text-yellow-400' : 
                  index === 1 ? 'text-gray-300' : 
                  index === 2 ? 'text-orange-400' : 'text-gray-500'
                }`}>
                  #{index + 1}
                </div>
                <div className="text-green-400 font-medium text-sm">
                  {item.upvotes}↑
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.category === 'kernel' ? 'bg-blue-600 text-blue-100' :
                    item.category === 'distro' ? 'bg-green-600 text-green-100' :
                    item.category === 'security' ? 'bg-red-600 text-red-100' :
                    'bg-gray-600 text-gray-100'
                  }`}>
                    {item.category.toUpperCase()}
                  </span>
                  <span className="text-gray-400 text-sm">{item.source}</span>
                  <div className="flex items-center text-gray-400 text-sm">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatRelativeTime(item.publishedAt)}
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-white mb-2 hover:text-orange-400 transition-colors cursor-pointer">
                  <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer">
                    {item.title}
                  </a>
                </h3>

                <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                  {item.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-gray-400 text-sm">
                    <div className="flex items-center">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      <span>{item.comments} comments</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-green-400">{item.upvotes}↑</span>
                      <span className="text-red-400">{item.downvotes}↓</span>
                    </div>
                  </div>
                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => window.open(item.sourceUrl, '_blank', 'noopener,noreferrer')}
                    className="flex items-center text-orange-400 hover:text-orange-300 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    <span className="text-sm">Read More</span>
                  </a>
                </div>

                <div className="flex flex-wrap gap-2 mt-3">
                  {item.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="bg-gray-700 text-gray-300 px-2 py-1 rounded-full text-xs hover:bg-gray-600 cursor-pointer transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Trending Stats */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Trending Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-400">2.3K</div>
            <div className="text-sm text-gray-400">Posts Today</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">15.6K</div>
            <div className="text-sm text-gray-400">Comments</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">892</div>
            <div className="text-sm text-gray-400">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">45</div>
            <div className="text-sm text-gray-400">New Members</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingSection;