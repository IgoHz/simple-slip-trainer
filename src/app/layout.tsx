import type { Metadata } from 'next';
import { Silkscreen } from 'next/font/google';
import { THEME_STORAGE_KEY } from '@/shared/lib/theme';
import './globals.css';

const silkscreen = Silkscreen({
  variable: '--font-silkscreen',
  weight: ['400', '700'],
  subsets: ['latin']
});

const themeInitializationScript = `
try {
  const theme = window.localStorage.getItem('${THEME_STORAGE_KEY}');
  if (theme === 'dark' || theme === 'light') {
    document.documentElement.dataset.theme = theme;
  }
} catch {
  document.documentElement.dataset.theme = 'dark';
}
`;

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
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: themeInitializationScript }}
        />
      </head>
      <body className={silkscreen.variable}>{children}</body>
    </html>
  );
}
