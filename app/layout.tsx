import type { Metadata, Viewport } from 'next';
import { Alata, Montserrat, Roboto } from 'next/font/google';
import './globals.css';
import Header from '@/shared/components/navigation/Header';
import Footer from '@/shared/components/navigation/Footer';
import { Toaster } from 'react-hot-toast';

const alata = Alata({
  variable: '--font-alata',
  subsets: ['latin'],
  weight: '400',
});

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
});

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
  weight: '400',
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://yoursite.com'
  ),
  title: {
    default: 'Broadband Communication Networks Ltd',
    template: '%s | Broadband Communication Networks Ltd',
  },
  description:
    'Leading provider of telecommunication solutions in Kenya - Network Implementation, Managed Services, Enterprise Solutions, and Professional Services.',
  keywords: [
    'telecommunications Kenya',
    'network solutions',
    'ICT services Kenya',
    'managed services provider',
    'enterprise network solutions',
    'GSM optimization',
    'VSAT installation',
    'network infrastructure Kenya',
  ],
  openGraph: {
    title: 'Broadband Communication Networks Ltd',
    description:
      'Your trusted partner for comprehensive telecommunication solutions in Kenya',
    url: 'https://broadcom-revamp.vercel.app',
    siteName: 'Broadband Communication Networks Ltd',
    images: '',
    locale: 'en_KE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Broadband Communication Networks Ltd',
    description: 'Leading ICT solutions provider in Kenya',
    images: '/images/og-image.jpg',
  },
  icons: {
    icon: '/images/logo.png',
    shortcut: '/images/logo.png',
    apple: '/images/logo.png',
  },
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  interactiveWidget: 'resizes-content',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="hide-scrollbar">
      <body
        className={`${alata.variable} ${montserrat.variable} ${roboto.variable} antialiased relative custom-scrollbar`}>
        <Header />
        {children}
        <Footer />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#fff',
              color: '#333',
              border: '1px solid #e5e7eb',
            },
          }}
        />
      </body>
    </html>
  );
}
