import React, { useState } from 'react';
import { MessageCircle, Plus, ArrowUp, ArrowDown, Reply, Edit, Trash2, Eye, Clock, User, Tag, CheckCircle, Pin, Send, Heart, Share2, Award, Bookmark, MoreHorizontal, Filter, Search, TrendingUp, Siren as Fire, Star, Users, MessageSquare, Image, Link, Code, Bold, Italic } from 'lucide-react';

interface Comment {
  id: string;
  content: string;
  author: string;
  avatar: string;
  createdAt: string;
  upvotes: number;
  downvotes: number;
  replies: Comment[];
  isEdited: boolean;
  awards: string[];
  userVote?: 'up' | 'down' | null;
}

interface Discussion {
  id: string;
  title: string;
  content: string;
  author: string;
  avatar: string;
  category: string;
  tags: string[];
  createdAt: string;
  upvotes: number;
  downvotes: number;
  comments: Comment[];
  views: number;
  isSticky: boolean;
  isSolved: boolean;
  status: 'open' | 'closed' | 'solved';
  awards: string[];
  userVote?: 'up' | 'down' | null;
  isBookmarked?: boolean;
}

const DiscussionForum: React.FC = () => {
  const [selectedDiscussion, setSelectedDiscussion] = useState<string | null>(null);
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostCategory, setNewPostCategory] = useState('General');
  const [newPostTags, setNewPostTags] = useState('');
  const [replyContent, setReplyContent] = useState('');
  const [showReplyForm, setShowReplyForm] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'hot' | 'new' | 'top' | 'rising'>('hot');
  const [searchQuery, setSearchQuery] = useState('');

  const discussions: Discussion[] = [
    {
      id: '1',
      title: '🔥 NVIDIA 545.29.06 driver breaks Wayland on Ubuntu 23.10 - Workaround found!',
      content: `**UPDATE: SOLUTION FOUND!** 🎉

After hours of debugging, I found the fix for the NVIDIA Wayland crash issue:

## The Problem
- NVIDIA driver 545.29.06 causes immediate Wayland session crashes
- GDM3 fails to start Wayland sessions
- Only X11 works temporarily

## The Solution ✅
\`\`\`bash
# 1. Switch to X11 temporarily
sudo nano /etc/gdm3/custom.conf
# Uncomment: WaylandEnable=false

# 2. Downgrade to stable driver
sudo apt remove nvidia-driver-545
sudo apt install nvidia-driver-535

# 3. Reboot and re-enable Wayland
sudo nano /etc/gdm3/custom.conf
# Comment out: #WaylandEnable=false

# 4. Reboot again
sudo reboot
\`\`\`

## Why This Works
The issue is with GBM backend compatibility in the new driver. Driver 535 has better Wayland integration.

**Status: SOLVED** ✅ - Works perfectly now!`,
      author: 'nvidia_expert_2024',
      avatar: '🔧',
      category: 'Hardware',
      tags: ['nvidia', 'wayland', 'ubuntu', 'drivers', 'solved'],
      createdAt: '2024-12-20T10:30:00Z',
      upvotes: 342,
      downvotes: 8,
      views: 12456,
      isSticky: false,
      isSolved: true,
      status: 'solved',
      awards: ['🏆', '🥇', '💡'],
      userVote: null,
      isBookmarked: false,
      comments: [
        {
          id: 'c1',
          content: 'This is exactly what I needed! The downgrade to 535 fixed everything. Thank you so much! 🙏',
          author: 'grateful_user',
          avatar: '😊',
          createdAt: '2024-12-20T11:15:00Z',
          upvotes: 45,
          downvotes: 0,
          isEdited: false,
          awards: ['❤️'],
          userVote: null,
          replies: [
            {
              id: 'c1r1',
              content: 'Glad it helped! Always backup your system before driver changes though 😉',
              author: 'nvidia_expert_2024',
              avatar: '🔧',
              createdAt: '2024-12-20T12:00:00Z',
              upvotes: 23,
              downvotes: 0,
              isEdited: false,
              awards: [],
              userVote: null,
              replies: []
            }
          ]
        },
        {
          id: 'c2',
          content: 'For anyone using Fedora, the equivalent commands are:\n```bash\nsudo dnf remove nvidia-driver\nsudo dnf install nvidia-driver-535xx\n```',
          author: 'fedora_user',
          avatar: '🎩',
          createdAt: '2024-12-20T13:30:00Z',
          upvotes: 67,
          downvotes: 2,
          isEdited: false,
          awards: ['🔥'],
          userVote: null,
          replies: []
        }
      ]
    },
    {
      id: '2',
      title: '🚀 Best Linux distro for gaming in 2025? (RTX 4080 + AMD Ryzen setup)',
      content: `Hey Linux gamers! 🎮

I'm finally making the switch from Windows to Linux and need advice for my gaming rig:

## My Setup
- **CPU**: AMD Ryzen 7 7700X
- **GPU**: NVIDIA RTX 4080
- **RAM**: 32GB DDR5
- **Storage**: 2TB NVMe SSD

## Games I Play
- Cyberpunk 2077
- Baldur's Gate 3  
- Counter-Strike 2
- Elden Ring
- Various Steam games

## What I've Heard
- **Pop!_OS**: Great NVIDIA support out of the box
- **Fedora**: Latest drivers and kernel
- **Manjaro**: Rolling release with good gaming tools
- **Ubuntu**: Most compatible but older packages

What's your experience? Any distro recommendations for this setup? 🤔`,
      author: 'future_linux_gamer',
      avatar: '🎮',
      category: 'Gaming',
      tags: ['gaming', 'nvidia', 'distro', 'recommendation'],
      createdAt: '2024-12-20T08:15:00Z',
      upvotes: 156,
      downvotes: 12,
      views: 8934,
      isSticky: false,
      isSolved: false,
      status: 'open',
      awards: ['🎮', '🔥'],
      userVote: null,
      isBookmarked: true,
      comments: [
        {
          id: 'c3',
          content: '**Pop!_OS all the way!** 🚀\n\nI have almost the same setup (RTX 4070 + Ryzen 5 7600X) and Pop!_OS has been flawless:\n\n✅ NVIDIA drivers pre-installed\n✅ Steam works perfectly\n✅ Proton compatibility is excellent\n✅ No driver headaches\n\nBeen gaming on it for 8 months now!',
          author: 'pop_os_gamer',
          avatar: '🚀',
          createdAt: '2024-12-20T09:30:00Z',
          upvotes: 89,
          downvotes: 3,
          isEdited: false,
          awards: ['🏆', '🎮'],
          userVote: null,
          replies: []
        },
        {
          id: 'c4',
          content: 'I\'d actually recommend **Fedora 40** with RPM Fusion! 🎩\n\nReasons:\n- Latest Mesa drivers\n- Kernel 6.6+ for best hardware support\n- Excellent Wayland support\n- Great performance with your AMD CPU\n\nJust install NVIDIA drivers from RPM Fusion and you\'re golden!',
          author: 'fedora_enthusiast',
          avatar: '🎩',
          createdAt: '2024-12-20T10:45:00Z',
          upvotes: 67,
          downvotes: 8,
          isEdited: false,
          awards: ['💡'],
          userVote: null,
          replies: []
        }
      ]
    },
    {
      id: '3',
      title: '📌 [STICKY] Weekly Linux Gaming Megathread - Share your setups and wins! 🎮',
      content: `Welcome to our weekly gaming discussion! 🎉

## This Week's Highlights
- **Proton 8.0-5** released with better BG3 support
- **EasyAntiCheat** now works with 200+ games
- **Steam Deck OLED** announced - same great Linux experience
- **Lutris 0.5.14** adds Epic Games Store improvements

## Share Your Gaming Stories! 
- What games are you playing on Linux?
- Any new games working perfectly?
- Performance tips and tricks?
- Hardware recommendations?

Let's celebrate Linux gaming! 🐧🎮`,
      author: 'moderator_gaming',
      avatar: '👑',
      category: 'Gaming',
      tags: ['gaming', 'weekly', 'megathread', 'community'],
      createdAt: '2024-12-19T00:00:00Z',
      upvotes: 234,
      downvotes: 5,
      views: 15678,
      isSticky: true,
      isSolved: false,
      status: 'open',
      awards: ['📌', '🎮', '🔥'],
      userVote: null,
      isBookmarked: false,
      comments: []
    }
  ];

  const categories = ['All', 'General', 'Hardware', 'Gaming', 'Installation', 'Security', 'Programming', 'Server'];

  const handleCreatePost = () => {
    if (newPostTitle.trim() && newPostContent.trim()) {
      // Create new post logic here
      const newPost: Discussion = {
        id: Date.now().toString(),
        title: newPostTitle,
        content: newPostContent,
        author: 'current_user',
        avatar: '👤',
        category: newPostCategory,
        tags: newPostTags.split(',').map(tag => tag.trim()).filter(Boolean),
        createdAt: new Date().toISOString(),
        upvotes: 1,
        downvotes: 0,
        views: 1,
        isSticky: false,
        isSolved: false,
        status: 'open',
        awards: [],
        comments: []
      };
      
      setNewPostTitle('');
      setNewPostContent('');
      setNewPostTags('');
      setShowNewPost(false);
      
      // In a real app, you would add this to your discussions state
      console.log('New post created:', newPost);
    }
  };

  const handleReply = (discussionId: string) => {
    if (replyContent.trim()) {
      const newComment = {
        id: Date.now().toString(),
        content: replyContent,
        author: 'current_user',
        avatar: '👤',
        createdAt: new Date().toISOString(),
        upvotes: 0,
        downvotes: 0,
        isEdited: false,
        awards: [],
        userVote: null,
        replies: []
      };
      
      setReplyContent('');
      setShowReplyForm(null);
      
      console.log('New reply created:', newComment);
    }
  };

  const handleVote = (id: string, type: 'up' | 'down', isComment: boolean = false) => {
    // Handle voting logic
    console.log(`Voting ${type} on ${isComment ? 'comment' : 'post'} ${id}`);
    // In a real app, you would update the vote counts
  };

  const formatRelativeTime = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const renderComment = (comment: Comment, depth: number = 0) => (
    <div key={comment.id} className={`${depth > 0 ? 'ml-8 border-l-2 border-green-500/30 pl-6' : ''} mb-6`}>
      <div className="bg-gray-800/80 rounded-xl border border-gray-700/50 p-6 hover:border-green-500/30 transition-all duration-300">
        <div className="flex items-start space-x-4">
          {/* User Avatar */}
          <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
            {comment.avatar}
          </div>
          
          <div className="flex-1">
            {/* Comment Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <span className="font-bold text-white">{comment.author}</span>
                <span className="text-gray-400 text-sm">{formatRelativeTime(comment.createdAt)}</span>
                {comment.isEdited && <span className="text-gray-500 text-xs bg-gray-700 px-2 py-1 rounded">edited</span>}
                {comment.awards.length > 0 && (
                  <div className="flex space-x-1">
                    {comment.awards.map((award, idx) => (
                      <span key={idx} className="text-lg">{award}</span>
                    ))}
                  </div>
                )}
              </div>
              <button className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-gray-700/50">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>

            {/* Comment Content */}
            <div className="prose prose-invert max-w-none mb-4">
              <p className="text-gray-300 whitespace-pre-line leading-relaxed">{comment.content}</p>
            </div>

            {/* Comment Actions */}
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
              
              <button 
                onClick={() => setShowReplyForm(showReplyForm === comment.id ? null : comment.id)}
                className="flex items-center text-gray-400 hover:text-blue-400 transition-colors text-sm p-2 rounded-lg hover:bg-blue-500/10"
              >
                <Reply className="h-4 w-4 mr-1" />
                Reply
              </button>
              
              <button className="flex items-center text-gray-400 hover:text-red-400 transition-colors text-sm p-2 rounded-lg hover:bg-red-500/10">
                <Heart className="h-4 w-4 mr-1" />
                Like
              </button>
              
              <button className="flex items-center text-gray-400 hover:text-green-400 transition-colors text-sm p-2 rounded-lg hover:bg-green-500/10">
                <Award className="h-4 w-4 mr-1" />
                Award
              </button>
            </div>
            
            {/* Reply Form */}
            {showReplyForm === comment.id && (
              <div className="mt-6 p-4 bg-gray-900/50 rounded-xl border border-gray-600">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-lg font-bold">
                    👤
                  </div>
                  <div className="flex-1">
                    <textarea
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder="Write your reply..."
                      className="w-full bg-gray-800 text-white p-4 rounded-lg border border-gray-600 focus:border-green-500 focus:ring-2 focus:ring-green-500/50 focus:outline-none resize-none"
                      rows={3}
                    />
                    <div className="flex justify-between items-center mt-3">
                      <div className="flex space-x-2">
                        <button className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700/50">
                          <Bold className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700/50">
                          <Italic className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700/50">
                          <Code className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700/50">
                          <Link className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex space-x-3">
                        <button
                          onClick={() => setShowReplyForm(null)}
                          className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleReply(comment.id)}
                          className="flex items-center bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-6 py-2 rounded-lg transition-all duration-300 font-medium"
                        >
                          <Send className="h-4 w-4 mr-2" />
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Nested Replies */}
      {comment.replies.map(reply => renderComment(reply, depth + 1))}
    </div>
  );

  // Individual Discussion View
  if (selectedDiscussion) {
    const discussion = discussions.find(d => d.id === selectedDiscussion);
    if (!discussion) return null;

    return (
      <div className="space-y-8">
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
              <span>{discussion.views.toLocaleString()} views</span>
            </div>
            <div className="flex items-center">
              <MessageCircle className="h-4 w-4 mr-1" />
              <span>{discussion.comments.length} comments</span>
            </div>
          </div>
        </div>

        {/* Discussion Post */}
        <div className="bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 rounded-2xl border border-gray-700 p-8 shadow-2xl">
          <div className="flex items-start space-x-6">
            {/* Voting */}
            <div className="flex flex-col items-center space-y-3 min-w-[80px]">
              <button 
                onClick={() => handleVote(discussion.id, 'up')}
                className="p-3 text-gray-400 hover:text-green-400 transition-all duration-300 bg-gray-700/50 rounded-xl hover:bg-green-500/20 hover:scale-110"
              >
                <ArrowUp className="h-6 w-6" />
              </button>
              <span className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                {discussion.upvotes}
              </span>
              <button 
                onClick={() => handleVote(discussion.id, 'down')}
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
                  {discussion.isSticky && (
                    <div className="flex items-center bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      <Pin className="h-4 w-4 mr-1" />
                      📌 PINNED
                    </div>
                  )}
                  {discussion.isSolved && (
                    <div className="flex items-center bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      ✅ SOLVED
                    </div>
                  )}
                  <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                    {discussion.category}
                  </span>
                  {discussion.awards.length > 0 && (
                    <div className="flex space-x-1">
                      {discussion.awards.map((award, idx) => (
                        <span key={idx} className="text-2xl">{award}</span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-yellow-400 transition-colors rounded-lg hover:bg-yellow-500/10">
                    <Bookmark className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-700/50">
                    <Share2 className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-700/50">
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-3xl font-bold text-white mb-6 leading-tight">{discussion.title}</h1>
              
              {/* Author Info */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
                  {discussion.avatar}
                </div>
                <div>
                  <div className="font-bold text-white">{discussion.author}</div>
                  <div className="text-gray-400 text-sm">{formatRelativeTime(discussion.createdAt)}</div>
                </div>
              </div>

              {/* Content */}
              <div className="prose prose-invert max-w-none mb-6">
                <div className="text-gray-300 whitespace-pre-line leading-relaxed text-lg">
                  {discussion.content}
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {discussion.tags.map((tag, index) => (
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
                <button className="flex items-center text-gray-400 hover:text-green-400 transition-colors p-2 rounded-lg hover:bg-green-500/10">
                  <Award className="h-5 w-5 mr-2" />
                  Give Award
                </button>
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
              Comments ({discussion.comments.length})
            </h3>
            <select className="bg-gray-800 border border-gray-600 text-white rounded-lg px-4 py-2 text-sm">
              <option>Best</option>
              <option>Top</option>
              <option>New</option>
              <option>Old</option>
            </select>
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
                    <button className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700/50">
                      <Bold className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700/50">
                      <Italic className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700/50">
                      <Code className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700/50">
                      <Link className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700/50">
                      <Image className="h-4 w-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => handleReply(discussion.id)}
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
            {discussion.comments.map(comment => renderComment(comment))}
          </div>
        </div>
      </div>
    );
  }

  // Main Forum View
  return (
    <div className="space-y-8">
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
                  Linux Discussion Forum
                </h1>
                <p className="text-xl text-white/90 font-medium">Join the conversation • Share knowledge • Build community</p>
              </div>
            </div>
            <button
              onClick={() => setShowNewPost(!showNewPost)}
              className="flex items-center bg-white/20 hover:bg-white/30 text-white px-8 py-4 rounded-2xl transition-all duration-300 font-bold text-lg backdrop-blur-sm border border-white/20 hover:scale-105"
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
              <div className="text-3xl font-bold text-white mb-1">45K</div>
              <div className="text-sm text-white/90 font-medium">Total Posts</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
              <div className="text-4xl mb-2">🔥</div>
              <div className="text-3xl font-bold text-white mb-1">234</div>
              <div className="text-sm text-white/90 font-medium">Today's Posts</div>
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
          
          {/* Category Filter */}
          <select
            className="bg-gray-800 border border-gray-600 text-white rounded-xl px-4 py-3 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-500/50 focus:outline-none"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'All' ? '🌐 All Categories' : `${category === 'Hardware' ? '🔧' : category === 'Gaming' ? '🎮' : '📁'} ${category}`}
              </option>
            ))}
          </select>
          
          {/* Sort Options */}
          <div className="flex items-center space-x-2">
            <span className="text-gray-400 text-sm font-medium">Sort:</span>
            <div className="flex space-x-1">
              {[
                { key: 'hot', label: 'Hot', icon: Fire, emoji: '🔥' },
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
                {categories.slice(1).map(category => (
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
            <div className="relative">
              <textarea
                placeholder="Share your thoughts, ask questions, or start a discussion..."
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                rows={8}
                className="w-full bg-gray-800 text-white px-6 py-4 rounded-xl border border-gray-600 focus:border-green-500 focus:ring-2 focus:ring-green-500/50 focus:outline-none resize-none"
              />
              <div className="absolute bottom-4 left-4 flex space-x-2">
                <button className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700/50">
                  <Bold className="h-4 w-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700/50">
                  <Italic className="h-4 w-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700/50">
                  <Code className="h-4 w-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700/50">
                  <Link className="h-4 w-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700/50">
                  <Image className="h-4 w-4" />
                </button>
              </div>
            </div>
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
      <div className="space-y-6">
        {discussions.map((discussion, index) => (
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
                  {discussion.upvotes}
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
                    {discussion.isSticky && (
                      <div className="flex items-center bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        <Pin className="h-4 w-4 mr-1" />
                        📌 PINNED
                      </div>
                    )}
                    {discussion.isSolved && (
                      <div className="flex items-center bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        ✅ SOLVED
                      </div>
                    )}
                    <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                      {discussion.category === 'Hardware' ? '🔧' : 
                       discussion.category === 'Gaming' ? '🎮' : 
                       discussion.category === 'Installation' ? '💿' : '📁'} {discussion.category}
                    </span>
                    {discussion.awards.length > 0 && (
                      <div className="flex space-x-1">
                        {discussion.awards.map((award, idx) => (
                          <span key={idx} className="text-xl">{award}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="text-gray-400 text-sm font-medium">
                    {formatRelativeTime(discussion.createdAt)}
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
                        {discussion.avatar}
                      </div>
                      <span className="font-medium text-white">{discussion.author}</span>
                    </div>
                    <div className="flex items-center bg-gray-700/50 px-3 py-2 rounded-lg">
                      <MessageCircle className="h-4 w-4 mr-2 text-green-400" />
                      <span className="font-medium text-gray-300">{discussion.comments.length} comments</span>
                    </div>
                    <div className="flex items-center bg-gray-700/50 px-3 py-2 rounded-lg">
                      <Eye className="h-4 w-4 mr-2 text-purple-400" />
                      <span className="font-medium text-gray-300">{discussion.views.toLocaleString()} views</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 text-gray-400 hover:text-yellow-400 transition-colors rounded-lg hover:bg-yellow-500/10"
                    >
                      <Bookmark className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-700/50"
                    >
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {discussion.tags.map((tag, tagIndex) => (
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

      {/* Load More */}
      <div className="text-center">
        <button className="bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 text-white px-8 py-4 rounded-2xl border border-gray-600 hover:border-green-500/50 transition-all duration-300 font-medium shadow-lg hover:shadow-xl">
          🔄 Load More Discussions
        </button>
      </div>
    </div>
  );
};

export default DiscussionForum;