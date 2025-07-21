import React, { useState } from 'react'
import {
  Newspaper, 
  RefreshCw, 
  ArrowUp, 
  ArrowDown, 
  MessageCircle, 
  ExternalLink,
  Eye,
  Clock,
  Tag,
  Filter,
  Search,
  TrendingUp,
  Flame,
  Globe,
  Terminal,
  Shield,
  Rss,
  Wifi,
  WifiOff,
  Calendar,
  Users,
  Server,
  Monitor,
  Gamepad2,
  Code,
  Heart,
  Share2,
  Bookmark,
  ArrowLeft,
  Activity,
  BarChart3,
  Zap
} from 'lucide-react'
import { useLinuxNews } from '../hooks/useLinuxNews'
import { NewsItem } from '../types'
import toast, { Toaster } from 'react-hot-toast'

const LinuxNewsHub: React.FC = () => {
  const { 
    news, 
    loading, 
    lastUpdated, 
    trendingTopics,
    sourceStats,
    refreshNews, 
    getNewsDetails, 
    filterNews, 
    sortNews 
  } = useLinuxNews()

  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null)
  const [sortBy, setSortBy] = useState<'latest' | 'popular' | 'trending'>('latest')
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [loadingDetails, setLoadingDetails] = useState(false)
  const [isLiveMode, setIsLiveMode] = useState(true)

  const categories = [
    'all', 'distro', 'kernel', 'security', 'hardware', 'forum', 
    'desktop', 'gaming', 'foss', 'server', 'graphics', 'general'
  ]

  const filteredNews = filterNews(filterCategory, searchQuery)
  const sortedNews = sortNews(filteredNews, sortBy)

  const handleLiveRefresh = async () => {
    if (!isLiveMode) return;
    
    toast.loading('🔄 Fetching live updates from all Linux sources...', { 
      id: 'live-refresh',
      duration: 3000
    });
    
    await refreshNews();
    
    toast.success('✅ Live updates refreshed!', { 
      id: 'live-refresh'
    });
  };

  const handleNewsClick = async (newsItem: NewsItem) => {
    setLoadingDetails(true)
    try {
      const detailedNews = await getNewsDetails(newsItem)
      setSelectedNews(detailedNews)
    } catch (error) {
      console.error('Error loading news details:', error)
      setSelectedNews(newsItem)
      toast.error('Failed to load full article details')
    } finally {
      setLoadingDetails(false)
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'kernel': return <Terminal className="h-4 w-4" />
      case 'distro': return <Globe className="h-4 w-4" />
      case 'security': return <Shield className="h-4 w-4" />
      case 'hardware': return <Terminal className="h-4 w-4" />
      case 'forum': return <MessageCircle className="h-4 w-4" />
      case 'desktop': return <Monitor className="h-4 w-4" />
      case 'gaming': return <Gamepad2 className="h-4 w-4" />
      case 'foss': return <Heart className="h-4 w-4" />
      case 'server': return <Server className="h-4 w-4" />
      case 'graphics': return <Monitor className="h-4 w-4" />
      case 'software': return <Code className="h-4 w-4" />
      case 'general': return <Newspaper className="h-4 w-4" />
      default: return <Newspaper className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'kernel': return 'from-purple-500 to-pink-600'
      case 'distro': return 'from-green-500 to-blue-600'
      case 'security': return 'from-red-500 to-orange-600'
      case 'hardware': return 'from-yellow-500 to-orange-600'
      case 'forum': return 'from-blue-500 to-indigo-600'
      case 'desktop': return 'from-cyan-500 to-blue-600'
      case 'gaming': return 'from-pink-500 to-purple-600'
      case 'foss': return 'from-green-500 to-teal-600'
      case 'server': return 'from-gray-500 to-slate-600'
      case 'graphics': return 'from-violet-500 to-purple-600'
      case 'software': return 'from-blue-500 to-cyan-600'
      case 'general': return 'from-gray-500 to-gray-600'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  const formatRelativeTime = (dateString: string) => {
    const now = new Date()
    const date = new Date(dateString)
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    const days = Math.floor(diffInHours / 24)
    if (days === 1) return '1 day ago'
    if (days < 7) return `${days} days ago`
    return `${Math.floor(days / 7)} weeks ago`
  }

  // Individual News Article View
  if (selectedNews) {
    return (
      <div className="space-y-8">
        <Toaster position="top-right" />
        
        {/* Enhanced Back Button */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSelectedNews(null)}
            className="flex items-center text-green-400 hover:text-green-300 transition-all duration-300 bg-gray-800/50 px-6 py-3 rounded-xl border border-gray-700 hover:border-green-500/50 hover:scale-105 backdrop-blur-sm"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to News Feed
          </button>
          <div className="flex items-center space-x-6 text-gray-400 text-sm">
            <div className="flex items-center bg-gray-800/50 px-4 py-2 rounded-lg">
              <Eye className="h-4 w-4 mr-2 text-purple-400" />
              <span className="font-medium">{selectedNews.views.toLocaleString()} views</span>
            </div>
            <div className="flex items-center bg-gray-800/50 px-4 py-2 rounded-lg">
              <MessageCircle className="h-4 w-4 mr-2 text-blue-400" />
              <span className="font-medium">{selectedNews.comments} comments</span>
            </div>
            <div className="flex items-center bg-gray-800/50 px-4 py-2 rounded-lg">
              <Calendar className="h-4 w-4 mr-2 text-green-400" />
              <span className="font-medium">{formatRelativeTime(selectedNews.publishedAt)}</span>
            </div>
          </div>
        </div>

        {/* Enhanced News Article */}
        <div className="bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 rounded-3xl border border-gray-700 p-10 shadow-2xl">
          <div className="flex items-start space-x-8">
            {/* Enhanced Voting */}
            <div className="flex flex-col items-center space-y-4 min-w-[100px]">
              <button className="group p-4 text-gray-400 hover:text-green-400 transition-all duration-300 bg-gray-700/50 rounded-2xl hover:bg-green-500/20 hover:scale-110 shadow-lg">
                <ArrowUp className="h-7 w-7 group-hover:scale-110 transition-transform" />
              </button>
              <div className="text-center">
                <span className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent block">
                  {selectedNews.upvotes - selectedNews.downvotes}
                </span>
                <span className="text-xs text-gray-500 font-medium">votes</span>
              </div>
              <button className="group p-4 text-gray-400 hover:text-red-400 transition-all duration-300 bg-gray-700/50 rounded-2xl hover:bg-red-500/20 hover:scale-110 shadow-lg">
                <ArrowDown className="h-7 w-7 group-hover:scale-110 transition-transform" />
              </button>
            </div>

            {/* Enhanced Content */}
            <div className="flex-1">
              {/* Enhanced Header */}
              <div className="flex items-start justify-between mb-8">
                <div className="flex items-center space-x-4 flex-wrap">
                  <span className={`bg-gradient-to-r ${getCategoryColor(selectedNews.category)} text-white px-6 py-3 rounded-full text-sm font-bold flex items-center shadow-lg`}>
                    {getCategoryIcon(selectedNews.category)}
                    <span className="ml-2">{selectedNews.category.toUpperCase()}</span>
                  </span>
                  <div className="flex items-center bg-gray-700/50 px-4 py-2 rounded-lg">
                    <Activity className="h-4 w-4 mr-2 text-green-400" />
                    <span className="text-green-400 font-medium">LIVE</span>
                  </div>
                </div>
              </div>

              {/* Enhanced Title */}
              <h1 className="text-4xl font-bold text-white mb-8 leading-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {selectedNews.title}
              </h1>
              
              {/* Enhanced Source Info */}
              <div className="flex items-center justify-between mb-8 p-6 bg-gray-900/50 rounded-2xl border border-gray-700">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl flex items-center justify-center text-2xl font-bold shadow-lg">
                    📰
                  </div>
                  <div>
                    <div className="font-bold text-white text-lg">{selectedNews.source}</div>
                    <div className="text-gray-400">By {selectedNews.author || 'Editorial Team'}</div>
                    <div className="text-gray-500 text-sm">{formatRelativeTime(selectedNews.publishedAt)}</div>
                  </div>
                </div>
                <a
                  href={selectedNews.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                 onClick={() => window.open(selectedNews.sourceUrl, '_blank', 'noopener,noreferrer')}
                  className="flex items-center bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <ExternalLink className="h-5 w-5 mr-2" />
                  View Original
                </a>
              </div>

              {/* Enhanced Content */}
              <div className="prose prose-invert prose-lg max-w-none mb-8">
                <div className="text-gray-300 whitespace-pre-line leading-relaxed text-lg bg-gray-900/30 p-8 rounded-2xl border border-gray-700">
                  {selectedNews.content}
                </div>
              </div>

              {/* Enhanced Tags */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <Tag className="h-5 w-5 mr-2 text-green-400" />
                  Related Topics
                </h3>
                <div className="flex flex-wrap gap-3">
                  {selectedNews.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="flex items-center bg-gradient-to-r from-gray-700 to-gray-600 hover:from-green-600 hover:to-blue-600 text-gray-300 hover:text-white px-4 py-2 rounded-full text-sm cursor-pointer transition-all duration-300 hover:scale-105 shadow-lg"
                    >
                      <Tag className="h-3 w-3 mr-2" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Enhanced Actions */}
              <div className="flex items-center justify-between pt-8 border-t border-gray-700">
                <div className="flex items-center space-x-8">
                  <div className="flex items-center space-x-6 text-gray-400">
                    <div className="flex items-center bg-gray-700/50 px-4 py-2 rounded-lg">
                      <ArrowUp className="h-4 w-4 mr-2 text-green-400" />
                      <span className="font-medium">{selectedNews.upvotes}</span>
                    </div>
                    <div className="flex items-center bg-gray-700/50 px-4 py-2 rounded-lg">
                      <MessageCircle className="h-4 w-4 mr-2 text-blue-400" />
                      <span className="font-medium">{selectedNews.comments}</span>
                    </div>
                    <div className="flex items-center bg-gray-700/50 px-4 py-2 rounded-lg">
                      <Eye className="h-4 w-4 mr-2 text-purple-400" />
                      <span className="font-medium">{selectedNews.views.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button className="flex items-center text-gray-400 hover:text-red-400 transition-colors p-3 rounded-xl hover:bg-red-500/10">
                    <Heart className="h-5 w-5 mr-2" />
                    Like
                  </button>
                  <button className="flex items-center text-gray-400 hover:text-blue-400 transition-colors p-3 rounded-xl hover:bg-blue-500/10">
                    <Share2 className="h-5 w-5 mr-2" />
                    Share
                  </button>
                  <button className="flex items-center text-gray-400 hover:text-yellow-400 transition-colors p-3 rounded-xl hover:bg-yellow-500/10">
                    <Bookmark className="h-5 w-5 mr-2" />
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Main News Hub View
  return (
    <div className="space-y-8">
      <Toaster position="top-right" />
      
      {/* Enhanced Header */}
      <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl p-12 shadow-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
        <div className="absolute top-8 right-8 text-9xl opacity-20">🐧</div>
        <div className="absolute bottom-8 left-8 text-7xl opacity-10">📰</div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <div className="w-24 h-24 bg-white/20 rounded-3xl flex items-center justify-center mr-8 backdrop-blur-sm shadow-2xl">
                <Rss className="h-14 w-14 text-white" />
              </div>
              <div>
                <h1 className="text-6xl font-bold text-white mb-3">
                  🐧 LibreVerse News
                </h1>
                <p className="text-2xl text-white/90 font-medium flex items-center">
                  Comprehensive Linux & FOSS news from {sourceStats?.totalSources || '50+'} sources worldwide
                  {isLiveMode && <span className="ml-3 px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm font-bold animate-pulse">🔴 LIVE</span>}
                </p>
                <div className="flex items-center space-x-6 mt-4">
                  <div className="flex items-center bg-white/20 rounded-xl px-4 py-2 backdrop-blur-sm">
                    <Globe className="h-5 w-5 text-white mr-2" />
                    <span className="text-white font-medium">Global Coverage</span>
                  </div>
                  <div className="flex items-center bg-white/20 rounded-xl px-4 py-2 backdrop-blur-sm">
                    <Zap className="h-5 w-5 text-white mr-2" />
                    <span className="text-white font-medium">Real-Time Updates</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-white/20 rounded-xl px-6 py-3 backdrop-blur-sm shadow-lg">
                <Activity className="h-6 w-6 text-green-300 mr-3 animate-pulse" />
                <span className="text-white font-bold text-lg">
                  {isLiveMode ? '🔴 LIVE UPDATES' : '📱 CACHED MODE'}
                </span>
              </div>
              <div className="flex items-center bg-white/20 rounded-xl px-6 py-3 backdrop-blur-sm shadow-lg">
                {loading ? <WifiOff className="h-6 w-6 text-white mr-3 animate-pulse" /> : <Wifi className="h-6 w-6 text-green-300 mr-3" />}
                <span className="text-white font-bold text-lg">
                  {loading ? 'Fetching...' : 'Live'}
                </span>
              </div>
              <button
                onClick={handleLiveRefresh}
                disabled={loading}
                className="flex items-center bg-white/20 hover:bg-white/30 text-white px-8 py-4 rounded-2xl transition-all duration-300 font-bold text-lg backdrop-blur-sm border border-white/20 hover:scale-105 disabled:opacity-50 shadow-lg group"
              >
                <RefreshCw className={`h-6 w-6 mr-3 ${loading ? 'animate-spin' : 'group-hover:rotate-180'} transition-transform duration-500`} />
                {loading ? 'Fetching...' : '🔄 Refresh Live'}
              </button>
            </div>
          </div>
          
          {/* Enhanced Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 shadow-lg">
              <div className="text-5xl mb-3">📰</div>
              <div className="text-4xl font-bold text-white mb-2">{news.length}</div>
              <div className="text-sm text-white/90 font-medium">{isLiveMode ? 'Live Articles' : 'Cached Articles'}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 shadow-lg">
              <div className="text-5xl mb-3">🌐</div>
              <div className="text-4xl font-bold text-white mb-2">{sourceStats?.totalSources || '50+'}</div>
              <div className="text-sm text-white/90 font-medium">News Sources</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 shadow-lg">
              <div className="text-5xl mb-3">🔥</div>
              <div className="text-4xl font-bold text-white mb-2">{trendingTopics.length}</div>
              <div className="text-sm text-white/90 font-medium">Trending Topics</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 shadow-lg">
              <div className="text-5xl mb-3">📊</div>
              <div className="text-4xl font-bold text-white mb-2">{sourceStats?.totalCategories || '12'}</div>
              <div className="text-sm text-white/90 font-medium">Categories</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 shadow-lg">
              <div className="text-5xl mb-3">⏰</div>
              <div className="text-4xl font-bold text-white mb-2">
                {lastUpdated ? formatRelativeTime(lastUpdated.toISOString()) : (isLiveMode ? 'Live' : 'Cached')}
              </div>
              <div className="text-sm text-white/90 font-medium">Last Update</div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Trending Topics */}
      {trendingTopics.length > 0 && (
        <div className="bg-gradient-to-r from-orange-500/10 via-red-500/10 to-pink-500/10 rounded-2xl border border-orange-500/30 p-8 backdrop-blur-sm">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Flame className="h-7 w-7 mr-3 text-orange-400" />
            🔥 Trending in Linux Community
          </h3>
          <div className="flex flex-wrap gap-3">
            {trendingTopics.slice(0, 12).map((topic, index) => (
              <button
                key={index}
                onClick={() => {setSearchQuery(topic.topic); toast.success(`🔍 Filtering by "${topic.topic}"`)}}
                className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-6 py-3 rounded-full font-bold hover:scale-105 transition-all duration-300 shadow-lg flex items-center"
              >
                <Flame className="h-4 w-4 mr-2" />
                #{topic.topic} ({topic.count})
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Enhanced Controls */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-6 lg:space-y-0 bg-gray-800/50 rounded-2xl p-8 backdrop-blur-sm border border-gray-700">
        <div className="flex flex-wrap items-center gap-6">
          {/* Enhanced Search */}
          <div className="relative">
            <Search className="h-6 w-6 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="🔍 Search live Linux news, forums, distros..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-800 border border-gray-600 text-white pl-14 pr-8 py-4 rounded-xl text-base focus:border-green-500 focus:ring-2 focus:ring-green-500/50 focus:outline-none w-96 shadow-lg"
            />
          </div>
          
          {/* Enhanced Category Filter */}
          <div className="flex items-center space-x-3">
            <Filter className="h-6 w-6 text-gray-400" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-gray-800 border border-gray-600 text-white rounded-xl px-6 py-4 text-base focus:border-green-500 focus:ring-2 focus:ring-green-500/50 focus:outline-none shadow-lg"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? '🌐 All Sources' : 
                   category === 'kernel' ? '⚡ Kernel' :
                   category === 'distro' ? '🐧 Distributions' :
                   category === 'security' ? '🛡️ Security' :
                   category === 'hardware' ? '🔧 Hardware' :
                   category === 'forum' ? '💬 Forums' :
                   category === 'desktop' ? '🖥️ Desktop' :
                   category === 'gaming' ? '🎮 Gaming' :
                   category === 'foss' ? '❤️ FOSS' :
                   category === 'server' ? '🖥️ Server' :
                   category === 'graphics' ? '🎨 Graphics' :
                   category === 'software' ? '💻 Software' :
                   '📰 General'}
                </option>
              ))}
            </select>
          </div>
          
          {/* Enhanced Sort Options */}
          <div className="flex items-center space-x-3">
            <BarChart3 className="h-6 w-6 text-gray-400" />
            <span className="text-gray-400 font-medium">Sort:</span>
            <div className="flex space-x-2">
              {[
                { key: 'latest', label: 'Latest', icon: Clock, emoji: '🕒' },
                { key: 'popular', label: 'Popular', icon: TrendingUp, emoji: '🔥' },
                { key: 'trending', label: 'Trending', icon: Eye, emoji: '👁️' }
              ].map(({ key, label, icon: Icon, emoji }) => (
                <button
                  key={key}
                  onClick={() => setSortBy(key as any)}
                  className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    sortBy === key
                      ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg scale-105'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                  }`}
                >
                  <span className="mr-2 text-lg">{emoji}</span>
                  <Icon className="h-5 w-5 mr-2" />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Loading State */}
      {loading && news.length === 0 && (
        <div className="text-center py-16">
          <div className="text-8xl mb-6 animate-bounce">🔄</div>
          <h3 className="text-2xl font-bold text-white mb-4">🚀 Fetching Live Linux Updates...</h3>
          <p className="text-gray-400 text-lg mb-4">📡 Connecting to Reddit, GitHub, Hacker News, RSS feeds & more...</p>
          <div className="flex justify-center space-x-4 text-sm text-gray-500">
            <span>• Reddit Communities</span>
            <span>• Distribution Forums</span>
            <span>• Security Advisories</span>
            <span>• FOSS Projects</span>
          </div>
        </div>
      )}

      {/* Enhanced No Results */}
      {!loading && sortedNews.length === 0 && news.length > 0 && (
        <div className="text-center py-16">
          <div className="text-8xl mb-6">🔍</div>
          <h3 className="text-2xl font-bold text-white mb-4">No matching articles found</h3>
          <p className="text-gray-400 text-lg mb-6">Try adjusting your search or filter criteria</p>
          <button
            onClick={() => {
              setSearchQuery('')
              setFilterCategory('all')
            }}
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-4 rounded-xl transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
          >
            🔄 Clear Filters & Show All
          </button>
        </div>
      )}

      {/* Enhanced News Articles List */}
      {sortedNews.length > 0 && (
        <div className="space-y-8">
          {sortedNews.map((article) => (
            <div
              key={article.id}
              className="group bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 rounded-3xl border border-gray-700 hover:border-green-500/50 transition-all duration-300 p-10 hover:shadow-2xl hover:shadow-green-500/10 cursor-pointer hover:scale-[1.02]"
              onClick={() => handleNewsClick(article)}
            >
              <div className="flex items-start space-x-8">
                {/* Enhanced Voting */}
                <div className="flex flex-col items-center space-y-4 min-w-[100px]">
                  <button 
                    onClick={(e) => e.stopPropagation()}
                    className="group/vote p-4 text-gray-400 hover:text-green-400 transition-all duration-300 bg-gray-700/50 rounded-2xl hover:bg-green-500/20 hover:scale-110 shadow-lg"
                  >
                    <ArrowUp className="h-7 w-7 group-hover/vote:scale-110 transition-transform" />
                  </button>
                  <div className="text-center">
                    <span className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent block">
                      {article.upvotes - article.downvotes}
                    </span>
                    <span className="text-xs text-gray-500 font-medium">votes</span>
                  </div>
                  <button 
                    onClick={(e) => e.stopPropagation()}
                    className="group/vote p-4 text-gray-400 hover:text-red-400 transition-all duration-300 bg-gray-700/50 rounded-2xl hover:bg-red-500/20 hover:scale-110 shadow-lg"
                  >
                    <ArrowDown className="h-7 w-7 group-hover/vote:scale-110 transition-transform" />
                  </button>
                </div>

                {/* Enhanced Content */}
                <div className="flex-1 min-w-0">
                  {/* Enhanced Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-4 flex-wrap">
                      <span className={`bg-gradient-to-r ${getCategoryColor(article.category)} text-white px-6 py-3 rounded-full font-bold flex items-center shadow-lg`}>
                        {getCategoryIcon(article.category)}
                        <span className="ml-2">{article.category.toUpperCase()}</span>
                      </span>
                      <div className="flex items-center bg-gray-700/50 px-4 py-2 rounded-lg">
                        <Activity className="h-4 w-4 mr-2 text-green-400" />
                        <span className="text-green-400 font-medium">LIVE</span>
                      </div>
                    </div>
                    <div className="text-gray-400 font-medium">
                      {formatRelativeTime(article.publishedAt)}
                    </div>
                  </div>

                  {/* Enhanced Title */}
                  <h3 className="text-3xl font-bold text-white mb-4 hover:text-green-400 transition-colors group-hover:text-green-400 leading-tight">
                    {article.title}
                  </h3>

                  {/* Enhanced Excerpt */}
                  <p className="text-gray-300 text-lg mb-6 line-clamp-2 leading-relaxed">
                    {article.excerpt}
                  </p>

                  {/* Enhanced Source and Stats */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center bg-gray-700/50 px-4 py-3 rounded-xl">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center font-bold mr-3 shadow-lg">
                          📰
                        </div>
                        <div>
                          <span className="font-bold text-white block">{article.source}</span>
                          <span className="text-gray-400 text-sm">by {article.author || 'Editorial'}</span>
                        </div>
                      </div>
                      <div className="flex items-center bg-gray-700/50 px-4 py-3 rounded-xl">
                        <MessageCircle className="h-5 w-5 mr-2 text-green-400" />
                        <span className="font-medium text-gray-300">{article.comments} comments</span>
                      </div>
                      <div className="flex items-center bg-gray-700/50 px-4 py-3 rounded-xl">
                        <Eye className="h-5 w-5 mr-2 text-purple-400" />
                        <span className="font-medium text-gray-300">{article.views.toLocaleString()} views</span>
                      </div>
                    </div>
                    <a
                      href={article.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        e.stopPropagation()
                        window.open(article.sourceUrl, '_blank', 'noopener,noreferrer')
                      }}
                      className="flex items-center text-green-400 hover:text-green-300 transition-colors bg-gray-700/50 px-4 py-3 rounded-xl hover:bg-green-500/10"
                    >
                      <ExternalLink className="h-5 w-5 mr-2" />
                      <span className="font-medium">Source</span>
                    </a>
                  </div>

                  {/* Enhanced Tags */}
                  <div className="flex flex-wrap gap-3">
                    {article.tags.slice(0, 6).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="bg-gradient-to-r from-gray-700 to-gray-600 hover:from-green-600 hover:to-blue-600 text-gray-300 hover:text-white px-4 py-2 rounded-full text-sm cursor-pointer transition-all duration-300 hover:scale-105 shadow-lg"
                        onClick={(e) => {
                          e.stopPropagation()
                          setSearchQuery(tag)
                        }}
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
      )}

      {/* Enhanced Load More */}
      {sortedNews.length > 0 && (
        <div className="text-center">
          <button 
            onClick={handleLiveRefresh}
            className="bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 text-white px-12 py-6 rounded-3xl border border-gray-600 hover:border-green-500/50 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 group"
          >
            <RefreshCw className="h-6 w-6 mr-3 inline group-hover:rotate-180 transition-transform duration-500" />
            🚀 Fetch Latest Updates
          </button>
        </div>
      )}
    </div>
  )
}

export default LinuxNewsHub