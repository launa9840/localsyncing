'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Card } from '@/components/ui/card';
import { 
  HelpCircle, 
  ChevronDown,
  ChevronUp,
  Mail,
  MessageCircle,
  Shield,
  Zap,
  Clock
} from 'lucide-react';

export default function SupportPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: 'How does LocalSync work?',
      answer: 'LocalSync uses your IP address to create a shared clipboard across all devices on the same network. Simply open the app on multiple devices, and they\'ll automatically sync text and files in real-time.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Yes! You can enable password protection with SHA-256 encryption. Your data is stored securely and only accessible to devices on your network with the correct password.'
    },
    {
      question: 'What file types can I share?',
      answer: 'LocalSync supports all file types including documents, images, videos, and archives. Files are stored on Cloudinary CDN for fast access.'
    },
    {
      question: 'How long is my data stored?',
      answer: 'All data (text and files) is automatically deleted after 3 days. This ensures your privacy and keeps the system clean.'
    },
    {
      question: 'How do I enable password protection?',
      answer: 'Click the Settings button on the home page, toggle "Enable Password Protection", enter your desired password, and save. All devices will need this password to access the clipboard.'
    },
    {
      question: 'Can I use this across different networks?',
      answer: 'LocalSync is designed for local network use. Devices must be on the same WiFi network to sync. This ensures privacy and fast transfer speeds.'
    },
    {
      question: 'What happens if my IP address changes?',
      answer: 'If your IP address changes (e.g., router restart), you\'ll get a fresh clipboard. Your previous data remains tied to the old IP address.'
    },
    {
      question: 'How do I delete my data?',
      answer: 'You can delete individual files using the delete button, or clear everything at once using the "Clear All Data" button on the debug page.'
    }
  ];

  const features = [
    {
      icon: Zap,
      title: 'Real-time Sync',
      description: 'Text syncs automatically every 500ms across all devices'
    },
    {
      icon: Shield,
      title: 'Password Protection',
      description: 'Optional SHA-256 encrypted password protection'
    },
    {
      icon: Clock,
      title: 'Auto-Delete',
      description: 'All data automatically deleted after 3 days'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100">
            Help & Support
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Find answers to common questions
          </p>
        </div>

        {/* Key Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="p-4">
                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-3">
                    <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {feature.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>

        {/* FAQ Section */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <HelpCircle className="h-6 w-6 text-slate-600 dark:text-slate-400" />
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              Frequently Asked Questions
            </h2>
          </div>
          
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <span className="font-medium text-slate-900 dark:text-slate-100 pr-4">
                    {faq.question}
                  </span>
                  {expandedFaq === index ? (
                    <ChevronUp className="h-5 w-5 text-slate-600 dark:text-slate-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-slate-600 dark:text-slate-400 flex-shrink-0" />
                  )}
                </button>
                {expandedFaq === index && (
                  <div className="px-4 pb-4 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Contact Info */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="p-6 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 text-sm mb-1">
                  Need More Help?
                </h3>
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  Visit the debug page to check your system status and clear data if needed.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
            <div className="flex items-start gap-3">
              <MessageCircle className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-green-900 dark:text-green-100 text-sm mb-1">
                  Quick Tip
                </h3>
                <p className="text-xs text-green-700 dark:text-green-300">
                  Use password protection when sharing sensitive information on your network.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
