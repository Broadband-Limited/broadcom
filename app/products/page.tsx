'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';


export default function ProductsPage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/');
  }, [router]);

  return (
    <section className='flex flex-col items-center justify-center gap-16 min-h-screen'>
      <div className="w-16 aspect-square border-8 border-light-blue border-r-transparent rounded-full animate-spin"></div>
      <h3>Redirecting to home page...</h3>
    </section>
  );
}