import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/lib/store';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'ACE Global Logistics | Fast, Reliable & Secure Freight Solutions',
  description: 'ACE Global Logistics provides fast, reliable, and secure shipping solutions for individuals and businesses, locally and internationally. Air Freight, Ocean Freight, Road Transport & Warehousing.',
  keywords: ['logistics', 'freight forwarding', 'air freight', 'sea freight', 'ocean cargo', 'warehousing', 'shipment tracking', 'customs clearance'],
  authors: [{ name: 'ACE Global Logistics' }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-slate-50 dark:bg-[#070d17] text-slate-900 dark:text-white transition-colors">
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
