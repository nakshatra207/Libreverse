export interface NewsItem {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  source: string;
  sourceUrl: string;
  publishedAt: string;
  tags: string[];
  category: 'distro' | 'kernel' | 'security' | 'forum' | 'software' | 'hardware' | 'general' | 'desktop' | 'gaming' | 'foss' | 'server' | 'graphics';
  author?: string;
  upvotes: number;
  downvotes: number;
  comments: number;
  views: number;
}

export interface KernelRelease {
  version: string;
  releaseDate: string;
  isLTS: boolean;
  changelogUrl: string;
  downloadUrl: string;
  status: 'stable' | 'rc' | 'mainline';
  description?: string;
  features?: string[];
}

export interface DistroInfo {
  name: string;
  version: string;
  codename: string;
  releaseDate: string;
  supportUntil: string;
  downloadUrl: string;
  logo: string;
  description: string;
  popularity: number;
  category: 'desktop' | 'server' | 'embedded' | 'security' | 'enterprise';
}

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: string;
  forum: string;
  category: string;
  replies: number;
  views: number;
  lastActivity: string;
  tags: string[];
  isSticky: boolean;
  isSolved: boolean;
  upvotes: number;
  url: string;
}

export interface ForumThread {
  id: string;
  title: string;
  forum: string;
  author: string;
  replies: number;
  lastActivity: string;
  url: string;
  tags: string[];
}

export interface Comment {
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

export interface Discussion {
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

export interface CVEItem {
  id: string;
  title: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  affectedComponents: string[];
  publishedAt: string;
  fixedIn: string[];
  score?: number;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  tags: string[];
  readTime: number;
  likes: number;
  comments: number;
  source?: string;
  sourceUrl?: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  role?: 'admin' | 'moderator' | 'user';
  joinedAt?: string;
  avatar?: string;
  reputation?: number;
  posts?: number;
}

export interface RSSSource {
  name: string;
  url: string;
  category: string;
  lastFetched: string;
  isActive: boolean;
}

export interface TrendingTopic {
  topic: string;
  count: number;
}

export interface SourceStats {
  totalSources: number;
  totalCategories: number;
  topSources: { source: string; count: number }[];
  categoryBreakdown: { category: string; count: number }[];
}