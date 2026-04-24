import type { Metadata } from 'next';
import { Silkscreen } from 'next/font/google';
import './globals.css';

const silkscreen = Silkscreen({
  variable: '--font-silkscreen',
  weight: ['400', '700'],
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'Simple Slip Trainer',
  description:
    'A web-based boxing training tool for practicing slip movements — a fundamental defensive technique.',
  keywords: [
    'boxing',
    'slip trainer',
    'boxing training',
    'defensive training',
    'combat sports'
  ],
  authors: [{ name: 'Simple Slip Trainer' }],
  openGraph: {
    title: 'Simple Slip Trainer',
    description:
      'A web-based boxing training tool for practicing slip movements.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Simple Slip Trainer'
  },
  themeColor: '#191919'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={silkscreen.variable}>{children}</body>
    </html>
  );
}
