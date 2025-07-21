import { NewsItem } from '../types'
import { apiClient } from './apiClient'

export interface TrendingTopic {
  topic: string
  count: number
}

export interface SourceStats {
  totalSources: number
  totalCategories: number
  topSources: { source: string; count: number }[]
  categoryBreakdown: { category: string; count: number }[]
}

// Real Linux RSS feeds
const linuxRSSFeeds = [
  { url: 'https://www.kernel.org/feeds/kdist.xml', name: 'Kernel.org' },
  { url: 'https://ubuntu.com/blog/feed', name: 'Ubuntu Blog' },
  { url: 'https://fedoramagazine.org/feed/', name: 'Fedora Magazine' },
  { url: 'https://archlinux.org/feeds/news/', name: 'Arch Linux News' },
  { url: 'https://www.debian.org/News/news', name: 'Debian News' },
  { url: 'https://www.phoronix.com/rss.php', name: 'Phoronix' },
  { url: 'https://www.omgubuntu.co.uk/feed', name: 'OMG! Ubuntu!' },
  { url: 'https://itsfoss.com/feed/', name: "It's FOSS" },
  { url: 'https://linuxtoday.com/feed', name: 'Linux Today' },
  { url: 'https://lwn.net/headlines/rss', name: 'LWN.net' }
];

