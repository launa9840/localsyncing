'use client';

import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

export default function HeroSection() {
  return (
    <section className="relative py-12 sm:py-16 md:py-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-10 dark:opacity-5">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-50 dark:to-slate-900" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <Badge variant="secondary" className="mb-4">
            🚀 The Future of Local Sharing
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-800 dark:text-slate-100 mb-4 sm:mb-6 px-4">
            Simply Works.
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-6 px-4">
            Share text and files across all your devices instantly. No setup, no registration, no hassle.
            <br />
            <span className="text-base sm:text-lg font-semibold text-slate-700 dark:text-slate-300 mt-2 block">
              Just pure, seamless synchronization on your local network.
            </span>
          </p>
          
          {/* Key Benefits */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-8 px-4">
            <Badge variant="outline" className="px-4 py-2 text-sm">
              ⚡ Real-time Sync
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-sm">
              🔒 Secure & Private
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-sm">
              🌐 Works Offline
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-sm">
              💯 100% Free
            </Badge>
          </div>
        </div>

        {/* Device Preview */}
        <div className="mt-8 sm:mt-12 md:mt-16 flex flex-col sm:flex-row flex-wrap justify-center items-center gap-6 sm:gap-8 opacity-80">
          {/* Phone Preview */}
          <div className="text-slate-400 dark:text-slate-600 text-sm">
            <div className="w-40 h-52 sm:w-48 sm:h-64 border-2 sm:border-4 border-slate-300 dark:border-slate-700 rounded-3xl overflow-hidden bg-white dark:bg-slate-800 relative shadow-lg">
              <Image
                src="/phone-preview.svg"
                alt="Phone Preview"
                fill
                className="object-fit"
                priority
              />
            </div>
          </div>
          {/* Tablet Preview */}
          <div className="text-slate-400 dark:text-slate-600 text-sm">
            <div className="w-56 h-42 sm:w-64 sm:h-48 border-2 sm:border-4 border-slate-300 dark:border-slate-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-800 relative shadow-lg">
              <Image
                src="/tablet-preview.svg"
                alt="Tablet Preview"
                fill
                className="object-fit"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
