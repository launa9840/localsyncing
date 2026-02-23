'use client';

import { Card } from '@/components/ui/card';
import {
  RefreshCw,
  Smartphone,
  Key,
  Lock,
  MinusCircle,
  Cloud,
  Plus,
  Eye,
  Bug,
  Settings,
  MousePointer,
  Download,
} from 'lucide-react';

const features = [
  {
    icon: RefreshCw,
    title: 'Instantly Sync Text & Files',
    description: 'Share text and files across all your devices in real-time with automatic synchronization.',
  },
  {
    icon: Smartphone,
    title: 'Responsive Everywhere',
    description: 'Works seamlessly on desktop, tablet, and mobile devices with a fully responsive design.',
  },
  {
    icon: Key,
    title: 'Password Protection',
    description: 'Secure your clipboard with password protection using SHA-256 encryption.',
  },
  {
    icon: Lock,
    title: 'Strong Encryption',
    description: 'Your data is protected with industry-standard encryption protocols.',
  },
  {
    icon: MinusCircle,
    title: 'Disable Ads',
    description: 'Enjoy an ad-free experience with our premium features.',
  },
  {
    icon: Cloud,
    title: 'Cloud Storage',
    description: 'Store your files securely in the cloud and access them from anywhere.',
  },
  {
    icon: Plus,
    title: 'Add More IPs',
    description: 'Connect multiple IP addresses to expand your network sharing capabilities.',
  },
  {
    icon: Eye,
    title: 'Preview Files',
    description: 'Preview files before downloading to save time and bandwidth.',
  },
  {
    icon: Bug,
    title: 'Debug Utility',
    description: 'Built-in debugging tools to troubleshoot connection and sync issues.',
  },
  {
    icon: Settings,
    title: 'Customization',
    description: 'Customize your experience with themes, settings, and preferences.',
  },
  {
    icon: MousePointer,
    title: 'Clickable URLs',
    description: 'Automatically detect and make URLs clickable for quick access.',
  },
  {
    icon: Download,
    title: 'Download All Files',
    description: 'Download all your files at once with a single click.',
  },
];

export default function AllFeaturesGrid() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white dark:bg-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-slate-800 dark:text-slate-100 mb-8 sm:mb-12">
          All Features
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="p-4 sm:p-6 hover:shadow-lg transition-shadow duration-300 bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-slate-800 dark:text-slate-100 mb-1 sm:mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
