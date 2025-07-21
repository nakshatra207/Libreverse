import React, { useState } from 'react'
import { 
  MessageCircle, 
  Plus, 
  ArrowUp, 
  ArrowDown, 
  Reply, 
  Heart, 
  Share2, 
  Bookmark,
  Send,
  Eye,
  Clock,
  User,
  Tag,
  CheckCircle,
  Pin,
  Filter,
  Search,
  TrendingUp,
  Flame,
  Star,
  Smile
} from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { useDiscussions } from '../hooks/useDiscussions'
import { useComments } from '../hooks/useComments'
import AuthModal from './AuthModal'
import toast, { Toaster } from 'react-hot-toast'

const RealTimeDiscussions: React.FC = () => {
  const { user } = useAuth()
  const { discussions, loading, createDiscussion, voteOnDiscussion } = useDiscussions()
  const [selectedDiscussion, setSelectedDiscussion] = useState<string | null>(null)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin')
  const [showNewPost, setShowNewPost] = useState(false)
  const [newPostTitle, setNewPostTitle] = useState('')
  const [newPostContent, setNewPostContent] = useState('')
  const [newPostCategory, setNewPostCategory] = useState('General')
  const [newPostTags, setNewPostTags] = useState('')
  const [replyContent, setReplyContent] = useState('')
  const [sortBy, setSortBy] = useState<'hot' | 'new' | 'top' | 'rising'>('hot')
  const [searchQuery, setSearchQuery] = useState('')

  const selectedDiscussionData = discussions.find(d => d.id === selectedDiscussion)
  const { comments, createComment, voteOnComment, addReaction } = useComments(selectedDiscussion || '')

  const categories = ['General', 'Hardware', 'Gaming', 'Installation', 'Security', 'Programming', 'Server']
  const reactions = ['❤️', '👍', '👎', '😂', '😮', '😢', '😡', '🔥', '💯', '🎉']

  const handleCreatePost = async () => {
    if (!newPostTitle.trim() || !newPostContent.trim()) {
      toast.error('Please fill in all fields')
      return
    }

    if (!user) {
      setShowAuthModal(true)
      setAuthMode('signin')
      toast.error('Please sign in to create a post')
      return
    }
    const { error } = await createDiscussion({
      title: newPostTitle,
      content: newPostContent,
      category: newPostCategory,
      tags: newPostTags.split(',').map(tag => tag.trim()).filter(Boolean)
    })

    if (!error) {
      setNewPostTitle('')
      setNewPostContent('')
      setNewPostTags('')
      setShowNewPost(false)
      toast.success('Discussion created successfully!')
    }
  }

  const handleVote = async (id: string, type: 'up' | 'down', isComment: boolean = false) => {
    if (isComment) {
      await voteOnComment(id, type)
    } else {
      await voteOnDiscussion(id, type)
    }
  }

  const handleReply = async () => {
    if (!replyContent.trim()) {
      toast.error('Please enter a comment')
      return
    }

    if (!user) {
      setShowAuthModal(true)
      setAuthMode('signin')
      toast.error('Please sign in to comment')
      return
    }
    const { error } = await createComment(replyContent)
    if (!error) {
      setReplyContent('')
      toast.success('Comment added successfully!')
    }
  }

  const handleReaction = async (targetId: string, emoji: string) => {
    await addReaction(targetId, emoji)
  }

  const formatRelativeTime = (dateString: string) => {
    const now = new Date()
    const date = new Date(dateString)
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    return `${Math.floor(diffInHours / 24)}d ago`
  }

  // Individual Discussion View
  if (selectedDiscussion && selectedDiscussionData) {
    return (
      <div className="space-y-8">
        <Toaster position="top-right" />
        
        {/* Back Button */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSelectedDiscussion(null)}
            className="flex items-center text-green-400 hover:text-green-300 transition-colors bg-gray-800/50 px-4 py-2 rounded-lg border border-gray-700 hover:border-green-500/50"
          >
            ← Back to Discussions
          </button>
          <div className="flex items-center space-x-4 text-gray-400 text-sm">
            <div className="flex items-center">
              <Eye className="h-4 w-4 mr-1" />
              <span>{selectedDiscussionData.views} views</span>
            </div>
            <div className="flex items-center">
              <MessageCircle className="h-4 w-4 mr-1" />
              <span>{comments.length} comments</span>
            </div>
          </div>
        </div>

        {/* Discussion Post */}
        <div className="bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 rounded-2xl border border-gray-700 p-8 shadow-2xl">
          <div className="flex items-start space-x-6">
            {/* Voting */}
            <div className="flex flex-col items-center space-y-3 min-w-[80px]">
              <button 
                onClick={() => handleVote(selectedDiscussionData.id, 'up')}
                className="p-3 text-gray-400 hover:text-green-400 transition-all duration-300 bg-gray-700/50 rounded-xl hover:bg-green-500/20 hover:scale-110"
              >
                <ArrowUp className="h-6 w-6" />
              </button>
              <span className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                {selectedDiscussionData.upvotes - selectedDiscussionData.downvotes}
              </span>
              <button 
                onClick={() => handleVote(selectedDiscussionData.id, 'down')}
                className="p-3 text-gray-400 hover:text-red-400 transition-all duration-300 bg-gray-700/50 rounded-xl hover:bg-red-500/20 hover:scale-110"
              >
                <ArrowDown className="h-6 w-6" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4 flex-wrap">
                  {selectedDiscussionData.is_sticky && (
                    <div className="flex items-center bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      <Pin className="h-4 w-4 mr-1" />
                      📌 PINNED
                    </div>
                  )}
                  {selectedDiscussionData.is_solved && (
                    <div className="flex items-center bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      ✅ SOLVED
                    </div>
                  )}
                  <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                    {selectedDiscussionData.category}
                  </span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-3xl font-bold text-white mb-6 leading-tight">{selectedDiscussionData.title}</h1>
              
              {/* Author Info */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
                  {selectedDiscussionData.author?.username?.[0]?.toUpperCase() || '👤'}
                </div>
                <div>
                  <div className="font-bold text-white">{selectedDiscussionData.author?.username || 'Anonymous'}</div>
                  <div className="text-gray-400 text-sm">{formatRelativeTime(selectedDiscussionData.created_at)}</div>
                </div>
              </div>

              {/* Content */}
              <div className="prose prose-invert max-w-none mb-6">
                <div className="text-gray-300 whitespace-pre-line leading-relaxed text-lg">
                  {selectedDiscussionData.content}
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedDiscussionData.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="flex items-center bg-gradient-to-r from-gray-700 to-gray-600 text-gray-300 px-3 py-1 rounded-full text-sm hover:from-gray-600 hover:to-gray-500 cursor-pointer transition-all duration-300"
                  >
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-6 pt-6 border-t border-gray-700">
                <button className="flex items-center text-gray-400 hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-blue-500/10">
                  <Share2 className="h-5 w-5 mr-2" />
                  Share
                </button>
                <button className="flex items-center text-gray-400 hover:text-yellow-400 transition-colors p-2 rounded-lg hover:bg-yellow-500/10">
                  <Bookmark className="h-5 w-5 mr-2" />
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-gray-800/50 rounded-2xl border border-gray-700 p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-white flex items-center">
              <MessageCircle className="h-6 w-6 mr-3 text-green-400" />
              Comments ({comments.length})
            </h3>
          </div>
          
          {/* Add Comment */}
          <div className="mb-8 p-6 bg-gray-900/50 rounded-xl border border-gray-600">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-xl font-bold">
                👤
              </div>
              <div className="flex-1">
                <textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="What are your thoughts?"
                  className="w-full bg-gray-800 text-white p-4 rounded-lg border border-gray-600 focus:border-green-500 focus:ring-2 focus:ring-green-500/50 focus:outline-none resize-none"
                  rows={4}
                />
                <div className="flex justify-between items-center mt-4">
                  <div className="flex space-x-2">
                    {reactions.map(emoji => (
                      <button
                        key={emoji}
                        className="p-2 text-lg hover:bg-gray-700/50 rounded-lg transition-colors"
                        title={`React with ${emoji}`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={handleReply}
                    className="flex items-center bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-300 font-medium"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Comment
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Comments List */}
          <div className="space-y-6">
            {comments.map(comment => (
              <div key={comment.id} className="bg-gray-800/80 rounded-xl border border-gray-700/50 p-6 hover:border-green-500/30 transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
                    {comment.author?.username?.[0]?.toUpperCase() || '👤'}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="font-bold text-white">{comment.author?.username || 'Anonymous'}</span>
                        <span className="text-gray-400 text-sm">{formatRelativeTime(comment.created_at)}</span>
                        {comment.is_edited && <span className="text-gray-500 text-xs bg-gray-700 px-2 py-1 rounded">edited</span>}
                      </div>
                    </div>

                    <div className="prose prose-invert max-w-none mb-4">
                      <p className="text-gray-300 whitespace-pre-line leading-relaxed">{comment.content}</p>
                    </div>

                    <div className="flex items-center space-x-6">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => handleVote(comment.id, 'up', true)}
                          className="flex items-center text-gray-400 hover:text-green-400 transition-colors p-2 rounded-lg hover:bg-green-500/10"
                        >
                          <ArrowUp className="h-4 w-4 mr-1" />
                          <span className="font-medium">{comment.upvotes}</span>
                        </button>
                        <button 
                          onClick={() => handleVote(comment.id, 'down', true)}
                          className="flex items-center text-gray-400 hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-red-500/10"
                        >
                          <ArrowDown className="h-4 w-4 mr-1" />
                          <span className="font-medium">{comment.downvotes}</span>
                        </button>
                      </div>
                      
                      <button className="flex items-center text-gray-400 hover:text-blue-400 transition-colors text-sm p-2 rounded-lg hover:bg-blue-500/10">
                        <Reply className="h-4 w-4 mr-1" />
                        Reply
                      </button>
                      
                      <button className="flex items-center text-gray-400 hover:text-red-400 transition-colors text-sm p-2 rounded-lg hover:bg-red-500/10">
                        <Heart className="h-4 w-4 mr-1" />
                        Like
                      </button>

                      <div className="flex space-x-1">
                        {reactions.slice(0, 5).map(emoji => (
                          <button
                            key={emoji}
                            onClick={() => handleReaction(comment.id, emoji)}
                            className="text-lg hover:bg-gray-700/50 rounded p-1 transition-colors"
                            title={`React with ${emoji}`}
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          mode={authMode}
          onModeChange={setAuthMode}
        />
      </div>
    )
  }

  // Main Forum View
  return (
    <div className="space-y-8">
      <Toaster position="top-right" />
      
      {/* Enhanced Header */}
      <div className="relative bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 rounded-3xl p-10 shadow-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
        <div className="absolute top-6 right-6 text-8xl opacity-20">💬</div>
        <div className="absolute bottom-6 left-6 text-6xl opacity-10">🐧</div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mr-6 backdrop-blur-sm">
                <MessageCircle className="h-12 w-12 text-white" />
              </div>
              <div>
                <h1 className="text-5xl font-bold text-white mb-2">
                  🔥 Real-Time Discussions
                </h1>
                <p className="text-xl text-white/90 font-medium">Join live conversations • Share instantly • Connect globally</p>
              </div>
            </div>
            <button
              onClick={() => setShowNewPost(!showNewPost)}
              className="flex items-center bg-white/20 hover:bg-white/30 text-white px-8 py-4 rounded-2xl transition-all duration-300 font-bold text-lg backdrop-blur-sm border border-white/20 hover:scale-105"
              disabled={!user}
              title={!user ? 'Please sign in to create a post' : 'Create a new discussion'}
            >
              <Plus className="h-6 w-6 mr-3" />
              Create Post
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
              <div className="text-4xl mb-2">👥</div>
              <div className="text-3xl font-bold text-white mb-1">1.2K</div>
              <div className="text-sm text-white/90 font-medium">Active Users</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
              <div className="text-4xl mb-2">📝</div>
              <div className="text-3xl font-bold text-white mb-1">{discussions.length}</div>
              <div className="text-sm text-white/90 font-medium">Total Posts</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
              <div className="text-4xl mb-2">🔥</div>
              <div className="text-3xl font-bold text-white mb-1">Live</div>
              <div className="text-sm text-white/90 font-medium">Real-Time</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
              <div className="text-4xl mb-2">⚡</div>
              <div className="text-3xl font-bold text-white mb-1">89</div>
              <div className="text-sm text-white/90 font-medium">Online Now</div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0 bg-gray-800/50 rounded-2xl p-6 backdrop-blur-sm border border-gray-700">
        <div className="flex flex-wrap items-center gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="h-5 w-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search discussions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-800 border border-gray-600 text-white pl-12 pr-6 py-3 rounded-xl text-sm focus:border-green-500 focus:ring-2 focus:ring-green-500/50 focus:outline-none w-80"
            />
          </div>
          
          {/* Sort Options */}
          <div className="flex items-center space-x-2">
            <span className="text-gray-400 text-sm font-medium">Sort:</span>
            <div className="flex space-x-1">
              {[
                { key: 'hot', label: 'Hot', icon: Flame, emoji: '🔥' },
                { key: 'new', label: 'New', icon: Clock, emoji: '🕒' },
                { key: 'top', label: 'Top', icon: TrendingUp, emoji: '📈' },
                { key: 'rising', label: 'Rising', icon: Star, emoji: '⭐' }
              ].map(({ key, label, icon: Icon, emoji }) => (
                <button
                  key={key}
                  onClick={() => setSortBy(key as any)}
                  className={`flex items-center px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    sortBy === key
                      ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                  }`}
                >
                  <span className="mr-2">{emoji}</span>
                  <Icon className="h-4 w-4 mr-1" />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* New Post Form */}
      {showNewPost && (
        <div className="bg-gray-800/80 rounded-2xl border border-gray-700 p-8 backdrop-blur-sm">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Plus className="h-6 w-6 mr-3 text-green-400" />
            Create New Discussion
          </h3>
          <div className="space-y-6">
            <input
              type="text"
              placeholder="What's your discussion about?"
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
              className="w-full bg-gray-800 text-white px-6 py-4 rounded-xl border border-gray-600 focus:border-green-500 focus:ring-2 focus:ring-green-500/50 focus:outline-none text-lg"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                value={newPostCategory}
                onChange={(e) => setNewPostCategory(e.target.value)}
                className="bg-gray-800 text-white px-4 py-3 rounded-xl border border-gray-600 focus:border-green-500 focus:ring-2 focus:ring-green-500/50 focus:outline-none"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Tags (comma separated)"
                value={newPostTags}
                onChange={(e) => setNewPostTags(e.target.value)}
                className="bg-gray-800 text-white px-4 py-3 rounded-xl border border-gray-600 focus:border-green-500 focus:ring-2 focus:ring-green-500/50 focus:outline-none"
              />
            </div>
            <textarea
              placeholder="Share your thoughts, ask questions, or start a discussion..."
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              rows={8}
              className="w-full bg-gray-800 text-white px-6 py-4 rounded-xl border border-gray-600 focus:border-green-500 focus:ring-2 focus:ring-green-500/50 focus:outline-none resize-none"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowNewPost(false)}
                className="px-6 py-3 text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreatePost}
                className="flex items-center bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-3 rounded-xl transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
              >
                <Send className="h-5 w-5 mr-2" />
                Post Discussion
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Discussions List */}
      {loading ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔄</div>
          <p className="text-gray-400">Loading discussions...</p>
        </div>
      ) : discussions.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">💬</div>
          <p className="text-gray-400 mb-4">No discussions yet. Be the first to start one!</p>
          <button
            onClick={() => setShowNewPost(true)}
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl transition-all duration-300 font-medium"
          >
            Create First Discussion
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {discussions.map((discussion) => (
            <div
              key={discussion.id}
              className="group bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 rounded-2xl border border-gray-700 hover:border-green-500/50 transition-all duration-300 p-8 hover:shadow-2xl hover:shadow-green-500/10 cursor-pointer"
              onClick={() => setSelectedDiscussion(discussion.id)}
            >
              <div className="flex items-start space-x-6">
                {/* Voting */}
                <div className="flex flex-col items-center space-y-3 min-w-[80px]">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleVote(discussion.id, 'up');
                    }}
                    className="p-3 text-gray-400 hover:text-green-400 transition-all duration-300 bg-gray-700/50 rounded-xl hover:bg-green-500/20 hover:scale-110"
                  >
                    <ArrowUp className="h-6 w-6" />
                  </button>
                  <span className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                    {discussion.upvotes - discussion.downvotes}
                  </span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleVote(discussion.id, 'down');
                    }}
                    className="p-3 text-gray-400 hover:text-red-400 transition-all duration-300 bg-gray-700/50 rounded-xl hover:bg-red-500/20 hover:scale-110"
                  >
                    <ArrowDown className="h-6 w-6" />
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4 flex-wrap">
                      {discussion.is_sticky && (
                        <div className="flex items-center bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                          <Pin className="h-4 w-4 mr-1" />
                          📌 PINNED
                        </div>
                      )}
                      {discussion.is_solved && (
                        <div className="flex items-center bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          ✅ SOLVED
                        </div>
                      )}
                      <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                        {discussion.category}
                      </span>
                    </div>
                    <div className="text-gray-400 text-sm font-medium">
                      {formatRelativeTime(discussion.created_at)}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-3 hover:text-green-400 transition-colors group-hover:text-green-400 leading-tight">
                    {discussion.title}
                  </h3>

                  {/* Author and Stats */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center bg-gray-700/50 px-3 py-2 rounded-lg">
                        <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-sm font-bold mr-2">
                          {discussion.author?.username?.[0]?.toUpperCase() || '👤'}
                        </div>
                        <span className="font-medium text-white">{discussion.author?.username || 'Anonymous'}</span>
                      </div>
                      <div className="flex items-center bg-gray-700/50 px-3 py-2 rounded-lg">
                        <MessageCircle className="h-4 w-4 mr-2 text-green-400" />
                        <span className="font-medium text-gray-300">0 comments</span>
                      </div>
                      <div className="flex items-center bg-gray-700/50 px-3 py-2 rounded-lg">
                        <Eye className="h-4 w-4 mr-2 text-purple-400" />
                        <span className="font-medium text-gray-300">{discussion.views} views</span>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {discussion.tags?.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="bg-gradient-to-r from-gray-700 to-gray-600 text-gray-300 px-3 py-1 rounded-full text-sm hover:from-gray-600 hover:to-gray-500 cursor-pointer transition-all duration-300"
                        onClick={(e) => e.stopPropagation()}
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

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </div>
  )
}

export default RealTimeDiscussions