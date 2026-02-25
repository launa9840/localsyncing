import Dashboard from '@/components/Dashboard';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-800">
      <Navbar />
      <Dashboard />
      {/* Version indicator - Remove after confirming deployment */}
      <div className="fixed bottom-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
        v2.0 - Cloudinary Active
      </div>
    </div>
  );
}
