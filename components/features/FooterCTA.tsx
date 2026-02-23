'use client';

import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';
import Link from 'next/link';

export default function FooterCTA() {
  return (
    <section className="py-12 sm:py-16 bg-gradient-to-r from-pink-50 to-red-50 dark:from-pink-950 dark:to-red-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100 mb-3 sm:mb-4">
          That's All.
        </h2>
        <p className="text-base sm:text-lg text-slate-700 dark:text-slate-200 mb-4 sm:mb-6">
          Questions? Suggestions?
        </p>
        <Button
          size="lg"
          className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-sm sm:text-base"
          asChild
        >
          <Link href="/support">
            <Mail className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
            Contact Us
          </Link>
        </Button>
      </div>
    </section>
  );
}
