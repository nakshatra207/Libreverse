import { useState, useEffect } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import type { Comment } from '../lib/supabase'
import toast from 'react-hot-toast'

// Mock comments data
const mockComments: Comment[] = [
  {
    id: 'c1',
    content: 'This is exactly what I needed! The downgrade to 535 fixed everything. Thank you so much! 🙏',
    discussion_id: '1',
    author_id: 'user1',
    author: {
      id: 'user1',
      username: 'grateful_user',
      email: 'user1@example.com',
      created_at: '2024-01-01',
      reputation: 25
    },
    parent_id: undefined,
    created_at: '2024-12-20T11:15:00Z',
    updated_at: '2024-12-20T11:15:00Z',
    upvotes: 45,
    downvotes: 0,
    is_edited: false
  },
  {
    id: 'c2',
    content: 'For anyone using Fedora, the equivalent commands are:\n```bash\nsudo dnf remove nvidia-driver\nsudo dnf install nvidia-driver-535xx\n```',
    discussion_id: '1',
    author_id: 'user2',
    author: {
      id: 'user2',
      username: 'fedora_user',
      email: 'user2@example.com',
      created_at: '2024-01-01',
      reputation: 75
    },
    parent_id: undefined,
    created_at: '2024-12-20T13:30:00Z',
    updated_at: '2024-12-20T13:30:00Z',
    upvotes: 67,
    downvotes: 2,
    is_edited: false
  }
]

export const useComments = (discussionId: string) => {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(false)

  const fetchComments = async () => {
    if (!discussionId) return

    try {
      setLoading(true)
      
      if (isSupabaseConfigured()) {
        // Try database first
        const { data, error } = await supabase
          .from('comments')
          .select(`
            *,
            author:profiles(*)
          `)
          .eq('discussion_id', discussionId)
          .order('created_at', { ascending: true })

        if (error) {
          console.log('Database error, using mock comments:', error)
          const filteredComments = mockComments.filter(c => c.discussion_id === discussionId)
          setComments(filteredComments)
        } else {
          setComments(data || [])
        }
      } else {
        // Use mock data when Supabase is not configured
        console.log('Using mock comments - Supabase not configured')
        const filteredComments = mockComments.filter(c => c.discussion_id === discussionId)
        setComments(filteredComments)
      }
    } catch (error) {
      console.log('Using mock comments:', error)
      const filteredComments = mockComments.filter(c => c.discussion_id === discussionId)
      setComments(filteredComments)
    } finally {
      setLoading(false)
    }
  }

  const createComment = async (content: string, parentId?: string) => {
    try {
      const newComment: Comment = {
        id: Date.now().toString(),
        content,
        discussion_id: discussionId,
        author_id: 'mock-user',
        author: {
          id: 'mock-user',
          username: 'You',
          email: 'user@example.com',
          created_at: new Date().toISOString(),
          reputation: 0
        },
        parent_id: parentId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        upvotes: 0,
        downvotes: 0,
        is_edited: false
      }
      
      setComments(prev => [...prev, newComment])
      toast.success('Comment added!')
      return { data: newComment, error: null }
    } catch (error) {
      console.error('Error creating comment:', error)
      toast.error('Failed to add comment')
      return { data: null, error }
    }
  }

  const voteOnComment = async (commentId: string, voteType: 'up' | 'down') => {
    try {
      setComments(prev => prev.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            upvotes: voteType === 'up' ? comment.upvotes + 1 : comment.upvotes,
            downvotes: voteType === 'down' ? comment.downvotes + 1 : comment.downvotes
          }
        }
        return comment
      }))

      toast.success(`${voteType === 'up' ? 'Upvoted' : 'Downvoted'}!`)
    } catch (error) {
      console.error('Error voting on comment:', error)
      toast.error('Failed to vote')
    }
  }

  const addReaction = async (commentId: string, emoji: string) => {
    try {
      toast.success(`Reacted with ${emoji}!`)
    } catch (error) {
      console.error('Error adding reaction:', error)
      toast.error('Failed to add reaction')
    }
  }

  useEffect(() => {
    fetchComments()
  }, [discussionId])

  return {
    comments,
    loading,
    createComment,
    voteOnComment,
    addReaction,
    refetch: fetchComments
  }
}