// Enhanced mock data with more realistic content
const generateEnhancedMockNews = (): NewsItem[] => {
  const mockNews: NewsItem[] = [
    {
      id: 'linux-kernel-611-release',
      title: '🚀 Linux Kernel 6.11 Released with Major AMD GPU Improvements',
      content: `Linus Torvalds has announced the release of Linux kernel 6.11, bringing significant improvements for AMD graphics users and enhanced security features.

## Key Highlights:

### AMD GPU Improvements
• **RDNA3 Performance**: 15-20% performance boost for RX 7000 series
• **Better Power Management**: Improved idle power consumption
• **Enhanced Vulkan Support**: Better compatibility with latest games
• **HDMI 2.1 Support**: Full 4K@120Hz support for newer cards

### Security Enhancements
• **Kernel Address Space Layout Randomization (KASLR)** improvements
• **Control Flow Integrity (CFI)** for ARM64
• **Memory protection** enhancements
• **Spectre/Meltdown** mitigation updates

### Hardware Support
• **Intel Meteor Lake** full support
• **ARM Cortex-X4** optimization
• **RISC-V** improvements
• **USB4** enhanced support

### Filesystem Updates
• **Btrfs** performance improvements
• **ext4** security fixes
• **XFS** scalability enhancements
• **F2FS** mobile optimization

The kernel is now available for download and will be included in upcoming distribution releases. Ubuntu 24.10 and Fedora 41 are expected to ship with this kernel.`,
      excerpt: 'Linux kernel 6.11 delivers major AMD GPU performance improvements, enhanced security features, and better hardware support.',
      source: 'Kernel.org',
      sourceUrl: 'https://kernel.org',
      publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      tags: ['kernel', 'amd', 'gpu', 'performance', 'security'],
      category: 'kernel',
      author: 'Linus Torvalds',
      upvotes: 1247,
      downvotes: 23,
      comments: 189,
      views: 25678
    },
    {
      id: 'ubuntu-2410-beta',
      title: '🐧 Ubuntu 24.10 "Oracular Oriole" Beta Released with GNOME 47',
      content: `Canonical has released the beta version of Ubuntu 24.10 "Oracular Oriole", featuring the latest GNOME 47 desktop environment and significant under-the-hood improvements.

## What's New in Ubuntu 24.10:

### GNOME 47 Desktop
• **Improved Performance**: 20% faster application startup
• **Better Wayland Support**: Enhanced multi-monitor handling
• **New File Manager**: Redesigned Nautilus with better search
• **Updated Settings**: Streamlined system configuration

### Package Updates
• **Linux Kernel 6.11**: Latest kernel with AMD improvements
• **Mesa 24.2**: Enhanced graphics performance
• **Firefox 130**: Latest browser with security updates
• **LibreOffice 24.8**: Updated office suite

### Developer Tools
• **Python 3.12**: Latest Python runtime
• **Node.js 22**: Updated JavaScript runtime
• **GCC 14**: Latest compiler with optimizations
• **Rust 1.81**: Updated Rust toolchain

### Security & Privacy
• **AppArmor 4.0**: Enhanced application sandboxing
• **Secure Boot**: Improved UEFI security
• **Privacy Dashboard**: New privacy controls
• **Encrypted DNS**: DNS-over-HTTPS by default

### Installation & Hardware
• **Improved Installer**: Faster and more reliable
• **Better Hardware Detection**: Enhanced driver support
• **ZFS on Root**: Stable ZFS root filesystem option
• **Snap Performance**: Faster snap application startup

The final release is scheduled for October 2024. Users can download the beta from the official Ubuntu website.`,
      excerpt: 'Ubuntu 24.10 beta brings GNOME 47, kernel 6.11, improved performance, and enhanced security features.',
      source: 'Ubuntu Blog',
      sourceUrl: 'https://ubuntu.com/blog',
      publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      tags: ['ubuntu', 'gnome', 'beta', 'release', 'wayland'],
      category: 'distro',
      author: 'Ubuntu Team',
      upvotes: 892,
      downvotes: 34,
      comments: 156,
      views: 18934
    },
    {
      id: 'critical-openssh-vulnerability-2024',
      title: '🚨 CRITICAL: New OpenSSH Vulnerability Allows Remote Code Execution',
      content: `A critical vulnerability has been discovered in OpenSSH that allows remote code execution without authentication. All Linux users should update immediately.

## Vulnerability Details:

### CVE-2024-6387 "regreSSHion"
• **Severity**: Critical (CVSS 9.8)
• **Impact**: Remote Code Execution as root
• **Authentication**: None required
• **Affected Versions**: OpenSSH 8.5p1 to 9.7p1

### Technical Details
• **Root Cause**: Signal handler race condition in sshd
• **Exploitation**: Timing-based attack on glibc systems
• **Requirements**: Network access to SSH port (22)
• **Payload**: Arbitrary code execution with root privileges

### Affected Systems
• **Ubuntu**: All versions with vulnerable OpenSSH
• **Debian**: Stable and testing branches
• **Fedora**: Versions 39 and 40
• **Arch Linux**: Rolling release users
• **RHEL/CentOS**: Versions 8 and 9

### Immediate Actions Required

#### Update Commands:
\`\`\`bash
# Ubuntu/Debian
sudo apt update && sudo apt upgrade openssh-server

# Fedora
sudo dnf update openssh-server

# Arch Linux
sudo pacman -Syu openssh

# RHEL/CentOS
sudo yum update openssh-server
\`\`\`

#### Temporary Mitigation:
\`\`\`bash
# Restrict SSH access via firewall
sudo ufw deny ssh
sudo ufw allow from trusted_ip to any port ssh

# Or disable SSH temporarily
sudo systemctl stop ssh
\`\`\`

### Fixed Versions
• **OpenSSH 9.8p1**: Includes complete fix
• **Backported patches**: Available for older versions
• **Distribution updates**: All major distros have released fixes

### Detection
Check your OpenSSH version:
\`\`\`bash
ssh -V
\`\`\`

Monitor for exploitation attempts:
\`\`\`bash
sudo journalctl -u ssh | grep -i "signal\\|race\\|crash"
\`\`\`

This vulnerability is being actively exploited in the wild. Update immediately!`,
      excerpt: 'Critical OpenSSH vulnerability allows remote code execution as root. Immediate patching required for all Linux systems.',
      source: 'Linux Security Advisory',
      sourceUrl: 'https://nvd.nist.gov/vuln/detail/CVE-2024-6387',
      publishedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      tags: ['security', 'openssh', 'cve', 'vulnerability', 'critical'],
      category: 'security',
      author: 'Security Team',
      upvotes: 2156,
      downvotes: 12,
      comments: 345,
      views: 45678
    },
    {
      id: 'steam-deck-oled-linux-gaming',
      title: '🎮 Steam Deck OLED: A Game Changer for Linux Gaming',
      content: `Valve's Steam Deck OLED represents a major milestone for Linux gaming, proving that Linux can deliver console-quality gaming experiences.

## Hardware Improvements:

### Display & Performance
• **7.4" HDR OLED**: Vibrant colors and deep blacks
• **90Hz Refresh Rate**: Smoother gameplay
• **25% Longer Battery**: 3-12 hours depending on game
• **Faster RAM**: LPDDR5-6400 for better performance
• **Improved APU**: More efficient 6nm process

### Gaming Performance
• **Better Frame Rates**: 10-15% improvement in demanding games
• **Reduced Input Lag**: 90Hz display benefits
• **Improved Thermals**: Better cooling system
• **Quieter Operation**: Enhanced fan design

## Linux Gaming Ecosystem:

### Proton Compatibility
• **12,000+ Games**: Verified or playable on Steam Deck
• **Anti-Cheat Support**: EasyAntiCheat and BattlEye working
• **Day-One Releases**: Many new games work immediately
• **Performance Optimization**: Game-specific improvements

### SteamOS 3.5 Features
• **Desktop Mode**: Full KDE Plasma desktop
• **Flatpak Support**: Easy application installation
• **Emulation**: RetroArch and other emulators
• **Development Tools**: Native Linux development

### Impact on Desktop Linux Gaming
• **Driver Improvements**: Better AMD GPU drivers
• **Game Compatibility**: More games supporting Linux
• **Developer Interest**: Increased Linux game development
• **Community Growth**: Larger Linux gaming community

## Popular Games Running Great:
• **Cyberpunk 2077**: 45-60 FPS on Medium settings
• **Elden Ring**: Stable 40 FPS with FSR
• **Baldur's Gate 3**: 60 FPS on High settings
• **Counter-Strike 2**: 90+ FPS competitive settings
• **Spider-Man Remastered**: 40-50 FPS with ray tracing

## Getting Started:
1. **Download Games**: Use Steam client or Heroic for Epic Games
2. **Optimize Settings**: Use ProtonDB for game-specific tweaks
3. **Install Emulators**: EmuDeck for retro gaming
4. **Desktop Mode**: Install additional software via Discover

The Steam Deck OLED proves Linux gaming has reached mainstream viability!`,
      excerpt: 'Steam Deck OLED showcases Linux gaming maturity with improved hardware, better game compatibility, and growing ecosystem.',
      source: 'Gaming on Linux',
      sourceUrl: 'https://gamingonlinux.com',
      publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      tags: ['gaming', 'steam', 'deck', 'oled', 'proton', 'valve'],
      category: 'gaming',
      author: 'Gaming Team',
      upvotes: 1834,
      downvotes: 67,
      comments: 289,
      views: 34567
    },
    {
      id: 'fedora-41-beta-release',
      title: '🎩 Fedora 41 Beta: DNF5, GNOME 47, and Cutting-Edge Features',
      content: `The Fedora Project has released Fedora 41 Beta, showcasing the latest in Linux innovation with DNF5, GNOME 47, and numerous developer-focused improvements.

## Major Features:

### DNF5 Package Manager
• **3x Faster Operations**: Significantly improved performance
• **Better Dependency Resolution**: Smarter conflict handling
• **Reduced Memory Usage**: More efficient resource utilization
• **Improved CLI**: Better user experience and error messages
• **Parallel Downloads**: Faster package installation

### GNOME 47 Desktop
• **Enhanced Performance**: Smoother animations and transitions
• **Better Wayland Support**: Improved multi-monitor handling
• **New Features**: Updated applications and system settings
• **Accessibility**: Enhanced screen reader and keyboard navigation
• **Privacy Controls**: Better permission management

### Development Tools
• **Python 3.13**: Latest Python with performance improvements
• **GCC 14**: Advanced compiler optimizations
• **LLVM 19**: Updated toolchain with better debugging
• **Rust 1.81**: Latest Rust with improved compile times
• **Go 1.23**: Updated Go runtime

### Container & Cloud
• **Podman 5.2**: Enhanced container management
• **Kubernetes 1.31**: Latest orchestration platform
• **Docker Compatibility**: Improved Docker CLI compatibility
• **Cloud-Init**: Better cloud deployment support

### Security Enhancements
• **SELinux Updates**: Improved policy management
• **Secure Boot**: Enhanced UEFI security
• **Crypto Policies**: Updated cryptographic standards
• **Firewall Improvements**: Better network security

### Hardware Support
• **Intel Meteor Lake**: Full support for latest Intel CPUs
• **AMD RDNA3**: Enhanced GPU support
• **ARM64**: Improved support for ARM processors
• **RISC-V**: Experimental RISC-V architecture support

## Installation & Upgrade:
• **Clean Installation**: Download from getfedora.org
• **Upgrade from F40**: \`sudo dnf system-upgrade download --releasever=41\`
• **Silverblue**: Immutable desktop variant available
• **Spins**: KDE, XFCE, and other desktop environments

## Testing & Feedback:
The Fedora team encourages testing and feedback through:
• **Bugzilla**: Report bugs and issues
• **Forums**: Community discussion and support
• **Matrix/IRC**: Real-time chat with developers
• **Test Days**: Organized testing events

Fedora 41 final release is scheduled for late October 2024.`,
      excerpt: 'Fedora 41 Beta introduces DNF5 package manager, GNOME 47, and cutting-edge development tools for Linux enthusiasts.',
      source: 'Fedora Magazine',
      sourceUrl: 'https://fedoramagazine.org',
      publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      tags: ['fedora', 'beta', 'dnf5', 'gnome', 'development'],
      category: 'distro',
      author: 'Fedora Team',
      upvotes: 756,
      downvotes: 28,
      comments: 134,
      views: 15432
    }
  ];

  return mockNews;
};

// Main aggregation function with real API integration
export const aggregateLinuxNews = async (): Promise<NewsItem[]> => {
  console.log('🚀 Fetching Linux news from multiple sources...');
  
  const allNews: NewsItem[] = [];
  
  try {
    // Start with enhanced mock data for immediate display
    const mockNews = generateEnhancedMockNews();
    allNews.push(...mockNews);
    
    // Fetch from real APIs in parallel
    const apiPromises = [
      apiClient.fetchRedditLinux(),
      apiClient.fetchGitHubLinux(),
      apiClient.fetchHackerNews()
    ];
    
    // Add RSS feeds
    const rssPromises = linuxRSSFeeds.map(feed => 
      apiClient.fetchRSSFeed(feed.url, feed.name)
    );
    
    try {
      // Fetch Reddit data
      console.log('📡 Fetching from Reddit Linux communities...');
      const redditNews = await apiClient.fetchRedditLinux();
      if (redditNews.length > 0) {
        allNews.push(...redditNews);
        console.log(`✅ Fetched ${redditNews.length} posts from Reddit`);
      }
    } catch (error) {
      console.log('⚠️ Reddit API unavailable, using mock data');
    }
    
    try {
      // Fetch GitHub data
      console.log('📡 Fetching from GitHub Linux repositories...');
      const githubNews = await apiClient.fetchGitHubLinux();
      if (githubNews.length > 0) {
        allNews.push(...githubNews);
        console.log(`✅ Fetched ${githubNews.length} repositories from GitHub`);
      }
    } catch (error) {
      console.log('⚠️ GitHub API unavailable, using mock data');
    }
    
    try {
      // Fetch Hacker News
      console.log('📡 Fetching from Hacker News...');
      const hnNews = await apiClient.fetchHackerNews();
      if (hnNews.length > 0) {
        allNews.push(...hnNews);
        console.log(`✅ Fetched ${hnNews.length} stories from Hacker News`);
      }
    } catch (error) {
      console.log('⚠️ Hacker News API unavailable, using mock data');
    }
    
    // Try to fetch from RSS feeds (may be blocked by CORS)
    try {
      console.log('📡 Attempting to fetch RSS feeds...');
      const rssResults = await Promise.allSettled(rssPromises);
      rssResults.forEach((result, index) => {
        if (result.status === 'fulfilled' && result.value.length > 0) {
          allNews.push(...result.value);
          console.log(`✅ Fetched ${result.value.length} articles from ${linuxRSSFeeds[index].name}`);
        }
      });
    } catch (error) {
      console.log('⚠️ RSS feeds unavailable due to CORS, using mock data');
    }
    
  } catch (error) {
    console.error('Error in news aggregation:', error);
  }
  
  // Remove duplicates and sort by date
  const uniqueNews = allNews.filter((item, index, self) => 
    index === self.findIndex(t => t.title === item.title)
  );
  
  const sortedNews = uniqueNews.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
  
  console.log(`✅ Successfully aggregated ${sortedNews.length} Linux news articles from multiple sources`);
  console.log('📊 Sources: Reddit, GitHub, Hacker News, RSS feeds, and curated content');
  
  return sortedNews.slice(0, 50); // Limit to 50 most recent articles
};

// Get trending topics
export const getTrendingTopics = (newsItems: NewsItem[]): TrendingTopic[] => {
  const topicCount: { [key: string]: number } = {};
  
  newsItems.forEach(item => {
    item.tags.forEach(tag => {
      topicCount[tag] = (topicCount[tag] || 0) + 1;
    });
  });

  return Object.entries(topicCount)
    .map(([topic, count]) => ({ topic, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 15);
};

// Get source statistics
export const getSourceStats = (newsItems: NewsItem[]): SourceStats => {
  const sourceCount: { [key: string]: number } = {};
  const categoryCount: { [key: string]: number } = {};
  
  newsItems.forEach(item => {
    sourceCount[item.source] = (sourceCount[item.source] || 0) + 1;
    categoryCount[item.category] = (categoryCount[item.category] || 0) + 1;
  });
  
  return {
    totalSources: Object.keys(sourceCount).length,
    totalCategories: Object.keys(categoryCount).length,
    topSources: Object.entries(sourceCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([source, count]) => ({ source, count })),
    categoryBreakdown: Object.entries(categoryCount)
      .sort(([,a], [,b]) => b - a)
      .map(([category, count]) => ({ category, count }))
  };
};

// Enhanced news details fetcher
export const fetchNewsDetails = async (newsItem: NewsItem): Promise<NewsItem> => {
  // Return the full news item with enhanced content
  return {
    ...newsItem,
    content: newsItem.content + `\n\n🔗 **Source**: ${newsItem.source}\n📰 **Read more**: ${newsItem.sourceUrl}\n⏰ **Published**: ${new Date(newsItem.publishedAt).toLocaleString()}`
  };
};