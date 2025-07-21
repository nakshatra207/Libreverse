import React from 'react';
import { Clock, ExternalLink, Tag } from 'lucide-react';
import { NewsItem } from '../types';

interface NewsCardProps {
  item: NewsItem;
}

const NewsCard: React.FC<NewsCardProps> = ({ item }) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'kernel':
        return 'bg-blue-600 text-blue-100';
      case 'distro':
        return 'bg-green-600 text-green-100';
      case 'security':
        return 'bg-red-600 text-red-100';
      case 'forum':
        return 'bg-purple-600 text-purple-100';
      case 'software':
        return 'bg-orange-600 text-orange-100';
      default:
        return 'bg-gray-600 text-gray-100';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 hover:border-green-500 transition-all duration-200 hover:shadow-lg hover:shadow-green-500/10">
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
            {item.category.toUpperCase()}
          </span>
          <div className="flex items-center text-gray-400 text-sm">
            <Clock className="h-4 w-4 mr-1" />
            {formatDate(item.publishedAt)}
          </div>
        </div>

        <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
          {item.title}
        </h3>

        <p className="text-gray-300 text-sm mb-4 line-clamp-3">
          {item.excerpt}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-400 text-sm">
            <span className="mr-2">Source:</span>
            <span className="text-green-400 font-medium">{item.source}</span>
          </div>
          <a
            href={item.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-green-400 hover:text-green-300 transition-colors"
          >
            <ExternalLink className="h-4 w-4 mr-1" />
            <span className="text-sm">Read More</span>
          </a>
        </div>

        {item.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-700">
            {item.tags.map((tag, index) => (
              <span
                key={index}
                className="flex items-center text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full"
              >
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsCard;