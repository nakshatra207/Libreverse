import React, { useState } from 'react'
import { X, User, Mail, Lock, LogIn, UserPlus } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import toast from 'react-hot-toast'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  mode: 'signin' | 'signup'
  onModeChange: (mode: 'signin' | 'signup') => void
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, mode, onModeChange }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn, signUp } = useAuth()

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email.trim() || !password.trim()) {
      toast.error('Please fill in all required fields')
      return
    }
    
    if (mode === 'signup' && !username.trim()) {
      toast.error('Please enter a username')
      return
    }
    
    setLoading(true)

    try {
      if (mode === 'signup') {
        const { error } = await signUp(email, password, username)
        if (error) {
          toast.error(error.message || 'Failed to create account')
        } else {
          toast.success('Account created! Please check your email to verify.')
          onClose()
        }
      } else {
        const { error } = await signIn(email, password)
        if (error) {
          toast.error(error.message || 'Failed to sign in')
        } else {
          toast.success('Welcome back!')
          onClose()
        }
      }
    } catch (error: any) {
      toast.error(error.message || 'An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-2xl border border-gray-700 p-8 w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center">
            {mode === 'signin' ? <LogIn className="h-6 w-6 mr-3 text-green-400" /> : <UserPlus className="h-6 w-6 mr-3 text-blue-400" />}
            {mode === 'signin' ? 'Welcome Back' : 'Join LibreVerse'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700/50"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
              <div className="relative">
                <User className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-gray-700 text-white pl-10 pr-4 py-3 rounded-lg border border-gray-600 focus:border-green-500 focus:ring-2 focus:ring-green-500/50 focus:outline-none"
                  placeholder="Choose a username"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
            <div className="relative">
              <Mail className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-700 text-white pl-10 pr-4 py-3 rounded-lg border border-gray-600 focus:border-green-500 focus:ring-2 focus:ring-green-500/50 focus:outline-none"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <div className="relative">
              <Lock className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-700 text-white pl-10 pr-4 py-3 rounded-lg border border-gray-600 focus:border-green-500 focus:ring-2 focus:ring-green-500/50 focus:outline-none"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-3 rounded-lg font-medium transition-all duration-300 disabled:opacity-50"
          >
            {loading ? 'Loading...' : mode === 'signin' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400">
            {mode === 'signin' ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => onModeChange(mode === 'signin' ? 'signup' : 'signin')}
              className="text-green-400 hover:text-green-300 font-medium"
            >
              {mode === 'signin' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default AuthModal