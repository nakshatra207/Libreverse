import { useState, useEffect } from 'react'
import { NewsItem } from '../types'
import { aggregateLinuxNews, fetchNewsDetails, getTrendingTopics, getSourceStats, type TrendingTopic, type SourceStats } from '../services/newsAggregator'
import { apiClient } from '../services/apiClient'
import toast from 'react-hot-toast'

export const useLinuxNews = () => {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [trendingTopics, setTrendingTopics] = useState<TrendingTopic[]>([])
  const [sourceStats, setSourceStats] = useState<SourceStats | null>(null)

  const fetchNews = async (showToast = true) => {
    try {
      setLoading(true)
      if (showToast) {
        toast.loading('📡 Fetching live Linux updates from multiple sources...', { 
          id: 'fetch-news',
          duration: 3000
        })
      }

      const aggregatedNews = await aggregateLinuxNews()
      
      if (aggregatedNews.length > 0) {
        setNews(aggregatedNews)
        setTrendingTopics(getTrendingTopics(aggregatedNews))
        setSourceStats(getSourceStats(aggregatedNews))
        setLastUpdated(new Date())
        
        if (showToast) {
          toast.success(
            `🎉 Successfully fetched ${aggregatedNews.length} live updates from Reddit, GitHub, HN & RSS feeds!`, 
            { 
              id: 'fetch-news',
              duration: 3000
            }
          )
        }
      } else {
        if (showToast) {
          toast.error('⚠️ Unable to fetch live updates. Showing cached content.', { 
            id: 'fetch-news',
            duration: 3000
          })
        }
      }
    } catch (error) {
      console.error('Error fetching Linux news:', error)
      if (showToast) {
        toast.error('❌ API fetch failed. Check connection. Showing offline content.', { 
          id: 'fetch-news',
          duration: 3000
        })
      }
    } finally {
      setLoading(false)
    }
  }

  const getNewsDetails = async (newsItem: NewsItem): Promise<NewsItem> => {
    try {
      toast.loading('📖 Loading full article content...', { id: 'fetch-details' })
      const detailedNews = await fetchNewsDetails(newsItem)
      toast.success('✅ Article loaded!', { 
        id: 'fetch-details',
        duration: 2000
      })
      return detailedNews
    } catch (error) {
      console.error('Error fetching news details:', error)
      toast.error('❌ Failed to load article details', { 
        id: 'fetch-details',
        duration: 2000
      })
      return newsItem
    }
  }

  const refreshNews = () => {
    toast.loading('🔄 Refreshing from all Linux sources...', { 
      id: 'refresh-news',
      duration: 2000
    })
    fetchNews(true)
    toast.dismiss('refresh-news')
  }

  // Initial load
  useEffect(() => {
    fetchNews(false)
  }, [])

  const filterNews = (category?: string, searchQuery?: string) => {
    let filtered = news

    if (category && category !== 'all') {
      filtered = filtered.filter(item => item.category === category)
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.content.toLowerCase().includes(query) ||
        item.source.toLowerCase().includes(query) ||
        item.excerpt.toLowerCase().includes(query) ||
        (item.author && item.author.toLowerCase().includes(query)) ||
        item.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }

    return filtered
  }

  const sortNews = (newsItems: NewsItem[], sortBy: 'latest' | 'popular' | 'trending') => {
    switch (sortBy) {
      case 'popular':
        return [...newsItems].sort((a, b) => {
          const scoreA = (a.upvotes - a.downvotes) + (a.comments * 0.5)
          const scoreB = (b.upvotes - b.downvotes) + (b.comments * 0.5)
          return scoreB - scoreA
        })
      case 'trending':
        return [...newsItems].sort((a, b) => {
          const now = new Date().getTime()
          const ageA = now - new Date(a.publishedAt).getTime()
          const ageB = now - new Date(b.publishedAt).getTime()
          
          const trendScoreA = (a.views * 0.6) + (a.comments * 2) + (a.upvotes * 1.5) - (ageA / (1000 * 60 * 60))
          const trendScoreB = (b.views * 0.6) + (b.comments * 2) + (b.upvotes * 1.5) - (ageB / (1000 * 60 * 60))
          
          return trendScoreB - trendScoreA
        })
      default:
        return [...newsItems].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    }
  }

  return {
    news,
    loading,
    lastUpdated,
    trendingTopics,
    sourceStats,
    refreshNews,
    getNewsDetails,
    filterNews,
    sortNews
  }
}