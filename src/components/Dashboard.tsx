import React from 'react';
import { TrendingUp, Users, MessageSquare, Shield, Activity } from 'lucide-react';
import NewsCard from './NewsCard';
import { NewsItem } from '../types';

const Dashboard: React.FC = () => {
  const featuredNews: NewsItem[] = [
    {
      id: '1',
      title: 'Linux Kernel 6.11 Released with New Features and Security Improvements',
      content: 'The latest Linux kernel brings significant improvements to performance, security, and hardware support...',
      excerpt: 'Major kernel update includes new driver support, security patches, and performance optimizations for modern hardware.',
      source: 'Kernel.org',
      sourceUrl: 'https://kernel.org/releases.html',
      publishedAt: '2024-10-01T10:00:00Z',
      tags: ['kernel', 'release', 'security'],
      category: 'kernel'
    },
    {
      id: '2',
      title: 'Ubuntu 24.04.1 LTS Point Release Now Available',
      content: 'Canonical has released the first point release of Ubuntu 24.04 LTS with updated packages and bug fixes...',
      excerpt: 'First point release for Ubuntu 24.04 LTS includes package updates, bug fixes, and improved hardware support.',
      source: 'Ubuntu Blog',
      sourceUrl: 'https://ubuntu.com/blog',
      publishedAt: '2024-09-30T14:30:00Z',
      tags: ['ubuntu', 'lts', 'release'],
      category: 'distro'
    },
    {
      id: '3',
      title: 'Critical Security Vulnerability Found in OpenSSL',
      content: 'A critical security vulnerability has been discovered in OpenSSL affecting certificate validation...',
      excerpt: 'Security researchers have identified a certificate validation bypass vulnerability in OpenSSL that could allow attacks.',
      source: 'Security Advisory',
      sourceUrl: 'https://www.openssl.org/news/secadv/',
      publishedAt: '2024-09-29T09:15:00Z',
      tags: ['openssl', 'security', 'vulnerability'],
      category: 'security'
    },
    {
      id: '4',
      title: 'Fedora 41 Beta Available for Testing',
      content: 'The Fedora Project has announced the availability of Fedora 41 Beta for community testing...',
      excerpt: 'Fedora 41 Beta introduces new features, updated packages, and improvements to the overall user experience.',
      source: 'Fedora Magazine',
      sourceUrl: 'https://fedoramagazine.org',
      publishedAt: '2024-09-28T16:45:00Z',
      tags: ['fedora', 'beta', 'testing'],
      category: 'distro'
    }
  ];

  const stats = [
    { label: 'Active Distros', value: '500+', icon: TrendingUp, color: 'text-green-400' },
    { label: 'Community Members', value: '50K+', icon: Users, color: 'text-blue-400' },
    { label: 'Forum Posts', value: '1.2M+', icon: MessageSquare, color: 'text-yellow-400' },
    { label: 'Security Patches', value: '150+', icon: Shield, color: 'text-red-400' }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-8">
        <div className="max-w-4xl">
          <h1 className="text-4xl font-bold text-white mb-4">
            Welcome to LibreVerse
          </h1>
          <p className="text-xl text-green-100 mb-6">
            Your comprehensive hub for Linux news, kernel updates, distro releases, security advisories, and community discussions.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center bg-white bg-opacity-20 rounded-lg px-4 py-2">
              <Activity className="h-5 w-5 text-white mr-2" />
              <span className="text-white font-medium">Real-time Updates</span>
            </div>
            <div className="flex items-center bg-white bg-opacity-20 rounded-lg px-4 py-2">
              <Shield className="h-5 w-5 text-white mr-2" />
              <span className="text-white font-medium">Security First</span>
            </div>
            <div className="flex items-center bg-white bg-opacity-20 rounded-lg px-4 py-2">
              <Users className="h-5 w-5 text-white mr-2" />
              <span className="text-white font-medium">Community Driven</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg border border-gray-700 p-6 hover:border-green-500 transition-all duration-200"
          >
            <div className="flex items-center">
              <stat.icon className={`h-8 w-8 ${stat.color} mr-3`} />
              <div>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Featured News */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Latest Linux News</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredNews.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-lg transition-colors text-center">
            <TrendingUp className="h-6 w-6 mx-auto mb-2" />
            <span className="block text-sm font-medium">View Trending</span>
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg transition-colors text-center">
            <MessageSquare className="h-6 w-6 mx-auto mb-2" />
            <span className="block text-sm font-medium">Join Discussion</span>
          </button>
          <button className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-lg transition-colors text-center">
            <Shield className="h-6 w-6 mx-auto mb-2" />
            <span className="block text-sm font-medium">Security Alerts</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;