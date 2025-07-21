import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { 
  Rss, 
  Plus, 
  Trash2, 
  RefreshCw, 
  ExternalLink, 
  Clock, 
  CheckCircle, 
  XCircle,
  Settings,
  Globe
} from 'lucide-react';
import { RSSSource, NewsItem } from '../types';

const RSSFeedManager: React.FC = () => {
  const [showAddFeed, setShowAddFeed] = useState(false);
  const [newFeedUrl, setNewFeedUrl] = useState('');
  const [newFeedName, setNewFeedName] = useState('');

  const rssFeeds: RSSSource[] = [
    {
      name: 'Kernel.org News',
      url: 'https://www.kernel.org/feeds/kdist.xml',
      category: 'Kernel',
      lastFetched: '2024-10-01T14:30:00Z',
      isActive: true
    },
    {
      name: 'Ubuntu Blog',
      url: 'https://ubuntu.com/blog/feed',
      category: 'Distro',
      lastFetched: '2024-10-01T14:25:00Z',
      isActive: true
    },
    {
      name: 'Fedora Magazine',
      url: 'https://fedoramagazine.org/feed/',
      category: 'Distro',
      lastFetched: '2024-10-01T14:20:00Z',
      isActive: true
    },
    {
      name: 'Arch Linux News',
      url: 'https://archlinux.org/feeds/news/',
      category: 'Distro',
      lastFetched: '2024-10-01T14:15:00Z',
      isActive: true
    },
    {
      name: 'Debian News',
      url: 'https://www.debian.org/News/news',
      category: 'Distro',
      lastFetched: '2024-10-01T14:10:00Z',
      isActive: false
    },
    {
      name: 'Linux Security Blog',
      url: 'https://linuxsecurity.com/rss.xml',
      category: 'Security',
      lastFetched: '2024-10-01T14:05:00Z',
      isActive: true
    },
    {
      name: 'Phoronix',
      url: 'https://www.phoronix.com/rss.php',
      category: 'Hardware',
      lastFetched: '2024-10-01T14:00:00Z',
      isActive: true
    },
    {
      name: 'OMG! Ubuntu!',
      url: 'https://www.omgubuntu.co.uk/feed',
      category: 'News',
      lastFetched: '2024-10-01T13:55:00Z',
      isActive: true
    }
  ];

  const recentArticles: NewsItem[] = [
    {
      id: '1',
      title: 'Linux Kernel 6.6.1 Fixes Critical AMD Ryzen 7000 Performance Issues',
      excerpt: 'Emergency kernel update addresses 20-30% performance regression in AMD Ryzen 7000 series processors caused by incorrect P-State frequency scaling.',
      source: 'Kernel.org News',
      sourceUrl: 'https://kernel.org',
      publishedAt: '2024-10-01T10:00:00Z',
      tags: ['kernel', 'amd', 'performance', 'regression'],
      category: 'kernel',
      upvotes: 834,
      downvotes: 23,
      comments: 145
    },
    {
      id: '2',
      title: 'Ubuntu 24.04.1 LTS Point Release Includes Critical Security Patches',
      excerpt: 'First point release for Ubuntu 24.04 LTS features OpenSSH vulnerability fixes, updated Mesa drivers, and improved hardware compatibility.',
      source: 'Ubuntu Blog',
      sourceUrl: 'https://ubuntu.com',
      publishedAt: '2024-09-30T15:30:00Z',
      tags: ['ubuntu', 'lts', 'security', 'mesa'],
      category: 'distro',
      upvotes: 589,
      downvotes: 18,
      comments: 167
    },
    {
      id: '3',
      title: 'Mesa 24.2.4 Released: Major Performance Boost for AMD RDNA3 Gaming',
      excerpt: 'Latest Mesa update delivers 15-20% performance improvements for AMD RX 7000 series graphics cards in Vulkan games and better OpenGL compatibility.',
      source: 'Phoronix',
      sourceUrl: 'https://phoronix.com',
      publishedAt: '2024-09-30T12:15:00Z',
      tags: ['mesa', 'amd', 'rdna3', 'vulkan', 'gaming'],
      category: 'software',
      upvotes: 456,
      downvotes: 12,
      comments: 89
    },
    {
      id: '4',
      title: 'GNOME 45.1 Stable Release: Improved Wayland Multi-Monitor Support',
      excerpt: 'GNOME 45.1 brings significant improvements to multi-monitor setups on Wayland, better fractional scaling, and enhanced performance.',
      source: 'GNOME News',
      sourceUrl: 'https://gnome.org',
      publishedAt: '2024-09-29T14:20:00Z',
      tags: ['gnome', 'wayland', 'multimonitor', 'scaling'],
      category: 'software',
      upvotes: 234,
      downvotes: 7,
      comments: 56
    },
    {
      id: '5',
      title: 'Proton 8.0-5 Brings Better Anti-Cheat Support and Performance',
      excerpt: 'Latest Proton update improves compatibility with EasyAntiCheat games and delivers performance optimizations for Steam Deck.',
      source: 'Steam News',
      sourceUrl: 'https://steamcommunity.com',
      publishedAt: '2024-09-28T16:45:00Z',
      tags: ['proton', 'gaming', 'anticheat', 'steamdeck'],
      category: 'software',
      upvotes: 678,
      downvotes: 15,
      comments: 123
    }
  ];

  const handleAddFeed = () => {
    if (newFeedUrl.trim() && newFeedName.trim()) {
      // Validate URL format
      try {
        new URL(newFeedUrl);
      } catch (error) {
        alert('Please enter a valid URL');
        return;
      }
      
      const newFeed: RSSSource = {
        name: newFeedName,
        url: newFeedUrl,
        category: 'News',
        lastFetched: new Date().toISOString(),
        isActive: true
      };
      
      console.log('Adding feed:', newFeed);
      setNewFeedUrl('');
      setNewFeedName('');
      setShowAddFeed(false);
      alert('RSS feed added successfully!');
    }
  };

  const formatLastFetched = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'kernel':
        return 'bg-blue-600 text-blue-100';
      case 'distro':
        return 'bg-green-600 text-green-100';
      case 'security':
        return 'bg-red-600 text-red-100';
      case 'hardware':
        return 'bg-purple-600 text-purple-100';
      case 'news':
        return 'bg-orange-600 text-orange-100';
      default:
        return 'bg-gray-600 text-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Rss className="h-8 w-8 text-orange-500" />
          <h2 className="text-3xl font-bold text-white">RSS Feed Manager</h2>
        </div>
        <button
          onClick={() => setShowAddFeed(!showAddFeed)}
          className="flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Feed
        </button>
      </div>

      {/* Add Feed Form */}
      {showAddFeed && (
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Add New RSS Feed</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Feed Name (e.g., Linux Today)"
              value={newFeedName}
              onChange={(e) => setNewFeedName(e.target.value)}
              className="bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none"
            />
            <input
              type="url"
              placeholder="RSS Feed URL"
              value={newFeedUrl}
              onChange={(e) => setNewFeedUrl(e.target.value)}
              className="bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none"
            />
          </div>
          <div className="flex justify-end space-x-3 mt-4">
            <button
              onClick={() => setShowAddFeed(false)}
              className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddFeed}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors"
            >
              Add Feed
            </button>
          </div>
        </div>
      )}

      {/* Feed Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-white">{rssFeeds.length}</div>
              <div className="text-sm text-gray-400">Total Feeds</div>
            </div>
            <Globe className="h-8 w-8 text-blue-400" />
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-white">{rssFeeds.filter(f => f.isActive).length}</div>
              <div className="text-sm text-gray-400">Active Feeds</div>
            </div>
            <CheckCircle className="h-8 w-8 text-green-400" />
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-white">1.2K</div>
              <div className="text-sm text-gray-400">Articles Today</div>
            </div>
            <Rss className="h-8 w-8 text-orange-400" />
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-white">5 min</div>
              <div className="text-sm text-gray-400">Update Interval</div>
            </div>
            <RefreshCw className="h-8 w-8 text-purple-400" />
          </div>
        </div>
      </div>

      {/* RSS Feeds List */}
      <div className="bg-gray-800 rounded-lg border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white flex items-center">
            <Settings className="h-5 w-5 mr-2" />
            Configured RSS Feeds
          </h3>
        </div>
        <div className="divide-y divide-gray-700">
          {rssFeeds.map((feed, index) => (
            <div key={index} className="p-6 hover:bg-gray-750 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${feed.isActive ? 'bg-green-400' : 'bg-red-400'}`}></div>
                  <div>
                    <h4 className="font-medium text-white">{feed.name}</h4>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(feed.category)}`}>
                        {feed.category}
                      </span>
                      <div className="flex items-center text-gray-400 text-sm">
                        <Clock className="h-3 w-3 mr-1" />
                        Last fetched: {formatLastFetched(feed.lastFetched)}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <a
                    href={feed.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => window.open(feed.url, '_blank', 'noopener,noreferrer')}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                    title="View RSS Feed"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                  <button
                    onClick={() => {
                      toast.loading('Refreshing feed...', { id: 'refresh-feed' })
                      setTimeout(() => {
                        toast.success('Feed refreshed!', { id: 'refresh-feed' })
                      }, 1000)
                    }}
                    className="p-2 text-gray-400 hover:text-green-400 transition-colors"
                    title="Refresh Feed"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Are you sure you want to remove this feed?')) {
                        toast.success('Feed removed successfully!')
                      }
                    }}
                    className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                    title="Remove Feed"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <button
                    className={`p-2 transition-colors ${
                      feed.isActive 
                        ? 'text-green-400 hover:text-gray-400' 
                        : 'text-gray-400 hover:text-green-400'
                    }`}
                    title={feed.isActive ? 'Disable Feed' : 'Enable Feed'}
                  >
                    {feed.isActive ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Articles */}
      <div className="bg-gray-800 rounded-lg border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white">Recent Articles from Feeds</h3>
        </div>
        <div className="divide-y divide-gray-700">
          {recentArticles.map((article) => (
            <div key={article.id} className="p-6 hover:bg-gray-750 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
                      {article.source}
                    </span>
                    <div className="flex items-center text-gray-400 text-sm">
                      <Clock className="h-3 w-3 mr-1" />
                      {new Date(article.publishedAt).toLocaleDateString()}
                    </div>
                  </div>
                  <h4 className="font-medium text-white mb-2 hover:text-green-400 transition-colors cursor-pointer">
                    <a href={article.sourceUrl} target="_blank" rel="noopener noreferrer">
                      {article.title}
                    </a>
                  </h4>
                  <p className="text-gray-300 text-sm mb-3">{article.excerpt}</p>
                  <div className="flex items-center space-x-4 text-gray-400 text-sm">
                    <span className="text-green-400">{article.upvotes}↑</span>
                    <span>{article.comments} comments</span>
                  </div>
                </div>
                <a
                  href={article.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => window.open(article.sourceUrl, '_blank', 'noopener,noreferrer')}
                  className="ml-4 p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RSSFeedManager;