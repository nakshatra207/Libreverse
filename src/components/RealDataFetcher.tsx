import React, { useState, useEffect } from 'react';
import { ExternalLink, Rss, Globe, Database, Shield, Users, RefreshCw, CheckCircle, XCircle, Activity } from 'lucide-react';
import { apiClient } from '../services/apiClient';
import { 
  linuxDistros, 
  fossNewsBlogs, 
  securitySources, 
  linuxForums, 
  learningResources,
  softwareRepositories,
  linuxEvents,
  toolDirectories 
} from '../data/sources';

const RealDataFetcher: React.FC = () => {
  const [activeTab, setActiveTab] = useState('distros');
  const [testingAPI, setTestingAPI] = useState(false);
  const [apiStatus, setApiStatus] = useState<{[key: string]: 'testing' | 'success' | 'failed'}>({});

  const tabs = [
    { id: 'distros', label: 'Linux Distros', icon: Globe, data: linuxDistros },
    { id: 'news', label: 'FOSS News', icon: Rss, data: fossNewsBlogs },
    { id: 'security', label: 'Security', icon: Shield, data: securitySources },
    { id: 'forums', label: 'Forums', icon: Users, data: linuxForums },
    { id: 'learning', label: 'Learning', icon: Database, data: learningResources },
    { id: 'software', label: 'Software', icon: Database, data: softwareRepositories }
  ];

  const activeTabData = tabs.find(tab => tab.id === activeTab)?.data || [];

  const testAPIConnections = async () => {
    setTestingAPI(true);
    setApiStatus({});
    
    // Test Reddit API
    setApiStatus(prev => ({...prev, reddit: 'testing'}));
    try {
      const redditData = await apiClient.fetchRedditLinux();
      setApiStatus(prev => ({...prev, reddit: redditData.length > 0 ? 'success' : 'failed'}));
    } catch (error) {
      setApiStatus(prev => ({...prev, reddit: 'failed'}));
    }
    
    // Test GitHub API
    setApiStatus(prev => ({...prev, github: 'testing'}));
    try {
      const githubData = await apiClient.fetchGitHubLinux();
      setApiStatus(prev => ({...prev, github: githubData.length > 0 ? 'success' : 'failed'}));
    } catch (error) {
      setApiStatus(prev => ({...prev, github: 'failed'}));
    }
    
    // Test Hacker News API
    setApiStatus(prev => ({...prev, hackernews: 'testing'}));
    try {
      const hnData = await apiClient.fetchHackerNews();
      setApiStatus(prev => ({...prev, hackernews: hnData.length > 0 ? 'success' : 'failed'}));
    } catch (error) {
      setApiStatus(prev => ({...prev, hackernews: 'failed'}));
    }
    
    setTimeout(() => {
      setTestingAPI(false);
    }, 1000);
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'stable': 'bg-blue-600 text-blue-100',
      'desktop': 'bg-green-600 text-green-100',
      'rolling': 'bg-purple-600 text-purple-100',
      'bleeding-edge': 'bg-red-600 text-red-100',
      'security': 'bg-orange-600 text-orange-100',
      'enterprise': 'bg-indigo-600 text-indigo-100',
      'news': 'bg-yellow-600 text-yellow-100',
      'ubuntu': 'bg-orange-500 text-orange-100',
      'hardware': 'bg-gray-600 text-gray-100',
      'kernel': 'bg-purple-700 text-purple-100',
      'distros': 'bg-green-700 text-green-100',
      'cve': 'bg-red-700 text-red-100',
      'debian': 'bg-red-500 text-red-100',
      'redhat': 'bg-red-600 text-red-100',
      'reddit': 'bg-orange-600 text-orange-100',
      'forum': 'bg-blue-700 text-blue-100',
      'arch': 'bg-blue-600 text-blue-100',
      'stackexchange': 'bg-orange-700 text-orange-100'
    };
    return colors[category] || 'bg-gray-600 text-gray-100';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
            <Globe className="h-7 w-7 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              🌐 Real FOSS Data Sources
            </h2>
            <p className="text-gray-400 text-sm">Live sources from the Linux ecosystem</p>
          </div>
        </div>
        <div className="text-sm text-gray-400">
          🐧 35+ Active Sources
        </div>
        <button
          onClick={testAPIConnections}
          disabled={testingAPI}
          className="flex items-center bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl transition-all duration-300 font-medium shadow-lg hover:shadow-xl disabled:opacity-50"
        >
          <RefreshCw className={`h-5 w-5 mr-2 ${testingAPI ? 'animate-spin' : ''}`} />
          {testingAPI ? 'Testing APIs...' : '🧪 Test Live APIs'}
        </button>
      </div>

      {/* API Status Display */}
      {Object.keys(apiStatus).length > 0 && (
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Activity className="h-5 w-5 mr-2 text-green-400" />
            🔴 Live API Status
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(apiStatus).map(([api, status]) => (
              <div key={api} className="flex items-center justify-between bg-gray-700/50 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-3">
                    {status === 'testing' && <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>}
                    {status === 'success' && <CheckCircle className="w-5 h-5 text-green-400" />}
                    {status === 'failed' && <XCircle className="w-5 h-5 text-red-400" />}
                  </div>
                  <span className="font-medium text-white capitalize">{api} API</span>
                </div>
                <span className={`text-sm font-medium ${
                  status === 'testing' ? 'text-yellow-400' :
                  status === 'success' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {status === 'testing' ? 'Testing...' :
                   status === 'success' ? '✅ Connected' : '❌ Failed'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-gray-700">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center px-4 py-2 rounded-t-lg transition-colors ${
              activeTab === tab.id
                ? 'bg-green-600 text-white border-b-2 border-green-400'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            <tab.icon className="h-4 w-4 mr-2" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeTabData.map((source: any, index: number) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg border border-gray-700 hover:border-green-500 transition-all duration-200 p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-bold text-white">{source.name}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(source.category)}`}>
                {source.category}
              </span>
            </div>

            <p className="text-gray-300 text-sm mb-4">{source.description}</p>

            <div className="space-y-3">
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => window.open(source.url, '_blank', 'noopener,noreferrer')}
                className="flex items-center text-green-400 hover:text-green-300 transition-colors"
              >
                <Globe className="h-4 w-4 mr-2" />
                <span className="text-sm">Visit Website</span>
                <ExternalLink className="h-3 w-3 ml-1" />
              </a>

              {source.rss && (
                <a
                  href={source.rss}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => window.open(source.rss, '_blank', 'noopener,noreferrer')}
                  className="flex items-center text-orange-400 hover:text-orange-300 transition-colors"
                >
                  <Rss className="h-4 w-4 mr-2" />
                  <span className="text-sm">RSS Feed</span>
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              )}

              {source.api && (
                <a
                  href={source.api}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => window.open(source.api, '_blank', 'noopener,noreferrer')}
                  className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <Database className="h-4 w-4 mr-2" />
                  <span className="text-sm">API Endpoint</span>
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Statistics */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Data Source Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">{linuxDistros.length}</div>
            <div className="text-sm text-gray-400">Linux Distros</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">{fossNewsBlogs.length}</div>
            <div className="text-sm text-gray-400">News Sources</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-400">{securitySources.length}</div>
            <div className="text-sm text-gray-400">Security Feeds</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-400">{linuxForums.length}</div>
            <div className="text-sm text-gray-400">Forums</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">{learningResources.length}</div>
            <div className="text-sm text-gray-400">Learning Sites</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">{softwareRepositories.length}</div>
            <div className="text-sm text-gray-400">Repositories</div>
          </div>
        </div>
      </div>

      {/* Integration Instructions */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">🚀 Live API Integration Status</h3>
        <div className="space-y-3 text-gray-300">
          <p className="flex items-center">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
            <strong>✅ Reddit API:</strong> Fetching from r/linux, r/archlinux, r/ubuntu, r/fedora
          </p>
          <p className="flex items-center">
            <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
            <strong>✅ GitHub API:</strong> Linux repositories, kernel updates, security patches
          </p>
          <p className="flex items-center">
            <span className="w-2 h-2 bg-orange-400 rounded-full mr-3"></span>
            <strong>✅ Hacker News:</strong> Linux-related stories and discussions
          </p>
          <p className="flex items-center">
            <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
            <strong>⚠️ RSS Feeds:</strong> CORS limitations, using RSS2JSON proxy service
          </p>
          <p className="flex items-center">
            <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
            <strong>🔄 Auto-Refresh:</strong> Updates every 5 minutes with live data
          </p>
        </div>
      </div>
    </div>
  );
};

export default RealDataFetcher;