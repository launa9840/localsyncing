'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Lock, Info } from 'lucide-react';
import { toast } from 'sonner';
import PasswordDialog from './PasswordDialog';

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isLocked: boolean;
  onPasswordChange: (enabled: boolean, password?: string) => void;
}

export default function SettingsDialog({ 
  open, 
  onOpenChange, 
  isLocked,
  onPasswordChange 
}: SettingsDialogProps) {
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<'set' | 'remove'>('set');

  const handlePasswordToggle = (checked: boolean) => {
    if (checked) {
      setDialogMode('set');
      setPasswordDialogOpen(true);
    } else {
      setDialogMode('remove');
      setPasswordDialogOpen(true);
    }
  };

  const handlePasswordSubmit = (password: string) => {
    if (dialogMode === 'set') {
      onPasswordChange(true, password);
      toast.success('Password protection enabled!');
    } else {
      onPasswordChange(false, password);
      toast.success('Password protection disabled!');
    }
    setPasswordDialogOpen(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
            <DialogDescription>
              Configure your LocalSync preferences
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {/* Password Protection Toggle */}
            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600">
              <div className="flex items-center gap-3 flex-1">
                <Lock className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                <div>
                  <Label htmlFor="password-toggle" className="text-sm font-medium text-slate-800 dark:text-slate-100 cursor-pointer">
                    Password Protection
                  </Label>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {isLocked ? 'Enabled' : 'Protect your clipboard with a password'}
                  </p>
                </div>
              </div>
              <Switch
                id="password-toggle"
                checked={isLocked}
                onCheckedChange={handlePasswordToggle}
              />
            </div>

            {/* Info Box */}
            <div className="p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
              <div className="flex gap-3">
                <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="space-y-2">
                  <p className="text-sm text-blue-800 dark:text-blue-200 font-medium">
                    How it works:
                  </p>
                  <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1 list-disc list-inside">
                    <li>All devices on the same IP share the clipboard</li>
                    <li>Enable password to require authentication</li>
                    <li>Password is stored securely (SHA-256 hash)</li>
                    <li>All devices must enter the password to access</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <PasswordDialog
        open={passwordDialogOpen}
        onOpenChange={setPasswordDialogOpen}
        onSubmit={handlePasswordSubmit}
        title={dialogMode === 'set' ? 'Set Password' : 'Remove Password'}
        description={
          dialogMode === 'set'
            ? 'Enter a password to protect your clipboard. All devices will need this password to access the content.'
            : 'Enter your current password to disable protection.'
        }
      />
    </>
  );
}
