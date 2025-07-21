import { useState, useEffect } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import type { User } from '@supabase/supabase-js'
import toast from 'react-hot-toast'

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      try {
        if (isSupabaseConfigured()) {
          const { data: { session } } = await supabase.auth.getSession()
          setUser(session?.user ?? null)
        } else {
          // No valid Supabase config, stay logged out
          setUser(null)
        }
      } catch (error) {
        console.log('Auth error, staying logged out:', error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    getSession()

    // Listen for auth changes
    let subscription: any = null
    
    if (isSupabaseConfigured()) {
      const { data } = supabase.auth.onAuthStateChange(
        (event, session) => {
          setUser(session?.user ?? null)
          setLoading(false)
        }
      )
      subscription = data.subscription
    }

    return () => {
      if (subscription) {
        subscription.unsubscribe()
      }
    }
  }, [])

  const signUp = async (email: string, password: string, username: string) => {
    try {
      // Validate inputs
      if (!email || !password || !username) {
        return { data: null, error: { message: 'All fields are required' } }
      }
      
      if (password.length < 6) {
        return { data: null, error: { message: 'Password must be at least 6 characters' } }
      }
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
          }
        }
      })
      return { data, error }
    } catch (error) {
      console.error('Sign up error:', error)
      return { data: null, error }
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      // Validate inputs
      if (!email || !password) {
        return { data: null, error: { message: 'Email and password are required' } }
      }
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      return { data, error }
    } catch (error) {
      console.error('Sign in error:', error)
      return { data: null, error }
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      return { error }
    } catch (error) {
      console.error('Sign out error:', error)
      return { error }
    }
  }

  return {
    user,
    loading,
    signUp,
    signIn,
    signOut,
  }
}