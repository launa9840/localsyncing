'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Wifi,
  Lock,
  RefreshCw,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export default function HowItWorksSection() {
  const steps = [
    {
      number: '01',
      icon: Wifi,
      title: 'Connect to Network',
      description: 'Open LocalSync on any device connected to your local network. No registration or setup required.',
      color: 'blue'
    },
    {
      number: '02',
      icon: Lock,
      title: 'Optional Security',
      description: 'Enable password protection to secure your clipboard. All devices will need the password to access.',
      color: 'purple'
    },
    {
      number: '03',
      icon: RefreshCw,
      title: 'Start Syncing',
      description: 'Type text or upload files. Changes sync automatically across all devices in real-time.',
      color: 'orange'
    },
    {
      number: '04',
      icon: CheckCircle2,
      title: 'Access Anywhere',
      description: 'Access your clipboard from any device on the network. Copy, download, and share instantly.',
      color: 'green'
    }
  ];

  const colorClasses = {
    blue: 'from-blue-500 to-cyan-500',
    purple: 'from-purple-500 to-pink-500',
    orange: 'from-orange-500 to-red-500',
    green: 'from-green-500 to-emerald-500'
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white dark:bg-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Simple Process
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-slate-100 mb-4">
            How It Works
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Get started in seconds. No complicated setup, no account creation - just pure simplicity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                <Card className="p-6 h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  {/* Step Number */}
                  <div className="absolute -top-3 -left-3 w-12 h-12 rounded-full bg-slate-900 dark:bg-slate-700 text-white flex items-center justify-center font-bold text-sm shadow-lg">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br ${colorClasses[step.color as keyof typeof colorClasses]} flex items-center justify-center shadow-lg`}>
                    <Icon className="h-7 w-7 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3 text-center">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 text-center">
                    {step.description}
                  </p>
                </Card>

                {/* Arrow between steps (hidden on mobile and last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ArrowRight className="h-6 w-6 text-slate-400 dark:text-slate-600" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                0
              </div>
              <div className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">
                Setup Time
              </div>
              <p className="text-xs text-blue-700 dark:text-blue-300">
                Start using immediately
              </p>
            </div>
          </Card>

          <Card className="p-6 bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                100%
              </div>
              <div className="text-sm font-semibold text-purple-900 dark:text-purple-100 mb-1">
                Free & Open
              </div>
              <p className="text-xs text-purple-700 dark:text-purple-300">
                No hidden costs ever
              </p>
            </div>
          </Card>

          <Card className="p-6 bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                ∞
              </div>
              <div className="text-sm font-semibold text-green-900 dark:text-green-100 mb-1">
                Unlimited Devices
              </div>
              <p className="text-xs text-green-700 dark:text-green-300">
                Connect as many as you want
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
