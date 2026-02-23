'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Zap, 
  Users, 
  Globe, 
  Shield,
  Clock,
  Wifi,
  HardDrive,
  TrendingUp
} from 'lucide-react';

export default function StatsSection() {
  const stats = [
    {
      icon: Zap,
      value: '500ms',
      label: 'Sync Speed',
      description: 'Lightning-fast real-time synchronization',
      color: 'yellow'
    },
    {
      icon: Users,
      value: '10K+',
      label: 'Active Users',
      description: 'Trusted by developers worldwide',
      color: 'blue'
    },
    {
      icon: Globe,
      value: '99.9%',
      label: 'Uptime',
      description: 'Reliable service you can count on',
      color: 'green'
    },
    {
      icon: Shield,
      value: 'SHA-256',
      label: 'Encryption',
      description: 'Military-grade security',
      color: 'purple'
    }
  ];

  const facts = [
    {
      icon: Clock,
      title: 'Real-Time Sync',
      description: 'Changes appear instantly across all devices with 500ms debounce optimization'
    },
    {
      icon: Wifi,
      title: 'Local Network',
      description: 'Works entirely on your local network - no internet required for syncing'
    },
    {
      icon: HardDrive,
      title: 'No Size Limits',
      description: 'Share files up to 100MB each with unlimited text content'
    },
    {
      icon: TrendingUp,
      title: 'Zero Setup',
      description: 'No registration, no downloads - just open and start syncing'
    }
  ];

  const colorClasses = {
    yellow: 'from-yellow-500 to-orange-500',
    blue: 'from-blue-500 to-cyan-500',
    green: 'from-green-500 to-emerald-500',
    purple: 'from-purple-500 to-pink-500'
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Grid */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            By The Numbers
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-slate-100 mb-4">
            Built for Performance
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            LocalSync is engineered for speed, security, and simplicity. Here's what makes it special.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${colorClasses[stat.color as keyof typeof colorClasses]} flex items-center justify-center shadow-lg`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  {stat.label}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {stat.description}
                </p>
              </Card>
            );
          })}
        </div>

        {/* Facts Grid */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Why LocalSync?
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-slate-100 mb-4">
            What Makes Us Different
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {facts.map((fact, index) => {
            const Icon = fact.icon;
            return (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 dark:from-slate-600 dark:to-slate-800 flex items-center justify-center">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                      {fact.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {fact.description}
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
