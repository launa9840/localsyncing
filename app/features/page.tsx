import Navbar from '@/components/Navbar';
import HeroSection from '@/components/features/HeroSection';
import StatsSection from '@/components/features/StatsSection';
import HowItWorksSection from '@/components/features/HowItWorksSection';
import AllFeaturesGrid from '@/components/features/AllFeaturesGrid';
import TestimonialsSection from '@/components/features/TestimonialsSection';
import FooterCTA from '@/components/features/FooterCTA';

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <HowItWorksSection />
      <AllFeaturesGrid />
      <TestimonialsSection />
      <FooterCTA />
    </div>
  );
}
