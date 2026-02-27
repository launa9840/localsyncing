'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, Settings, Download, Trash2, Lock, FileText, HardDrive, CheckCircle2, Upload as UploadIcon, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { FileItem } from '@/types';
import { formatTimeRemaining, getExpirationColor } from '@/lib/expiration-utils';
import { sanitizeFilename } from '@/lib/filename-utils';
import { getUserId } from '@/lib/user-id';
import FileUploadZone from './FileUploadZone';
import SettingsDialog from './SettingsDialog';
import PasswordDialog from './PasswordDialog';

export default function Dashboard() {
  const [text, setText] = useState('');
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [unlockDialogOpen, setUnlockDialogOpen] = useState(false);
  const [userId, setUserId] = useState<string>('');
  
  // Use refs to track typing state without causing re-renders
  const isTypingRef = useRef(false);
  const lastTypingTimeRef = useRef(0);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize user ID on mount
  useEffect(() => {
    const id = getUserId();
    setUserId(id);
    console.log('[Dashboard] User ID initialized:', id);
  }, []);

  // Hash password client-side
  const hashPassword = async (password: string): Promise<string> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  // Fetch initial data
  const fetchData = useCallback(async () => {
    if (!userId) return; // Wait for userId to be initialized
    
    try {
      const response = await fetch(`/api/sync?userId=${encodeURIComponent(userId)}`);
      const result = await response.json();
      
      if (result.success && result.data) {
        setIsLocked(result.data.isLocked || false);
        
        // If locked and not authenticated, show unlock dialog
        if (result.data.isLocked && !isAuthenticated) {
          setUnlockDialogOpen(true);
          return;
        }
        
        // Only update text if user hasn't typed recently
        const timeSinceLastTyping = Date.now() - lastTypingTimeRef.current;
        if (!isTypingRef.current && timeSinceLastTyping > 3000) {
          setText(result.data.text);
        }
        
        setFiles(result.data.files);
      }
    } catch (error) {
      toast.error('Failed to load data');
    } finally {
      setIsLoading(false);
    }
  }, [userId, isAuthenticated]);

  useEffect(() => {
    if (!userId) return; // Don't start polling until userId is ready
    
    fetchData();
    
    // Poll for updates every 2 seconds
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, [fetchData, userId]);

  // Refresh countdown timers every minute
  const [, setTimerTick] = useState(0);
  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimerTick(prev => prev + 1);
    }, 60000); // Update every minute
    
    return () => clearInterval(timerInterval);
  }, []);

  // Handle unlock
  const handleUnlock = async (password: string) => {
    try {
      const hash = await hashPassword(password);
      const response = await fetch('/api/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, action: 'verifyPassword', passwordHash: hash }),
      });
      
      const result = await response.json();
      
      if (result.success && result.data.isValid) {
        setIsAuthenticated(true);
        setUnlockDialogOpen(false);
        toast.success('Unlocked successfully!');
        fetchData();
      } else {
        toast.error('Incorrect password');
      }
    } catch (error) {
      toast.error('Failed to verify password');
    }
  };

  // Handle password change
  const handlePasswordChange = async (enabled: boolean, password?: string) => {
    if (!password) return;
    
    try {
      const hash = await hashPassword(password);
      
      if (enabled) {
        // Set password
        await fetch('/api/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, action: 'setPassword', passwordHash: hash }),
        });
        setIsLocked(true);
        setIsAuthenticated(true);
      } else {
        // Verify current password before removing
        const verifyResponse = await fetch('/api/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, action: 'verifyPassword', passwordHash: hash }),
        });
        
        const verifyResult = await verifyResponse.json();
        
        if (verifyResult.success && verifyResult.data.isValid) {
          await fetch('/api/sync', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, action: 'removePassword' }),
          });
          setIsLocked(false);
          setIsAuthenticated(false);
        } else {
          toast.error('Incorrect password');
        }
      }
    } catch (error) {
      toast.error('Failed to update password');
    }
  };

  // Debounced text update
  useEffect(() => {
    console.log('[Dashboard] Text update effect triggered:', {
      isLoading,
      userId,
      isLocked,
      isAuthenticated,
      textLength: text.length,
    });
    
    if (isLoading || !userId) {
      console.log('[Dashboard] Skipping save - loading or no userId');
      return;
    }
    if (isLocked && !isAuthenticated) {
      console.log('[Dashboard] Skipping save - locked and not authenticated');
      return;
    }
    
    console.log('[Dashboard] Setting timer to save text in 500ms');
    const timer = setTimeout(async () => {
      try {
        console.log('[Dashboard] Sending POST request to save text:', text.substring(0, 50));
        const response = await fetch('/api/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, action: 'updateText', text }),
        });
        const result = await response.json();
        console.log('[Dashboard] Save response:', result);
        // Mark typing as finished after successful sync
        isTypingRef.current = false;
      } catch (error) {
        console.error('[Dashboard] Save error:', error);
        toast.error('Failed to sync text');
      }
    }, 500);

    return () => {
      console.log('[Dashboard] Clearing save timer');
      clearTimeout(timer);
    };
  }, [text, isLoading, isLocked, isAuthenticated, userId]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    isTypingRef.current = true;
    lastTypingTimeRef.current = Date.now();
    
    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    // Set typing to false after 3 seconds of no typing
    typingTimeoutRef.current = setTimeout(() => {
      isTypingRef.current = false;
    }, 3000);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy');
    }
  };

  const handleFileUpload = async (fileData: { url: string; name: string; size: number; publicId: string; resourceType: string }) => {
    if (isLocked && !isAuthenticated) {
      toast.error('Please unlock first');
      return;
    }

    try {
      // Sanitize filename before saving
      const sanitizedName = sanitizeFilename(fileData.name);
      
      // Create file item with Cloudinary URL and metadata
      const fileItem = {
        id: Date.now().toString() + '-' + Math.random().toString(36).substring(7),
        name: sanitizedName,
        size: fileData.size,
        uploadedAt: Date.now(),
        url: fileData.url,
        publicId: fileData.publicId, // Store for deletion
        resourceType: fileData.resourceType, // Store for deletion
      };

      console.log('[Dashboard] Adding file to database:', fileItem);

      // Save to database
      await fetch('/api/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, action: 'addFile', file: fileItem }),
      });
      
      setFiles(prev => [...prev, fileItem]);
      toast.success('File uploaded successfully!');
    } catch (error) {
      console.error('[Dashboard] File upload error:', error);
      toast.error('Failed to save file');
    }
  };

  const handleDownloadFile = async (file: FileItem) => {
    try {
      toast.loading('Preparing download...', { id: 'download' });
      
      // Method 1: Try direct download with Cloudinary fl_attachment transformation
      let downloadUrl = file.url;
      
      // Check if it's a Cloudinary URL and add fl_attachment flag
      if (file.url.includes('cloudinary.com')) {
        // Insert fl_attachment before /upload/ or after /upload/
        downloadUrl = file.url.replace('/upload/', '/upload/fl_attachment/');
      }
      
      try {
        // Try direct download first
        const response = await fetch(downloadUrl, {
          mode: 'cors',
          credentials: 'omit',
        });
        
        if (!response.ok) {
          throw new Error('Direct download failed');
        }
        
        const blob = await response.blob();
        
        // Create object URL from blob
        const blobUrl = window.URL.createObjectURL(blob);
        
        // Create temporary link element
        const link = document.createElement('a');
        link.style.display = 'none';
        link.href = blobUrl;
        link.download = file.name; // Use the original filename
        
        // Append to body, click, and remove
        document.body.appendChild(link);
        link.click();
        
        // Cleanup after a short delay
        setTimeout(() => {
          document.body.removeChild(link);
          window.URL.revokeObjectURL(blobUrl);
        }, 100);
        
        toast.success(`Downloaded: ${file.name}`, { id: 'download' });
      } catch (directError) {
        // Method 2: Fallback to API proxy route
        console.log('[Dashboard] Direct download failed, using API proxy');
        
        const proxyUrl = `/api/download?url=${encodeURIComponent(file.url)}&filename=${encodeURIComponent(file.name)}`;
        
        // Create temporary link element
        const link = document.createElement('a');
        link.style.display = 'none';
        link.href = proxyUrl;
        link.download = file.name;
        
        // Append to body, click, and remove
        document.body.appendChild(link);
        link.click();
        
        setTimeout(() => {
          document.body.removeChild(link);
        }, 100);
        
        toast.success(`Downloaded: ${file.name}`, { id: 'download' });
      }
    } catch (error) {
      console.error('[Dashboard] Download error:', error);
      toast.error('Failed to download file. Please try again.', { id: 'download' });
    }
  };

  const handleDeleteFile = async (fileId: string) => {
    if (isLocked && !isAuthenticated) {
      toast.error('Please unlock first');
      return;
    }

    try {
      toast.loading('Deleting file...', { id: 'delete' });
      
      // Find the file to get publicId and resourceType
      const fileToDelete = files.find(f => f.id === fileId);
      
      if (!fileToDelete) {
        toast.error('File not found', { id: 'delete' });
        return;
      }

      // Step 1: Delete from Cloudinary (if publicId exists)
      if (fileToDelete.publicId) {
        console.log('[Dashboard] Deleting from Cloudinary:', {
          publicId: fileToDelete.publicId,
          resourceType: fileToDelete.resourceType,
        });

        const cloudinaryResponse = await fetch('/api/delete-file', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            publicId: fileToDelete.publicId,
            resourceType: fileToDelete.resourceType || 'raw',
          }),
        });

        const cloudinaryResult = await cloudinaryResponse.json();

        if (!cloudinaryResult.success) {
          console.warn('[Dashboard] Cloudinary deletion failed:', cloudinaryResult.error);
          // Continue with database deletion even if Cloudinary fails
        } else {
          console.log('[Dashboard] Cloudinary deletion successful');
        }
      }

      // Step 2: Delete from database
      const dbResponse = await fetch('/api/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, action: 'deleteFile', fileId }),
      });

      if (!dbResponse.ok) {
        throw new Error('Database deletion failed');
      }
      
      // Step 3: Update UI
      setFiles(prev => prev.filter(f => f.id !== fileId));
      toast.success('File deleted successfully', { id: 'delete' });
    } catch (error) {
      console.error('[Dashboard] Delete error:', error);
      toast.error('Failed to delete file', { id: 'delete' });
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getTotalFileSize = () => {
    return files.reduce((acc, file) => acc + file.size, 0);
  };

  // Show locked state
  if (isLocked && !isAuthenticated) {
    return (
      <>
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Card className="p-12 shadow-lg bg-white dark:bg-slate-800 text-center">
            <Lock className="h-16 w-16 mx-auto mb-4 text-slate-400 dark:text-slate-500" />
            <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-2">
              Clipboard Locked
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              This clipboard is password protected. Enter the password to access.
            </p>
            <Button onClick={() => setUnlockDialogOpen(true)}>
              <Lock className="h-4 w-4 mr-2" />
              Unlock
            </Button>
          </Card>
        </div>

        <PasswordDialog
          open={unlockDialogOpen}
          onOpenChange={setUnlockDialogOpen}
          onSubmit={handleUnlock}
          title="Unlock Clipboard"
          description="Enter the password to access this clipboard."
        />
      </>
    );
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Stats */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                Your Clipboard
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                Sync text and files across your local network
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSettingsOpen(true)}
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>

          {/* Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Status</p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">
                    Synced
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
                  <p className="text-sm text-slate-600 dark:text-slate-400">Text Content</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">
                    {text.length}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-500 mt-0.5">characters</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Files</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">
                    {files.length}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-500 mt-0.5">
                    {formatFileSize(getTotalFileSize())}
                  </p>
                </div>
                <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                  <HardDrive className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Text Editor - Takes 2 columns */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    Shared Text
                  </h2>
                  {isLocked && (
                    <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                      <Lock className="h-3 w-3 mr-1" />
                      Protected
                    </Badge>
                  )}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopy}
                  disabled={!text}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
              </div>
              <Textarea
                value={text}
                onChange={handleTextChange}
                placeholder="Type or paste anything here... It will sync across all devices on your network."
                className="min-h-[400px] resize-none text-base font-mono"
              />
              <div className="mt-3 flex items-center justify-between text-xs text-slate-500 dark:text-slate-500">
                <span>{text.length} characters</span>
                <span>Auto-saves every 500ms</span>
              </div>
            </Card>
          </div>

          {/* Files Section - Takes 1 column */}
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <UploadIcon className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Files
                </h2>
              </div>
              <FileUploadZone onFileUpload={handleFileUpload} />
            </Card>

            {files.length > 0 && (
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <HardDrive className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    Uploaded Files
                  </h2>
                  <Badge variant="secondary">{files.length}</Badge>
                </div>
                <div className="space-y-2">
                  {files.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm font-medium text-slate-800 dark:text-slate-100 truncate">
                            {file.name}
                          </p>
                          <Badge 
                            variant="secondary" 
                            className={`text-xs flex items-center gap-1 ${getExpirationColor(file.uploadedAt)}`}
                          >
                            <Clock className="h-3 w-3" />
                            {formatTimeRemaining(file.uploadedAt)}
                          </Badge>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                      <div className="flex gap-1 ml-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDownloadFile(file)}
                          className="h-8 w-8 p-0"
                          title="Download file"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteFile(file.id)}
                          className="h-8 w-8 p-0 hover:text-red-600 dark:hover:text-red-400"
                          title="Delete file"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>

      <SettingsDialog 
        open={settingsOpen} 
        onOpenChange={setSettingsOpen}
        isLocked={isLocked}
        onPasswordChange={handlePasswordChange}
      />
    </>
  );
}
