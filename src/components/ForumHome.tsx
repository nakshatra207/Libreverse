import React, { useState } from 'react';
import { 
  MessageCircle, 
  TrendingUp, 
  Clock, 
  Users, 
  ArrowUp, 
  ArrowDown, 
  ExternalLink,
  Pin,
  CheckCircle,
  Eye,
  Filter,
  Plus,
  Terminal,
  Star,
  Flame,
  Zap,
  Award
} from 'lucide-react';
import { ForumPost } from '../types';

const ForumHome: React.FC = () => {
  const [sortBy, setSortBy] = useState<'latest' | 'popular' | 'trending'>('latest');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const forumPosts: ForumPost[] = [
    {
      id: '1',
      title: 'NVIDIA 545.29.06 driver breaks Wayland on Ubuntu 23.10 - Workaround found',
      content: 'After updating to the latest NVIDIA driver 545.29.06, Wayland sessions crash immediately on login. Here\'s the fix that worked for me: 1) Switch to X11 temporarily 2) Edit /etc/gdm3/custom.conf and uncomment WaylandEnable=false 3) Install nvidia-driver-535 instead: sudo apt install nvidia-driver-535 4) Reboot and Wayland works again. The issue seems to be with the new driver\'s interaction with GBM.',
      author: 'nvidia_user_2024',
      forum: 'r/linux',
      category: 'Hardware',
      replies: 127,
      views: 8934,
      lastActivity: '2024-10-01T14:30:00Z',
      tags: ['wayland', 'nvidia', 'drivers', 'ubuntu', 'gbm', 'gdm3'],
      isSticky: false,
      isSolved: false,
      upvotes: 289,
      url: 'https://reddit.com/r/linux/example1'
    },
    {
      id: '2',
      title: '[SOLVED] Arch Linux GRUB installation fails with "EFI variables are not supported"',
      content: 'SOLUTION: The issue was that I was installing in BIOS mode but had UEFI firmware. Steps to fix: 1) Boot the Arch ISO in UEFI mode (check with `ls /sys/firmware/efi/efivars`) 2) Create EFI system partition: `gdisk /dev/sda` -> new partition, type EF00 3) Format: `mkfs.fat -F32 /dev/sda1` 4) Mount: `mount /dev/sda1 /mnt/boot` 5) Install GRUB for UEFI: `grub-install --target=x86_64-efi --efi-directory=/boot --bootloader-id=GRUB` 6) Generate config: `grub-mkconfig -o /boot/grub/grub.cfg`. Thanks to @arch_veteran for the help!',
      author: 'arch_newbie',
      forum: 'Arch Forums',
      category: 'Installation',
      replies: 43,
      views: 2567,
      lastActivity: '2024-10-01T12:15:00Z',
      tags: ['arch', 'grub', 'uefi', 'installation', 'bootloader', 'efi'],
      isSticky: false,
      isSolved: true,
      upvotes: 134,
      url: 'https://bbs.archlinux.org/example2'
    },
    {
      id: '3',
      title: '[STICKY] Gaming on Linux Megathread: Steam Deck, Proton 8.0, and Anti-Cheat Status',
      content: 'Weekly discussion for all things Linux gaming! 🎮 This week\'s highlights: • Proton 8.0-5 released with better Baldur\'s Gate 3 support • EasyAntiCheat now works with 200+ games on Linux • Steam Deck OLED announced - same great Linux experience • Lutris 0.5.14 adds better Epic Games Store integration • Are You The One working perfectly on Fedora 39 with latest Mesa drivers. Share your gaming setups, performance tips, and newly working games!',
      author: 'moderator_linux',
      forum: 'LinuxQuestions',
      category: 'Gaming',
      replies: 456,
      views: 15421,
      lastActivity: '2024-10-01T09:45:00Z',
      tags: ['gaming', 'steam', 'proton', 'steamdeck', 'anticheat', 'lutris'],
      isSticky: true,
      isSolved: false,
      upvotes: 834,
      url: 'https://linuxquestions.org/example3'
    },
    {
      id: '4',
      title: 'Podman 4.7 vs Docker 24.0: Rootless containers performance comparison',
      content: 'I\'ve been testing both Podman 4.7 and Docker 24.0 for our CI/CD pipeline. Here are my findings: PODMAN PROS: • True rootless (no daemon) • Better security model • Systemd integration • Pod support (like Kubernetes) • No Docker Desktop licensing issues DOCKER PROS: • Wider ecosystem support • Better BuildKit integration • More stable networking • Easier for beginners PERFORMANCE: Podman is 15% faster for builds but Docker has better networking performance. For production, I\'m going with Podman for security. Thoughts?',
      author: 'devops_engineer',
      forum: 'r/docker',
      category: 'DevOps',
      replies: 167,
      views: 4890,
      lastActivity: '2024-09-30T16:20:00Z',
      tags: ['docker', 'podman', 'containers', 'devops', 'rootless', 'security'],
      isSticky: false,
      isSolved: false,
      upvotes: 278,
      url: 'https://reddit.com/r/docker/example4'
    },
    {
      id: '5',
      title: 'ZFS on Ubuntu 24.04 LTS: Complete setup with native encryption and auto-snapshots',
      content: 'Complete guide for ZFS setup on Ubuntu 24.04: INSTALLATION: `sudo apt install zfsutils-linux` CREATE ENCRYPTED POOL: `sudo zpool create -o ashift=12 -O encryption=aes-256-gcm -O keyformat=passphrase -O keylocation=prompt tank /dev/sdb` CONFIGURE DATASETS: ```sudo zfs create tank/home sudo zfs create tank/var sudo zfs set mountpoint=/home tank/home``` AUTO-SNAPSHOTS: Install zfs-auto-snapshot: `sudo apt install zfs-auto-snapshot` Enable: `sudo systemctl enable zfs-auto-snapshot-{hourly,daily,weekly,monthly}.timer` PERFORMANCE TUNING: Add to /etc/modprobe.d/zfs.conf: `options zfs zfs_arc_max=8589934592` (8GB) This setup gives you enterprise-grade storage with encryption and snapshots!',
      author: 'storage_expert',
      forum: 'Ubuntu Forums',
      category: 'Storage',
      replies: 89,
      views: 6567,
      lastActivity: '2024-09-30T11:30:00Z',
      tags: ['zfs', 'ubuntu', 'encryption', 'storage', 'snapshots', 'performance'],
      isSticky: false,
      isSolved: false,
      upvotes: 423,
      url: 'https://ubuntuforums.org/example5'
    },
    {
      id: '6',
      title: 'Linux 6.6.1 fixes critical AMD Ryzen 7000 series performance regression',
      content: 'PSA: If you\'re running AMD Ryzen 7000 series and noticed performance drops after kernel 6.6.0, update to 6.6.1 immediately! The issue was in the AMD P-State driver causing incorrect frequency scaling. SYMPTOMS: • 20-30% performance loss in CPU-intensive tasks • Incorrect boost frequencies reported • High idle power consumption FIXED IN 6.6.1: • Proper ACPI CPPC support for Ryzen 7000 • Fixed frequency scaling governors • Restored proper boost behavior UPDATE COMMANDS: Arch: `sudo pacman -Syu linux` Ubuntu: `sudo apt update && sudo apt upgrade linux-image-generic` Fedora: `sudo dnf update kernel` Can confirm 6.6.1 restores full performance on my 7950X!',
      author: 'amd_user',
      forum: 'Kernel.org',
      category: 'Kernel',
      replies: 189,
      views: 12134,
      lastActivity: '2024-09-29T20:10:00Z',
      tags: ['kernel', 'amd', 'ryzen', 'performance', 'regression', 'pstate'],
      isSticky: false,
      isSolved: false,
      upvotes: 567,
      url: 'https://lkml.org/example6'
    }
  ];

  const categories = ['all', 'Hardware', 'Installation', 'Gaming', 'DevOps', 'Storage', 'Kernel'];

  const filteredPosts = forumPosts.filter(post => 
    filterCategory === 'all' || post.category === filterCategory
  );

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case 'latest':
        return new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime();
      case 'popular':
        return b.upvotes - a.upvotes;
      case 'trending':
        return b.views - a.views;
      default:
        return 0;
    }
  });

  const getForumColor = (forum: string) => {
    if (forum.includes('reddit') || forum.includes('r/')) {
      return 'from-orange-500 to-red-600';
    } else if (forum.includes('Arch')) {
      return 'from-blue-500 to-indigo-600';
    } else if (forum.includes('Ubuntu')) {
      return 'from-orange-500 to-yellow-600';
    } else if (forum.includes('Kernel')) {
      return 'from-gray-600 to-gray-800';
    } else {
      return 'from-green-500 to-blue-600';
    }
  };

  // Handle voting
  const handleVote = (id: string, type: 'up' | 'down', isComment: boolean = false) => {
    console.log(`Voting ${type} on ${isComment ? 'comment' : 'post'} ${id}`);
  };

  const formatRelativeTime = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Less than 1 hour ago';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const stats = [
    { label: 'Active Users', value: '1.2K', icon: Users, color: 'from-blue-400 to-blue-600', emoji: '👥' },
    { label: 'Total Posts', value: '45K', icon: MessageCircle, color: 'from-green-400 to-green-600', emoji: '📝' },
    { label: "Today's Posts", value: '234', icon: Flame, color: 'from-orange-400 to-red-600', emoji: '🔥' },
    { label: 'Online Now', value: '12', icon: Zap, color: 'from-purple-400 to-purple-600', emoji: '⚡' }
  ];

  return (
    <div className="space-y-8">
      {/* Enhanced Header with stats */}
      <div className="relative bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 rounded-3xl p-10 shadow-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
        <div className="absolute top-6 right-6 text-8xl opacity-20">🐧</div>
        <div className="absolute bottom-6 left-6 text-6xl opacity-10">💬</div>
        
        <div className="relative z-10">
          <div className="flex items-center mb-6">
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mr-6 backdrop-blur-sm">
              <Terminal className="h-12 w-12 text-white" />
            </div>
            <div>
              <h1 className="text-5xl font-bold text-white mb-2 flex items-center">
                Linux Community Forum
                <Star className="h-8 w-8 ml-4 text-yellow-400" />
              </h1>
              <p className="text-xl text-white/90 font-medium">Join thousands of Linux enthusiasts worldwide</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 shadow-xl hover:scale-105 transition-transform duration-300">
                <div className="text-4xl mb-2">{stat.emoji}</div>
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-white/90 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Controls */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0 bg-gray-800/50 rounded-2xl p-6 backdrop-blur-sm border border-gray-700">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-3">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              onClick={() => window.open(post.url, '_blank', 'noopener,noreferrer')}
              className="bg-gray-800 border border-gray-600 text-white rounded-xl px-4 py-2 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-500/50 focus:outline-none"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? '🌐 All Categories' : `${category === 'Hardware' ? '🔧' : category === 'Gaming' ? '🎮' : category === 'Kernel' ? '⚡' : '📁'} ${category}`}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-gray-400 text-sm font-medium">Sort by:</span>
            <div className="flex space-x-1">
              {[
                { key: 'latest', label: 'Latest', icon: Clock, emoji: '🕒' },
                { key: 'popular', label: 'Popular', icon: TrendingUp, emoji: '🔥' },
                { key: 'trending', label: 'Trending', icon: Eye, emoji: '👁️' }
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
        
        <button className="flex items-center bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover:scale-105">
          <Plus className="h-5 w-5 mr-2" />
          ✨ New Post
        </button>
      </div>

      {/* Enhanced Forum Posts */}
      <div className="space-y-6">
        {sortedPosts.map((post, index) => (
          <div
            key={post.id}
            className="group bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 rounded-2xl border border-gray-700 hover:border-green-500/50 transition-all duration-300 p-8 hover:shadow-2xl hover:shadow-green-500/10 hover:scale-[1.02]"
            onClick={() => window.open(post.url, '_blank')}
          >
            <div className="flex items-start space-x-6">
              {/* Enhanced Vote buttons */}
              <div className="flex flex-col items-center space-y-2 min-w-[80px]">
                <button className="group/vote p-3 text-gray-400 hover:text-green-400 transition-all duration-300 bg-gray-700/50 rounded-xl hover:bg-green-500/20 hover:scale-110">
                  <ArrowUp className="h-6 w-6" />
                </button>
                <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                  {post.upvotes}
                </span>
                <button className="group/vote p-3 text-gray-400 hover:text-red-400 transition-all duration-300 bg-gray-700/50 rounded-xl hover:bg-red-500/20 hover:scale-110">
                  <ArrowDown className="h-6 w-6" />
                </button>
              </div>

              {/* Enhanced Post content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4 flex-wrap">
                    {post.isSticky && (
                      <div className="flex items-center bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                        <Pin className="h-3 w-3 mr-1" />
                        📌 PINNED
                      </div>
                    )}
                    {post.isSolved && (
                      <div className="flex items-center bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        ✅ SOLVED
                      </div>
                    )}
                    <span className={`bg-gradient-to-r ${getForumColor(post.forum)} text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg`}>
                      {post.forum}
                    </span>
                    <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-xs font-medium">
                      {post.category === 'Hardware' ? '🔧' : 
                       post.category === 'Gaming' ? '🎮' : 
                       post.category === 'Kernel' ? '⚡' : 
                       post.category === 'Installation' ? '💿' : '📁'} {post.category}
                    </span>
                  </div>
                  <div className="text-gray-400 text-sm font-medium">
                    {formatRelativeTime(post.lastActivity)}
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-3 hover:text-green-400 transition-colors cursor-pointer group-hover:text-green-400">
                  <a href={post.url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                    {post.title}
                    <ExternalLink className="h-5 w-5 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </h3>

                <p className="text-gray-300 text-base mb-6 line-clamp-3 leading-relaxed">
                  {post.content}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-8 text-gray-400">
                    <div className="flex items-center bg-gray-700/50 px-3 py-2 rounded-lg">
                      <Users className="h-4 w-4 mr-2 text-blue-400" />
                      <span className="font-medium">{post.author}</span>
                    </div>
                    <div className="flex items-center bg-gray-700/50 px-3 py-2 rounded-lg">
                      <MessageCircle className="h-4 w-4 mr-2 text-green-400" />
                      <span className="font-medium">{post.replies} replies</span>
                    </div>
                    <div className="flex items-center bg-gray-700/50 px-3 py-2 rounded-lg">
                      <Eye className="h-4 w-4 mr-2 text-purple-400" />
                      <span className="font-medium">{post.views} views</span>
                    </div>
                  </div>
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Join Discussion
                  </a>
                </div>

                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="bg-gradient-to-r from-gray-700 to-gray-600 text-gray-300 px-3 py-1 rounded-full text-xs hover:from-gray-600 hover:to-gray-500 cursor-pointer transition-all duration-300 hover:scale-105"
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

      {/* Enhanced Load more */}
      <div className="text-center">
        <button className="bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 text-white px-8 py-4 rounded-2xl border border-gray-600 hover:border-green-500/50 transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover:scale-105">
          🔄 Load More Posts
        </button>
      </div>
    </div>
  );
};

export default ForumHome;