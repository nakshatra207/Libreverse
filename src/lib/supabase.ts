import { createClient } from '@supabase/supabase-js'

// Use valid placeholder values that won't cause errors
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUxOTI4MDAsImV4cCI6MTk2MDc2ODgwMH0.placeholder'

// Validate URL format before creating client
const isValidUrl = (url: string) => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

// Check if we have a real Supabase configuration
export const isSupabaseConfigured = () => {
  return supabaseUrl !== 'https://placeholder.supabase.co' && 
         !supabaseUrl.includes('placeholder') &&
         supabaseAnonKey !== 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUxOTI4MDAsImV4cCI6MTk2MDc2ODgwMH0.placeholder'
}

// Use fallback if URL is invalid
const validUrl = isValidUrl(supabaseUrl) ? supabaseUrl : 'https://placeholder.supabase.co'

export const supabase = createClient(validUrl, supabaseAnonKey)

// Database Types
export interface User {
  id: string
  username: string
  email: string
  avatar_url?: string
  created_at: string
  reputation: number
}

export interface Discussion {
  id: string
  title: string
  content: string
  author_id: string
  author: User
  category: string
  tags: string[]
  created_at: string
  updated_at: string
  upvotes: number
  downvotes: number
  views: number
  is_sticky: boolean
  is_solved: boolean
  status: 'open' | 'closed' | 'solved'
}

export interface Comment {
  id: string
  content: string
  discussion_id: string
  author_id: string
  author: User
  parent_id?: string
  created_at: string
  updated_at: string
  upvotes: number
  downvotes: number
  is_edited: boolean
}

export interface Vote {
  id: string
  user_id: string
  target_id: string
  target_type: 'discussion' | 'comment'
  vote_type: 'up' | 'down'
  created_at: string
}

export interface Reaction {
  id: string
  user_id: string
  target_id: string
  target_type: 'discussion' | 'comment'
  emoji: string
  created_at: string
}