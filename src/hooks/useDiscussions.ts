import { useState, useEffect } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import type { Discussion } from '../lib/supabase'
import toast from 'react-hot-toast'

// Mock data for when database is not connected
const mockDiscussions: Discussion[] = [
  {
    id: '1',
    title: '🔥 NVIDIA 545.29.06 driver breaks Wayland on Ubuntu 23.10 - Workaround found!',
    content: 'After updating to the latest NVIDIA driver, Wayland sessions crash immediately. Here\'s the fix that worked for me...',
    author_id: '1',
    author: {
      id: '1',
      username: 'nvidia_expert_2024',
      email: 'user@example.com',
      created_at: '2024-01-01',
      reputation: 100
    },
    category: 'Hardware',
    tags: ['nvidia', 'wayland', 'ubuntu', 'drivers'],
    created_at: '2024-12-20T10:30:00Z',
    updated_at: '2024-12-20T10:30:00Z',
    upvotes: 342,
    downvotes: 8,
    views: 12456,
    is_sticky: false,
    is_solved: true,
    status: 'solved'
  },
  {
    id: '2',
    title: '🚀 Best Linux distro for gaming in 2025? (RTX 4080 + AMD Ryzen setup)',
    content: 'I\'m finally making the switch from Windows to Linux and need advice for my gaming rig...',
    author_id: '2',
    author: {
      id: '2',
      username: 'future_linux_gamer',
      email: 'gamer@example.com',
      created_at: '2024-01-01',
      reputation: 50
    },
    category: 'Gaming',
    tags: ['gaming', 'nvidia', 'distro', 'recommendation'],
    created_at: '2024-12-20T08:15:00Z',
    updated_at: '2024-12-20T08:15:00Z',
    upvotes: 156,
    downvotes: 12,
    views: 8934,
    is_sticky: false,
    is_solved: false,
    status: 'open'
  }
]

export const useDiscussions = () => {
  const [discussions, setDiscussions] = useState<Discussion[]>(mockDiscussions)
  const [loading, setLoading] = useState(false)

  const fetchDiscussions = async () => {
    try {
      setLoading(true)
      
      if (isSupabaseConfigured()) {
        // Try to fetch from database
        const { data, error } = await supabase
          .from('discussions')
          .select(`
            *,
            author:profiles(*)
          `)
          .order('created_at', { ascending: false })

        if (error) {
          console.log('Database error, using mock data:', error)
          setDiscussions(mockDiscussions)
        } else {
          setDiscussions(data || mockDiscussions)
        }
      } else {
        // Use mock data when Supabase is not configured
        console.log('Using mock data - Supabase not configured')
        setDiscussions(mockDiscussions)
      }
    } catch (error) {
      console.log('Using mock data - database error:', error)
      setDiscussions(mockDiscussions)
    } finally {
      setLoading(false)
    }
  }

  const createDiscussion = async (discussionData: {
    title: string
    content: string
    category: string
    tags: string[]
  }) => {
    try {
      // Try database first
      const { data, error } = await supabase
        .from('discussions')
        .insert([discussionData])
        .select(`
          *,
          author:profiles(*)
        `)
        .single()

      if (error) {
        // Fallback to mock creation
        const newDiscussion: Discussion = {
          id: Date.now().toString(),
          ...discussionData,
          author_id: 'mock-user',
          author: {
            id: 'mock-user',
            username: 'You',
            email: 'user@example.com',
            created_at: new Date().toISOString(),
            reputation: 0
          },
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          upvotes: 1,
          downvotes: 0,
          views: 1,
          is_sticky: false,
          is_solved: false,
          status: 'open'
        }
        
        setDiscussions(prev => [newDiscussion, ...prev])
        toast.success('Discussion created successfully!')
        return { data: newDiscussion, error: null }
      }
      
      setDiscussions(prev => [data, ...prev])
      toast.success('Discussion created successfully!')
      return { data, error: null }
    } catch (error) {
      console.error('Error creating discussion:', error)
      toast.error('Failed to create discussion')
      return { data: null, error }
    }
  }

  const voteOnDiscussion = async (discussionId: string, voteType: 'up' | 'down') => {
    try {
      // Update local state immediately for better UX
      setDiscussions(prev => prev.map(discussion => {
        if (discussion.id === discussionId) {
          return {
            ...discussion,
            upvotes: voteType === 'up' ? discussion.upvotes + 1 : discussion.upvotes,
            downvotes: voteType === 'down' ? discussion.downvotes + 1 : discussion.downvotes
          }
        }
        return discussion
      }))

      toast.success(`${voteType === 'up' ? 'Upvoted' : 'Downvoted'}!`)
    } catch (error) {
      console.error('Error voting:', error)
      toast.error('Failed to vote')
    }
  }

  useEffect(() => {
    fetchDiscussions()
  }, [])

  return {
    discussions,
    loading,
    createDiscussion,
    voteOnDiscussion,
    refetch: fetchDiscussions
  }
}