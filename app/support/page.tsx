'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Mail, 
  MessageCircle, 
  Book, 
  HelpCircle, 
  Send,
  Github,
  FileText,
  Zap,
  Shield,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { toast } from 'sonner';

export default function SupportPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [sending, setSending] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    
    // Simulate sending
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success('Message sent successfully! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setSending(false);
  };

  const faqs = [
    {
      question: 'How does LocalSync work?',
      answer: 'LocalSync uses your IP address to create a shared clipboard across all devices on the same network. Simply open the app on multiple devices, and they\'ll automatically sync text and files in real-time.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Yes! You can enable password protection with SHA-256 encryption. Your data is stored locally and only accessible to devices on your network with the correct password.'
    },
    {
      question: 'What file types can I share?',
      answer: 'LocalSync supports all file types. You can upload documents, images, videos, archives, and any other file format. The default limit is 100MB per file.'
    },
    {
      question: 'Can I use this across different networks?',
      answer: 'LocalSync is designed for local network use. Devices must be on the same network (same IP address) to sync. This ensures privacy and fast transfer speeds.'
    },
    {
      question: 'How do I enable password protection?',
      answer: 'Click the Settings button on the home page, toggle "Enable Password Protection", enter your desired password, and save. All devices will need this password to access the clipboard.'
    },
    {
      question: 'What happens if I clear my browser data?',
      answer: 'Clearing browser data will remove your local session, but your synced data remains on the server. Simply reload the page and unlock with your password if protection is enabled.'
    }
  ];

  const resources = [
    {
      icon: Book,
      title: 'Documentation',
      description: 'Complete guides and API references',
      color: 'blue',
      link: '#'
    },
    {
      icon: Github,
      title: 'GitHub Repository',
      description: 'View source code and contribute',
      color: 'slate',
      link: '#'
    },
    {
      icon: FileText,
      title: 'Changelog',
      description: 'Latest updates and features',
      color: 'purple',
      link: '#'
    },
    {
      icon: Zap,
      title: 'Quick Start Guide',
      description: 'Get started in 5 minutes',
      color: 'yellow',
      link: '#'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            Support & Help Center
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Get help, find answers, and connect with our team
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Response Time</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">
                  &lt; 24h
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
                <p className="text-sm text-slate-600 dark:text-slate-400">Support Status</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">
                  Online
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <MessageCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Documentation</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">
                  50+
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-500 mt-0.5">articles</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                <Book className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Satisfaction</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">
                  98%
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
                <Shield className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Contact Form - Takes 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Mail className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Contact Us
                </h2>
                <Badge variant="secondary" className="ml-auto">
                  Fast Response
                </Badge>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                      required
                      className="mt-1"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="How can we help?"
                    required
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your issue or question..."
                    required
                    className="mt-1 min-h-[150px]"
                  />
                </div>
                
                <Button type="submit" className="w-full" disabled={sending}>
                  <Send className={`h-4 w-4 mr-2 ${sending ? 'animate-pulse' : ''}`} />
                  {sending ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </Card>

            {/* FAQ Section */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <HelpCircle className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Frequently Asked Questions
                </h2>
              </div>
              
              <div className="space-y-2">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      <span className="font-medium text-slate-900 dark:text-slate-100">
                        {faq.question}
                      </span>
                      {expandedFaq === index ? (
                        <ChevronUp className="h-5 w-5 text-slate-600 dark:text-slate-400 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-slate-600 dark:text-slate-400 flex-shrink-0" />
                      )}
                    </button>
                    {expandedFaq === index && (
                      <div className="px-4 pb-4 text-sm text-slate-600 dark:text-slate-400">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar - Takes 1 column */}
          <div className="space-y-6">
            {/* Quick Links */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Quick Actions
                </h2>
              </div>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Start Live Chat
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="h-4 w-4 mr-2" />
                  Email Support
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Github className="h-4 w-4 mr-2" />
                  Report Issue
                </Button>
              </div>
            </Card>

            {/* Resources */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Book className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Resources
                </h2>
              </div>
              <div className="space-y-3">
                {resources.map((resource, index) => {
                  const Icon = resource.icon;
                  const colorClasses = {
                    blue: 'bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300',
                    slate: 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300',
                    purple: 'bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300',
                    yellow: 'bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800 text-yellow-700 dark:text-yellow-300'
                  };
                  
                  return (
                    <a
                      key={index}
                      href={resource.link}
                      className={`block p-3 rounded-lg border transition-colors hover:shadow-sm ${colorClasses[resource.color as keyof typeof colorClasses]}`}
                    >
                      <div className="flex items-start gap-3">
                        <Icon className="h-5 w-5 flex-shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-sm">{resource.title}</p>
                            <ExternalLink className="h-3 w-3" />
                          </div>
                          <p className="text-xs mt-0.5 opacity-80">
                            {resource.description}
                          </p>
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </Card>

            {/* Support Hours */}
            <Card className="p-6 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
              <div className="flex items-start gap-3">
                <MessageCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100 text-sm mb-1">
                    Support Hours
                  </h3>
                  <p className="text-xs text-blue-700 dark:text-blue-300">
                    Monday - Friday: 9 AM - 6 PM EST<br />
                    Weekend: Limited support<br />
                    Email support: 24/7
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
