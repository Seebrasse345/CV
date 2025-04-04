import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function PagesRouterHome() {
  const router = useRouter();
  
  // Redirect to the App Router home page
  useEffect(() => {
    router.push('/');
  }, [router]);
  
  // Minimalist loading state
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center">
        <div className="relative w-16 h-16 mx-auto">
          <div className="absolute inset-0 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="mt-6 text-xl font-mono animate-pulse">Redirecting...</p>
      </div>
    </div>
  );
} 