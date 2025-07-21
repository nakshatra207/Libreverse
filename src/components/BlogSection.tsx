import React, { useState } from 'react';
import { Edit, Heart, MessageCircle, Share2, Calendar, User, Clock } from 'lucide-react';
import { BlogPost } from '../types';

const BlogSection: React.FC = () => {
  const [showEditor, setShowEditor] = useState(false);
  const [blogContent, setBlogContent] = useState('');
  const [blogTitle, setBlogTitle] = useState('');

  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'Getting Started with Arch Linux: A Comprehensive Guide',
      content: 'Arch Linux is a lightweight, flexible Linux distribution that follows the KISS principle...',
      excerpt: 'Learn how to install and configure Arch Linux from scratch, including package management and system optimization.',
      author: 'linux_enthusiast',
      publishedAt: '2024-10-01T08:00:00Z',
      tags: ['arch', 'installation', 'guide'],
      readTime: 12,
      likes: 89,
      comments: 23
    },
    {
      id: '2',
      title: 'Why I Switched from Windows to Linux and Never Looked Back',
      content: 'After 15 years of using Windows, I made the switch to Linux and my productivity has never been better...',
      excerpt: 'A personal journey from Windows to Linux, covering the challenges, benefits, and key learnings.',
      author: 'convert_user',
      publishedAt: '2024-09-30T14:30:00Z',
      tags: ['windows', 'linux', 'productivity'],
      readTime: 8,
      likes: 156,
      comments: 67
    },
    {
      id: '3',
      title: 'Building a Home Server with Debian: Services and Security',
      content: 'Setting up a home server can be incredibly rewarding. Here\'s how I built mine using Debian...',
      excerpt: 'Complete guide to setting up a home server with Debian, including Docker, VPN, and security hardening.',
      author: 'homelab_admin',
      publishedAt: '2024-09-28T16:45:00Z',
      tags: ['debian', 'server', 'homelab'],
      readTime: 15,
      likes: 234,
      comments: 45
    }
  ];

  const handlePublish = () => {
    if (blogTitle.trim() && blogContent.trim()) {
      const newBlogPost: BlogPost = {
        id: Date.now().toString(),
        title: blogTitle,
        content: blogContent,
        excerpt: blogContent.substring(0, 150) + '...',
        author: 'current_user',
        publishedAt: new Date().toISOString(),
        tags: ['blog', 'community'],
        readTime: Math.ceil(blogContent.split(' ').length / 200),
        likes: 0,
        comments: 0
      };
      
      console.log('Publishing blog post:', newBlogPost);
      setShowEditor(false);
      setBlogTitle('');
      setBlogContent('');
      alert('Blog post published successfully!');
    } else {
      alert('Please fill in both title and content');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Community Blog</h2>
        <button
          onClick={() => setShowEditor(!showEditor)}
          className="flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors"
        >
          <Edit className="h-4 w-4 mr-2" />
          Write Post
        </button>
      </div>

      {showEditor && (
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Write a New Blog Post</h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Blog post title..."
              value={blogTitle}
              onChange={(e) => setBlogTitle(e.target.value)}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none"
            />
            <textarea
              placeholder="Write your blog post content here... (Markdown supported)"
              value={blogContent}
              onChange={(e) => setBlogContent(e.target.value)}
              rows={10}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none resize-none"
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowEditor(false)}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handlePublish}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors"
              >
                Publish
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {blogPosts.map((post) => (
          <article
            key={post.id}
            className="bg-gray-800 rounded-lg border border-gray-700 hover:border-green-500 transition-all duration-200 p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4 text-gray-400 text-sm">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{post.readTime} min read</span>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-bold text-white mb-3 hover:text-green-400 transition-colors cursor-pointer">
              {post.title}
            </h3>

            <p className="text-gray-300 mb-4 line-clamp-3">
              {post.excerpt}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-700 text-gray-300 px-2 py-1 rounded-full text-xs"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-700">
              <div className="flex items-center space-x-6">
                <button className="flex items-center text-gray-400 hover:text-red-400 transition-colors">
                  <Heart className="h-4 w-4 mr-1" />
                  <span className="text-sm">{post.likes}</span>
                </button>
                <button className="flex items-center text-gray-400 hover:text-blue-400 transition-colors">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  <span className="text-sm">{post.comments}</span>
                </button>
                <button className="flex items-center text-gray-400 hover:text-green-400 transition-colors">
                  <Share2 className="h-4 w-4 mr-1" />
                  <span className="text-sm">Share</span>
                </button>
              </div>
              <button className="text-green-400 hover:text-green-300 transition-colors text-sm">
                Read More
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Blog Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">3</div>
            <div className="text-sm text-gray-400">Posts</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">479</div>
            <div className="text-sm text-gray-400">Total Likes</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">135</div>
            <div className="text-sm text-gray-400">Comments</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">35</div>
            <div className="text-sm text-gray-400">Avg. Read Time</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogSection;