// Real FOSS and Linux sources for LibreVerse
export const linuxDistros = [
  {
    name: 'Debian',
    url: 'https://www.debian.org',
    rss: 'https://www.debian.org/News/news',
    description: 'The universal operating system',
    category: 'stable'
  },
  {
    name: 'Ubuntu',
    url: 'https://ubuntu.com',
    rss: 'https://ubuntu.com/blog/feed',
    description: 'The most popular Linux distribution',
    category: 'desktop'
  },
  {
    name: 'Arch Linux',
    url: 'https://archlinux.org',
    rss: 'https://archlinux.org/feeds/news/',
    description: 'A simple, lightweight distribution',
    category: 'rolling'
  },
  {
    name: 'Fedora',
    url: 'https://getfedora.org',
    rss: 'https://fedoramagazine.org/feed/',
    description: 'Innovation platform with cutting-edge features',
    category: 'bleeding-edge'
  },
  {
    name: 'Linux Mint',
    url: 'https://linuxmint.com',
    rss: 'https://blog.linuxmint.com/?feed=rss2',
    description: 'Elegant, easy-to-use desktop Linux',
    category: 'desktop'
  },
  {
    name: 'Kali Linux',
    url: 'https://www.kali.org',
    rss: 'https://www.kali.org/blog/index.xml',
    description: 'Advanced penetration testing platform',
    category: 'security'
  },
  {
    name: 'Manjaro',
    url: 'https://manjaro.org',
    rss: 'https://manjaro.org/feed/',
    description: 'User-friendly Arch-based distribution',
    category: 'desktop'
  },
  {
    name: 'openSUSE',
    url: 'https://www.opensuse.org',
    rss: 'https://news.opensuse.org/feed.xml',
    description: 'Professional Linux with YaST',
    category: 'enterprise'
  },
  {
    name: 'Pop!_OS',
    url: 'https://pop.system76.com',
    rss: 'https://blog.system76.com/rss',
    description: 'Ubuntu-based OS for developers',
    category: 'desktop'
  }
];

export const fossNewsBlogs = [
  {
    name: "It's FOSS",
    url: 'https://itsfoss.com',
    rss: 'https://itsfoss.com/feed/',
    description: 'Linux tutorials, news, and reviews',
    category: 'news'
  },
  {
    name: 'OMG! Ubuntu',
    url: 'https://www.omgubuntu.co.uk',
    rss: 'https://www.omgubuntu.co.uk/feed',
    description: 'Ubuntu news and tutorials',
    category: 'ubuntu'
  },
  {
    name: 'Phoronix',
    url: 'https://www.phoronix.com',
    rss: 'https://www.phoronix.com/rss.php',
    description: 'Linux hardware reviews and benchmarks',
    category: 'hardware'
  },
  {
    name: 'Linux Today',
    url: 'https://www.linuxtoday.com',
    rss: 'https://www.linuxtoday.com/feed',
    description: 'Daily Linux news and articles',
    category: 'news'
  },
  {
    name: 'LWN (Linux Weekly News)',
    url: 'https://lwn.net',
    rss: 'https://lwn.net/headlines/rss',
    description: 'In-depth Linux kernel and development news',
    category: 'kernel'
  },
  {
    name: 'DistroWatch',
    url: 'https://distrowatch.com',
    rss: 'https://distrowatch.com/news/dw.xml',
    description: 'Linux distribution news and reviews',
    category: 'distros'
  }
];

export const securitySources = [
  {
    name: 'NIST CVE Database',
    url: 'https://nvd.nist.gov',
    api: 'https://services.nvd.nist.gov/rest/json/cves/2.0',
    description: 'National vulnerability database',
    category: 'cve'
  },
  {
    name: 'Debian Security Tracker',
    url: 'https://security-tracker.debian.org/tracker',
    api: 'https://security-tracker.debian.org/tracker/data/json',
    description: 'Debian security advisories',
    category: 'debian'
  },
  {
    name: 'Red Hat CVE Database',
    url: 'https://access.redhat.com/security/security-updates/#/cve',
    rss: 'https://access.redhat.com/security/data/csaf/v2/advisories/rhsa.json',
    description: 'Red Hat security updates',
    category: 'redhat'
  },
  {
    name: 'Linux Kernel Security',
    url: 'https://kernel.org/security.html',
    rss: 'https://www.kernel.org/feeds/kdist.xml',
    description: 'Official kernel security updates',
    category: 'kernel'
  }
];

export const linuxForums = [
  {
    name: 'r/linux',
    url: 'https://www.reddit.com/r/linux',
    api: 'https://www.reddit.com/r/linux.json',
    description: 'Main Linux subreddit',
    category: 'reddit'
  },
  {
    name: 'r/linuxquestions',
    url: 'https://www.reddit.com/r/linuxquestions',
    api: 'https://www.reddit.com/r/linuxquestions.json',
    description: 'Linux help and support',
    category: 'reddit'
  },
  {
    name: 'LinuxQuestions.org',
    url: 'https://www.linuxquestions.org/questions/',
    rss: 'https://www.linuxquestions.org/questions/syndication/rss.php',
    description: 'Linux help forum',
    category: 'forum'
  },
  {
    name: 'Ubuntu Forums',
    url: 'https://ubuntuforums.org',
    rss: 'https://ubuntuforums.org/external.php?type=RSS2',
    description: 'Official Ubuntu community forum',
    category: 'ubuntu'
  },
  {
    name: 'Arch Forums',
    url: 'https://bbs.archlinux.org',
    rss: 'https://bbs.archlinux.org/extern.php?action=feed&type=rss',
    description: 'Arch Linux community forum',
    category: 'arch'
  },
  {
    name: 'Unix & Linux Stack Exchange',
    url: 'https://unix.stackexchange.com',
    api: 'https://api.stackexchange.com/2.3/questions?site=unix',
    description: 'Q&A for Unix and Linux users',
    category: 'stackexchange'
  }
];

export const learningResources = [
  {
    name: 'Arch Wiki',
    url: 'https://wiki.archlinux.org',
    description: 'Comprehensive Linux documentation',
    category: 'wiki'
  },
  {
    name: 'Debian Wiki',
    url: 'https://wiki.debian.org',
    description: 'Debian-specific documentation',
    category: 'wiki'
  },
  {
    name: 'Fedora Docs',
    url: 'https://docs.fedoraproject.org',
    description: 'Official Fedora documentation',
    category: 'docs'
  },
  {
    name: 'LinuxCommand.org',
    url: 'http://linuxcommand.org',
    description: 'Learn the Linux command line',
    category: 'tutorial'
  },
  {
    name: 'TLDP',
    url: 'https://www.tldp.org',
    description: 'The Linux Documentation Project',
    category: 'docs'
  },
  {
    name: 'Ubuntu Manual',
    url: 'https://ubuntu-manual.org',
    description: 'Getting started with Ubuntu',
    category: 'manual'
  }
];

export const softwareRepositories = [
  {
    name: 'Flathub',
    url: 'https://flathub.org',
    api: 'https://flathub.org/api/v2/stats',
    description: 'Universal Linux app store',
    category: 'flatpak'
  },
  {
    name: 'Snapcraft',
    url: 'https://snapcraft.io',
    api: 'https://api.snapcraft.io/v2/snaps/find',
    description: 'Universal Linux packages',
    category: 'snap'
  },
  {
    name: 'AppImageHub',
    url: 'https://www.appimagehub.com',
    description: 'Portable Linux applications',
    category: 'appimage'
  },
  {
    name: 'GitHub Linux Projects',
    url: 'https://github.com/topics/linux',
    api: 'https://api.github.com/search/repositories?q=topic:linux',
    description: 'Open source Linux projects',
    category: 'github'
  }
];

export const linuxEvents = [
  {
    name: 'FOSDEM',
    url: 'https://fosdem.org',
    description: 'Free and Open Source Developers European Meeting',
    category: 'conference'
  },
  {
    name: 'Linux Foundation Events',
    url: 'https://events.linuxfoundation.org',
    description: 'Official Linux Foundation conferences',
    category: 'conference'
  },
  {
    name: 'DebConf',
    url: 'https://debconf.org',
    description: 'Annual Debian conference',
    category: 'debian'
  }
];

export const toolDirectories = [
  {
    name: 'TLDR Pages',
    url: 'https://tldr.sh',
    description: 'Simplified man pages',
    category: 'tools'
  },
  {
    name: 'Awesome Linux Software',
    url: 'https://github.com/LionSec/awesome-ethical-hacking#linux-tools',
    description: 'Curated list of Linux tools',
    category: 'awesome'
  },
  {
    name: 'Awesome Self-hosted',
    url: 'https://github.com/awesome-selfhosted/awesome-selfhosted',
    description: 'Self-hosted software alternatives',
    category: 'selfhosted'
  }
];