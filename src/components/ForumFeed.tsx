import React from 'react';
import { MessageCircle, ExternalLink, Users, Clock, Tag } from 'lucide-react';
import { ForumThread } from '../types';

const ForumFeed: React.FC = () => {
  const forumThreads: ForumThread[] = [
    {
      id: '1',
      title: 'Best Linux distro for gaming in 2024?',
      forum: 'r/linux_gaming',
      author: 'penguin_gamer',
      replies: 47,
      lastActivity: '2024-10-01T14:30:00Z',
      url: 'https://reddit.com/r/linux_gaming/example',
      tags: ['gaming', 'distro', 'steam']
    },
    {
      id: '2',
      title: 'How to compile custom kernel with specific modules?',
      forum: 'Linux Questions',
      author: 'kernel_hacker',
      replies: 23,
      lastActivity: '2024-10-01T12:15:00Z',
      url: 'https://linuxquestions.org/example',
      tags: ['kernel', 'compilation', 'modules']
    },
    {
      id: '3',
      title: 'Wayland vs X11: Performance comparison 2024',
      forum: 'Arch Forums',
      author: 'display_expert',
      replies: 89,
      lastActivity: '2024-10-01T09:45:00Z',
      url: 'https://bbs.archlinux.org/example',
      tags: ['wayland', 'x11', 'performance']
    },
    {
      id: '4',
      title: 'Setting up ZFS on Ubuntu 24.04 LTS',
      forum: 'Ubuntu Forums',
      author: 'storage_admin',
      replies: 34,
      lastActivity: '2024-09-30T16:20:00Z',
      url: 'https://ubuntuforums.org/example',
      tags: ['zfs', 'ubuntu', 'storage']
    },
    {
      id: '5',
      title: 'Rust vs C for system programming on Linux',
      forum: 'Hacker News',
      author: 'rust_dev',
      replies: 156,
      lastActivity: '2024-09-30T11:30:00Z',
      url: 'https://news.ycombinator.com/example',
      tags: ['rust', 'c', 'programming']
    },
    {
      id: '6',
      title: 'Docker alternatives: Podman vs containerd',
      forum: 'r/docker',
      author: 'container_user',
      replies: 67,
      lastActivity: '2024-09-29T20:10:00Z',
      url: 'https://reddit.com/r/docker/example',
      tags: ['docker', 'podman', 'containers']
    }
  ];

  const getForumColor = (forum: string) => {
    if (forum.includes('reddit') || forum.startsWith('r/')) {
      return 'bg-orange-600 text-orange-100';
    } else if (forum.includes('Arch')) {
      return 'bg-blue-600 text-blue-100';
    } else if (forum.includes('Ubuntu')) {
      return 'bg-orange-600 text-orange-100';
    } else if (forum.includes('Hacker')) {
      return 'bg-orange-600 text-orange-100';
    } else {
      return 'bg-gray-600 text-gray-100';
    }
  };

  const formatRelativeTime = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Less than 1 hour ago';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    return `${Math.floor(diffInHours / 24)} days ago`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Popular Forum Discussions</h2>
        <div className="flex space-x-4">
          <a
            href="https://reddit.com/r/linux"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-400 hover:text-green-300 transition-colors text-sm"
          >
            Reddit
          </a>
          <a
            href="https://linuxquestions.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-400 hover:text-green-300 transition-colors text-sm"
          >
            Linux Questions
          </a>
          <a
            href="https://bbs.archlinux.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-400 hover:text-green-300 transition-colors text-sm"
          >
            Arch Forums
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {forumThreads.map((thread) => (
          <div
            key={thread.id}
            className="bg-gray-800 rounded-lg border border-gray-700 hover:border-green-500 transition-all duration-200 p-6"
          >
            <div className="flex items-start justify-between mb-3">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getForumColor(thread.forum)}`}>
                {thread.forum}
              </span>
              <div className="flex items-center text-gray-400 text-sm">
                <Clock className="h-4 w-4 mr-1" />
                {formatRelativeTime(thread.lastActivity)}
              </div>
            </div>

            <h3 className="text-lg font-semibold text-white mb-2 hover:text-green-400 transition-colors">
              <a href={thread.url} target="_blank" rel="noopener noreferrer">
                {thread.title}
              </a>
            </h3>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4 text-gray-400 text-sm">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{thread.author}</span>
                </div>
                <div className="flex items-center">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  <span>{thread.replies} replies</span>
                </div>
              </div>
              <a
                href={thread.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => window.open(thread.url, '_blank', 'noopener,noreferrer')}
                className="flex items-center text-green-400 hover:text-green-300 transition-colors"
              >
                <ExternalLink className="h-4 w-4 mr-1" />
                <span className="text-sm">Join Discussion</span>
              </a>
            </div>

            <div className="flex flex-wrap gap-2">
              {thread.tags.map((tag, index) => (
                <span
                  key={index}
                  className="flex items-center text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full"
                >
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Forum Activity</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">6</div>
            <div className="text-sm text-gray-400">Active Threads</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">416</div>
            <div className="text-sm text-gray-400">Total Replies</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">5</div>
            <div className="text-sm text-gray-400">Forums</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">24h</div>
            <div className="text-sm text-gray-400">Updated</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumFeed;