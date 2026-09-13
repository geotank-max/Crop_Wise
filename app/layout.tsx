import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
});

export const metadata: Metadata = {
  title: 'CropWise | Agricultural Market Intelligence Platform',
  description:
    'Intelligent agricultural marketplace connecting farmers and verified fertilizer suppliers with real-time risk indicators.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${outfit.className}`}>
      <body className="antialiased bg-white text-stone-900 min-h-screen">
        {children}
      </body>
    </html>
  );
}

