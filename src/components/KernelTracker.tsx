import React from 'react';
import { Download, GitBranch, Shield, Calendar } from 'lucide-react';
import { KernelRelease } from '../types';

const KernelTracker: React.FC = () => {
  const kernelReleases: KernelRelease[] = [
    {
      version: '6.11.0',
      releaseDate: '2024-09-15',
      isLTS: false,
      changelogUrl: 'https://kernelnewbies.org/Linux_6.11',
      downloadUrl: 'https://kernel.org/pub/linux/kernel/v6.x/linux-6.11.tar.xz',
      status: 'stable',
      description: 'Latest stable kernel with performance improvements',
      features: ['Improved AMD support', 'Better power management', 'Security enhancements']
    },
    {
      version: '6.10.11',
      releaseDate: '2024-09-12',
      isLTS: false,
      changelogUrl: 'https://kernelnewbies.org/Linux_6.10',
      downloadUrl: 'https://kernel.org/pub/linux/kernel/v6.x/linux-6.10.11.tar.xz',
      status: 'stable',
      description: 'Stable kernel with bug fixes',
      features: ['Bug fixes', 'Driver updates', 'Security patches']
    },
    {
      version: '6.6.51',
      releaseDate: '2024-09-12',
      isLTS: true,
      changelogUrl: 'https://kernelnewbies.org/Linux_6.6',
      downloadUrl: 'https://kernel.org/pub/linux/kernel/v6.x/linux-6.6.51.tar.xz',
      status: 'stable',
      description: 'Long Term Support kernel',
      features: ['LTS support', 'Enterprise features', 'Stability focus']
    },
    {
      version: '6.12-rc1',
      releaseDate: '2024-09-30',
      isLTS: false,
      changelogUrl: 'https://kernelnewbies.org/Linux_6.12',
      downloadUrl: 'https://kernel.org/pub/linux/kernel/v6.x/testing/linux-6.12-rc1.tar.xz',
      status: 'rc',
      description: 'Release candidate for testing',
      features: ['New features', 'Testing phase', 'Experimental']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'stable':
        return 'bg-green-600 text-green-100';
      case 'rc':
        return 'bg-yellow-600 text-yellow-100';
      case 'mainline':
        return 'bg-blue-600 text-blue-100';
      default:
        return 'bg-gray-600 text-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Kernel Releases</h2>
        <a
          href="https://kernel.org"
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-400 hover:text-green-300 transition-colors"
        >
          View on kernel.org
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {kernelReleases.map((release, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg border border-gray-700 hover:border-green-500 transition-all duration-200 p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                  <GitBranch className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center">
                    🐧 Linux {release.version}
                  </h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <Calendar className="h-3 w-3 text-gray-400" />
                    <span className="text-gray-400 text-sm">{new Date(release.releaseDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {release.isLTS && (
                  <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    🛡️ LTS
                  </span>
                )}
                <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-lg ${getStatusColor(release.status)}`}>
                  {release.status === 'stable' ? '✅ STABLE' : 
                   release.status === 'rc' ? '🧪 RC' : 
                   '🚀 ' + release.status.toUpperCase()}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center text-gray-300">
                <Calendar className="h-4 w-4 mr-2" />
                <span>Released: {new Date(release.releaseDate).toLocaleDateString()}</span>
              </div>

              <div className="flex space-x-4">
                <a
                  href={release.changelogUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => window.open(release.changelogUrl, '_blank', 'noopener,noreferrer')}
                  className="flex items-center text-green-400 hover:text-green-300 transition-colors"
                >
                  <Shield className="h-4 w-4 mr-1" />
                  <span className="text-sm">Changelog</span>
                </a>
                <a
                  href={release.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => window.open(release.downloadUrl, '_blank', 'noopener,noreferrer')}
                  className="flex items-center text-green-400 hover:text-green-300 transition-colors"
                >
                  <Download className="h-4 w-4 mr-1" />
                  <span className="text-sm">Download</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Kernel Development Timeline</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-300">Current Stable</span>
            <span className="text-green-400 font-medium">6.11.0</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-300">Latest LTS</span>
            <span className="text-blue-400 font-medium">6.6.51</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-300">Development (RC)</span>
            <span className="text-yellow-400 font-medium">6.12-rc1</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KernelTracker;