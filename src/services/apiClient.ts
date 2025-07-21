// API Client for fetching real Linux news and updates
export class APIClient {
  private static instance: APIClient;
  private baseUrls = {
    reddit: 'https://www.reddit.com',
    github: 'https://api.github.com',
    hackernews: 'https://hacker-news.firebaseio.com/v0',
    rss: 'https://api.rss2json.com/v1/api.json'
  };

  static getInstance(): APIClient {
    if (!APIClient.instance) {
      APIClient.instance = new APIClient();
    }
    return APIClient.instance;
  }

  // Fetch from Reddit Linux communities
  async fetchRedditLinux(): Promise<any[]> {
    try {
      const subreddits = ['linux', 'linuxquestions', 'archlinux', 'ubuntu', 'fedora'];
      const posts: any[] = [];

      for (const subreddit of subreddits) {
        try {
          const response = await fetch(`${this.baseUrls.reddit}/r/${subreddit}/hot.json?limit=10`);
          if (response.ok) {
            const data = await response.json();
            const subredditPosts = data.data.children.map((post: any) => ({
              id: post.data.id,
              title: post.data.title,
              content: post.data.selftext || post.data.url,
              excerpt: this.truncateText(post.data.selftext || post.data.title, 150),
              source: `r/${subreddit}`,
              sourceUrl: `https://reddit.com${post.data.permalink}`,
              publishedAt: new Date(post.data.created_utc * 1000).toISOString(),
              tags: this.extractTags(post.data.title + ' ' + post.data.selftext),
              category: this.categorizePost(subreddit, post.data.title),
              author: post.data.author,
              upvotes: post.data.ups || 0,
              downvotes: post.data.downs || 0,
              comments: post.data.num_comments || 0,
              views: post.data.ups * 10 // Estimate views
            }));
            posts.push(...subredditPosts);
          }
        } catch (error) {
          console.log(`Error fetching from r/${subreddit}:`, error);
        }
      }

      return posts;
    } catch (error) {
      console.error('Error fetching Reddit data:', error);
      return [];
    }
  }

  // Fetch from GitHub Linux repositories
  async fetchGitHubLinux(): Promise<any[]> {
    try {
      const queries = [
        'linux+kernel',
        'linux+distribution',
        'linux+desktop',
        'linux+security'
      ];
      const repos: any[] = [];

      for (const query of queries) {
        try {
          const response = await fetch(
            `${this.baseUrls.github}/search/repositories?q=${query}&sort=updated&per_page=5`
          );
          if (response.ok) {
            const data = await response.json();
            const repoData = data.items.map((repo: any) => ({
              id: `gh-${repo.id}`,
              title: `🚀 ${repo.name}: ${repo.description || 'Linux Project Update'}`,
              content: repo.description || 'Linux project with recent updates',
              excerpt: this.truncateText(repo.description || repo.name, 150),
              source: 'GitHub',
              sourceUrl: repo.html_url,
              publishedAt: repo.updated_at,
              tags: repo.topics || ['linux', 'opensource'],
              category: 'software',
              author: repo.owner.login,
              upvotes: repo.stargazers_count || 0,
              downvotes: 0,
              comments: repo.open_issues_count || 0,
              views: repo.watchers_count * 5
            }));
            repos.push(...repoData);
          }
        } catch (error) {
          console.log(`Error fetching GitHub data for ${query}:`, error);
        }
      }

      return repos;
    } catch (error) {
      console.error('Error fetching GitHub data:', error);
      return [];
    }
  }

  // Fetch from RSS feeds using RSS2JSON service
  async fetchRSSFeed(rssUrl: string, sourceName: string): Promise<any[]> {
    try {
      const response = await fetch(
        `${this.baseUrls.rss}?rss_url=${encodeURIComponent(rssUrl)}&api_key=YOUR_API_KEY&count=10`
      );
      
      if (response.ok) {
        const data = await response.json();
        return data.items.map((item: any) => ({
          id: `rss-${item.guid || item.link}`,
          title: item.title,
          content: item.description || item.content,
          excerpt: this.truncateText(item.description || item.title, 150),
          source: sourceName,
          sourceUrl: item.link,
          publishedAt: item.pubDate,
          tags: this.extractTags(item.title + ' ' + item.description),
          category: this.categorizeContent(item.title),
          author: item.author || sourceName,
          upvotes: Math.floor(Math.random() * 100) + 10,
          downvotes: Math.floor(Math.random() * 10),
          comments: Math.floor(Math.random() * 50),
          views: Math.floor(Math.random() * 1000) + 100
        }));
      }
    } catch (error) {
      console.log(`Error fetching RSS from ${sourceName}:`, error);
    }
    return [];
  }

  // Fetch Hacker News Linux stories
  async fetchHackerNews(): Promise<any[]> {
    try {
      const response = await fetch(`${this.baseUrls.hackernews}/topstories.json`);
      if (!response.ok) return [];

      const storyIds = await response.json();
      const linuxStories: any[] = [];

      // Fetch first 20 stories and filter for Linux-related content
      for (let i = 0; i < Math.min(20, storyIds.length); i++) {
        try {
          const storyResponse = await fetch(`${this.baseUrls.hackernews}/item/${storyIds[i]}.json`);
          if (storyResponse.ok) {
            const story = await storyResponse.json();
            
            if (story.title && this.isLinuxRelated(story.title)) {
              linuxStories.push({
                id: `hn-${story.id}`,
                title: story.title,
                content: story.text || story.url || 'Hacker News discussion',
                excerpt: this.truncateText(story.title, 150),
                source: 'Hacker News',
                sourceUrl: story.url || `https://news.ycombinator.com/item?id=${story.id}`,
                publishedAt: new Date(story.time * 1000).toISOString(),
                tags: this.extractTags(story.title),
                category: 'general',
                author: story.by || 'HN User',
                upvotes: story.score || 0,
                downvotes: 0,
                comments: story.descendants || 0,
                views: (story.score || 0) * 15
              });
            }
          }
        } catch (error) {
          console.log(`Error fetching HN story ${storyIds[i]}:`, error);
        }
      }

      return linuxStories;
    } catch (error) {
      console.error('Error fetching Hacker News:', error);
      return [];
    }
  }

  // Helper methods
  private truncateText(text: string, maxLength: number): string {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  }

  private extractTags(text: string): string[] {
    if (!text) return [];
    
    const keywords = [
      'linux', 'ubuntu', 'fedora', 'arch', 'debian', 'kernel', 'gnome', 'kde',
      'wayland', 'security', 'gaming', 'steam', 'nvidia', 'amd', 'intel',
      'docker', 'kubernetes', 'server', 'desktop', 'terminal', 'bash'
    ];
    
    const lowerText = text.toLowerCase();
    return keywords.filter(keyword => lowerText.includes(keyword)).slice(0, 5);
  }

  private categorizePost(subreddit: string, title: string): string {
    const titleLower = title.toLowerCase();
    
    if (titleLower.includes('game') || titleLower.includes('steam')) return 'gaming';
    if (titleLower.includes('security') || titleLower.includes('vulnerability')) return 'security';
    if (titleLower.includes('kernel')) return 'kernel';
    if (titleLower.includes('desktop') || titleLower.includes('gnome') || titleLower.includes('kde')) return 'desktop';
    if (titleLower.includes('server')) return 'server';
    if (subreddit === 'archlinux' || subreddit === 'ubuntu' || subreddit === 'fedora') return 'distro';
    
    return 'general';
  }

  private categorizeContent(title: string): string {
    const titleLower = title.toLowerCase();
    
    if (titleLower.includes('kernel')) return 'kernel';
    if (titleLower.includes('security') || titleLower.includes('cve')) return 'security';
    if (titleLower.includes('game') || titleLower.includes('steam')) return 'gaming';
    if (titleLower.includes('ubuntu') || titleLower.includes('fedora') || titleLower.includes('arch')) return 'distro';
    if (titleLower.includes('hardware') || titleLower.includes('driver')) return 'hardware';
    
    return 'general';
  }

  private isLinuxRelated(title: string): boolean {
    const linuxKeywords = [
      'linux', 'ubuntu', 'fedora', 'arch', 'debian', 'kernel', 'gnome', 'kde',
      'wayland', 'x11', 'bash', 'terminal', 'unix', 'opensource', 'gnu'
    ];
    
    const titleLower = title.toLowerCase();
    return linuxKeywords.some(keyword => titleLower.includes(keyword));
  }
}

export const apiClient = APIClient.getInstance();