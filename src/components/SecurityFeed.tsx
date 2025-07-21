import React from 'react';
import { AlertTriangle, Shield, Bug, ExternalLink } from 'lucide-react';
import { CVEItem } from '../types';

const SecurityFeed: React.FC = () => {
  const cveItems: CVEItem[] = [
    {
      id: 'CVE-2024-6387',
      title: 'OpenSSH Remote Code Execution Vulnerability (regreSSHion)',
      severity: 'critical',
      description: 'A signal handler race condition in OpenSSH\'s server (sshd) allows unauthenticated remote code execution as root on glibc-based Linux systems.',
      affectedComponents: ['OpenSSH', 'sshd', 'glibc', 'Linux'],
      publishedAt: '2024-10-01T10:00:00Z',
      fixedIn: ['openssh-9.8p1', 'openssh-9.7p1-security', 'openssh-9.6p1-security']
    },
    {
      id: 'CVE-2024-47076',
      title: 'CUPS Remote Code Execution via IPP Attributes',
      severity: 'high',
      description: 'A vulnerability in CUPS allows remote attackers to execute arbitrary code by manipulating IPP attributes when adding a malicious printer.',
      affectedComponents: ['CUPS', 'cups-browsed', 'libcupsfilters', 'libppd'],
      publishedAt: '2024-09-28T14:30:00Z',
      fixedIn: ['cups-2.4.7', 'cups-filters-2.0.1', 'libppd-2.0.1']
    },
    {
      id: 'CVE-2024-47175',
      title: 'Linux Kernel Use-After-Free in netfilter',
      severity: 'medium',
      description: 'A use-after-free vulnerability in the Linux kernel\'s netfilter subsystem could allow local privilege escalation.',
      affectedComponents: ['Linux Kernel', 'netfilter', 'iptables', 'nftables'],
      publishedAt: '2024-09-25T09:15:00Z',
      fixedIn: ['linux-6.6.52', 'linux-6.10.11', 'linux-6.11.1']
    },
    {
      id: 'CVE-2024-46695',
      title: 'AMD GPU Driver Memory Leak in AMDGPU',
      severity: 'medium',
      description: 'A memory leak in the AMDGPU driver could lead to system instability and potential denial of service on systems with AMD graphics.',
      affectedComponents: ['AMDGPU', 'Mesa', 'Linux Kernel', 'AMD Graphics'],
      publishedAt: '2024-09-20T16:45:00Z',
      fixedIn: ['linux-6.6.51', 'mesa-24.2.4', 'amdgpu-pro-24.20']
    },
    {
      id: 'CVE-2024-46701',
      title: 'Bluetooth Stack Buffer Overflow in BlueZ',
      severity: 'high',
      description: 'A buffer overflow in the BlueZ Bluetooth stack could allow remote code execution when processing malformed Bluetooth packets.',
      affectedComponents: ['BlueZ', 'Bluetooth', 'Linux Kernel', 'bluetoothd'],
      publishedAt: '2024-09-18T11:20:00Z',
      fixedIn: ['bluez-5.77', 'bluez-5.76-security', 'linux-6.6.50']
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-600 text-red-100';
      case 'high':
        return 'bg-orange-600 text-orange-100';
      case 'medium':
        return 'bg-yellow-600 text-yellow-100';
      case 'low':
        return 'bg-green-600 text-green-100';
      default:
        return 'bg-gray-600 text-gray-100';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <AlertTriangle className="h-6 w-6 text-white" />;
      case 'high':
        return <AlertTriangle className="h-6 w-6 text-white" />;
      case 'medium':
        return <Bug className="h-6 w-6 text-white" />;
      case 'low':
        return <Shield className="h-6 w-6 text-white" />;
      default:
        return <Bug className="h-6 w-6 text-white" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Security Advisories</h2>
        <a
          href="https://cve.mitre.org"
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-400 hover:text-green-300 transition-colors"
        >
          View CVE Database
        </a>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {cveItems.map((cve, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg border border-gray-700 hover:border-red-500 transition-all duration-200 p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${
                  cve.severity === 'critical' ? 'bg-gradient-to-br from-red-500 to-red-700' :
                  cve.severity === 'high' ? 'bg-gradient-to-br from-orange-500 to-red-600' :
                  cve.severity === 'medium' ? 'bg-gradient-to-br from-yellow-500 to-orange-600' :
                  'bg-gradient-to-br from-green-500 to-blue-600'
                }`}>
                  {getSeverityIcon(cve.severity)}
                </div>
                <div className={`flex items-center px-3 py-1 rounded-full text-xs font-medium ${getSeverityColor(cve.severity)}`}>
                  <span className="font-bold">
                    {cve.severity === 'critical' ? '🚨 CRITICAL' :
                     cve.severity === 'high' ? '⚠️ HIGH' :
                     cve.severity === 'medium' ? '🟡 MEDIUM' :
                     '🟢 LOW'}
                  </span>
                </div>
                <span className="text-gray-400 text-sm font-mono">{cve.id}</span>
              </div>
              <div className="text-gray-400 text-sm">
                {new Date(cve.publishedAt).toLocaleDateString()}
              </div>
            </div>

            <h3 className="text-lg font-semibold text-white mb-2">{cve.title}</h3>
            <p className="text-gray-300 text-sm mb-4">{cve.description}</p>

            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-2">Affected Components:</h4>
                <div className="flex flex-wrap gap-2">
                  {cve.affectedComponents.map((component, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs"
                    >
                      {component}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-2">Fixed In:</h4>
                <div className="flex flex-wrap gap-2">
                  {cve.fixedIn.map((version, idx) => (
                    <span
                      key={idx}
                      className="bg-green-700 text-green-100 px-2 py-1 rounded text-xs"
                    >
                      {version}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-700">
              <a
                href={`https://nvd.nist.gov/vuln/detail/${cve.id}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => window.open(`https://nvd.nist.gov/vuln/detail/${cve.id}`, '_blank', 'noopener,noreferrer')}
                className="flex items-center text-green-400 hover:text-green-300 transition-colors"
              >
                <ExternalLink className="h-4 w-4 mr-1" />
                <span className="text-sm">View Full Details</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Security Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-400">1</div>
            <div className="text-sm text-gray-400">Critical</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-400">1</div>
            <div className="text-sm text-gray-400">High</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">2</div>
            <div className="text-sm text-gray-400">Medium</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">0</div>
            <div className="text-sm text-gray-400">Low</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityFeed;