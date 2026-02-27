'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Activity,
  Database,
  HardDrive,
  Network,
  RefreshCw,
  Trash2,
  Download,
  AlertCircle,
  CheckCircle2,
  Clock,
  FileText,
  Lock,
  Unlock,
} from 'lucide-react';
import { toast } from 'sonner';

export default function DebugPage() {
  const [stats, setStats] = useState({
    textLength: 0,
    fileCount: 0,
    totalSize: 0,
    isLocked: false,
    lastUpdated: Date.now(),
  });
  const [ipAddress, setIpAddress] = useState('Loading...');
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [lastSync, setLastSync] = useState<Date>(new Date());

  useEffect(() => {
    fetchDebugInfo();
    const interval = setInterval(() => {
      setLastSync(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const fetchDebugInfo = async () => {
    setRefreshing(true);
    try {
      const [ipRes, statsRes] = await Promise.all([
        fetch('/api/debug'),
        fetch('/api/debug', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'getStats' }),
        }),
      ]);

      const ipData = await ipRes.json();
      const statsData = await statsRes.json();

      if (ipData.success) setIpAddress(ipData.data.ipAddress);
      if (statsData.success) setStats(statsData.data);
      toast.success('Data refreshed successfully');
    } catch (error) {
      toast.error('Failed to fetch debug information');
    } finally {
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    fetchDebugInfo();
  };

  const handleClearData = async () => {
    if (!confirm('Are you sure you want to clear all data? This cannot be undone.')) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/debug', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'resetEverything' }),
      });

      if (response.ok) {
        toast.success('All data cleared successfully');
        handleRefresh();
      }
    } catch (error) {
      toast.error('Failed to clear data');
    } finally {
      setLoading(false);
    }
  };

  const handleExportData = () => {
    const data = {
      stats,
      ipAddress,
      timestamp: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `localsync-debug-${Date.now()}.json`;
    a.click();
    toast.success('Debug data exported');
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getTimeSince = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                Debug Console
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                System diagnostics and debugging tools
              </p>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleRefresh} variant="outline" size="sm" disabled={refreshing}>
                <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                {refreshing ? 'Refreshing...' : 'Refresh'}
              </Button>
              <Button onClick={handleExportData} variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>

        {/* Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Status</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">
                  Online
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Files</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">
                  {stats.fileCount}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <HardDrive className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Storage</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">
                  {formatBytes(stats.totalSize)}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                <Database className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Security</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">
                  {stats.isLocked ? 'Locked' : 'Open'}
                </p>
              </div>
              <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
                stats.isLocked 
                  ? 'bg-orange-100 dark:bg-orange-900' 
                  : 'bg-slate-100 dark:bg-slate-700'
              }`}>
                {stats.isLocked ? (
                  <Lock className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                ) : (
                  <Unlock className="h-6 w-6 text-slate-600 dark:text-slate-400" />
                )}
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* System Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Network className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Network Information
                </h2>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-slate-200 dark:border-slate-700">
                  <span className="text-sm text-slate-600 dark:text-slate-400">IP Address</span>
                  <code className="text-sm font-mono bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                    {ipAddress}
                  </code>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-200 dark:border-slate-700">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Connection</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                    Active
                  </Badge>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-200 dark:border-slate-700">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Sync Status</span>
                  <Badge variant="secondary">
                    Real-time
                  </Badge>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Last Activity</span>
                  <span className="text-sm text-slate-900 dark:text-slate-100">
                    {getTimeSince(stats.lastUpdated)}
                  </span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Data Statistics
                </h2>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Text Content</span>
                    <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                      {stats.textLength} characters
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all"
                      style={{ width: `${Math.min((stats.textLength / 10000) * 100, 100)}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-slate-600 dark:text-slate-400">File Storage</span>
                    <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                      {formatBytes(stats.totalSize)} / 100 MB
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div 
                      className="bg-purple-500 h-2 rounded-full transition-all"
                      style={{ width: `${Math.min((stats.totalSize / (100 * 1024 * 1024)) * 100, 100)}%` }}
                    />
                  </div>
                </div>
                <div className="pt-2 grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                      {stats.fileCount}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                      Total Files
                    </p>
                  </div>
                  <div className="text-center p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                      {Math.round(stats.totalSize / (stats.fileCount || 1) / 1024)}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                      Avg Size (KB)
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Actions Panel */}
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Activity className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Quick Actions
                </h2>
              </div>
              <div className="space-y-3">
                <Button 
                  onClick={handleRefresh} 
                  className="w-full justify-start" 
                  variant="outline"
                  disabled={refreshing}
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                  {refreshing ? 'Refreshing...' : 'Refresh Data'}
                </Button>
                <Button 
                  onClick={handleExportData} 
                  className="w-full justify-start" 
                  variant="outline"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Debug Info
                </Button>
                <Button 
                  onClick={handleClearData}
                  className="w-full justify-start"
                  variant="destructive"
                  disabled={loading}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All Data
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  System Time
                </h2>
              </div>
              <div className="space-y-2">
                <div className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <p className="text-3xl font-mono font-bold text-slate-900 dark:text-slate-100">
                    {lastSync.toLocaleTimeString()}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    {lastSync.toLocaleDateString()}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100 text-sm mb-1">
                    Debug Mode Active
                  </h3>
                  <p className="text-xs text-blue-700 dark:text-blue-300">
                    This page provides system diagnostics and debugging tools. Use with caution in production.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
