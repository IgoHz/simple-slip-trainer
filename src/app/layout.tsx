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
  description: 'A simple slip trainer for boxing'
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
