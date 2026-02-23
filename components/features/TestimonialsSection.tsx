'use client';

import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Kristin Wong',
    role: 'Tech Writer',
    company: 'LifeHacker',
    avatar: 'KW',
    image: '/testimonials/kristin-wong.svg',
    quote: 'LocalSync makes sharing files between devices incredibly simple. No more emailing files to myself!',
    color: 'bg-blue-500',
  },
  {
    name: 'Mihir Patkar',
    role: 'Technology Journalist',
    company: 'MakeUseOf',
    avatar: 'MP',
    image: '/testimonials/mihir-patkar.svg',
    quote: 'The password protection feature gives me peace of mind when sharing sensitive information across my devices.',
    color: 'bg-green-500',
  },
  {
    name: 'David G. Bolanos',
    role: 'Senior Editor',
    company: 'Spiegel Online',
    avatar: 'DB',
    image: '/testimonials/david-bolanos.svg',
    quote: 'A must-have tool for anyone who works across multiple devices. The real-time sync is flawless.',
    color: 'bg-purple-500',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-slate-100 mb-3 sm:mb-4 px-4">
            You don't have to take our word for it
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg px-4">
            See what tech experts are saying about LocalSync
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="p-4 sm:p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:shadow-xl transition-shadow duration-300"
            >
              <Quote className="h-6 w-6 sm:h-8 sm:w-8 text-slate-300 dark:text-slate-600 mb-3 sm:mb-4" />
              
              <p className="text-slate-700 dark:text-slate-200 mb-4 sm:mb-6 italic text-sm sm:text-base">
                "{testimonial.quote}"
              </p>

              <div className="flex items-center gap-3">
                <Avatar className={`${testimonial.color} h-10 w-10 sm:h-12 sm:w-12`}>
                  <AvatarImage src={testimonial.image} alt={testimonial.name} />
                  <AvatarFallback className="text-white font-semibold text-sm sm:text-base">
                    {testimonial.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-100 text-sm sm:text-base">
                    {testimonial.name}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                    {testimonial.role}
                  </p>
                  <Badge variant="secondary" className="mt-1 text-xs">
                    {testimonial.company}
                  </Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
