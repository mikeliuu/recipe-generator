import { Disclaimer } from '@/components/disclaimer';
import './globals.css';

import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { getEnv } from '@/lib/env';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/providers/theme-provider';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Toaster } from 'sonner';

const geistSans = localFont({
  src: '../../public/fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});

const geistMono = localFont({
  src: '../../public/fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

const env = getEnv();

const title = 'Recipe Generator';
const description =
  'An AI-powered recipe generator that suggests meal ideas based on your current or leftover ingredients, saving time and reducing food waste.';

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_BASE_URL),
  title,
  description,
  keywords: [
    'recipe',
    'recipe generator',
    'generative AI',
    'AI-powered',
    'meal ideas',
    'leftover ingredients',
    'food waste reduction',
    'no waste',
    'zero waste',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title,
    description,
    type: 'website',
    siteName: title,
    images: [
      {
        url: '/og.svg',
      },
    ],
  },
  twitter: {
    title,
    description,
    card: 'summary_large_image',
    site: title,
    creator: 'Mike Liu',
    images: [
      {
        url: '/og.svg',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'antialiased bg-zinc-100 dark:bg-zinc-900',
          geistSans.variable,
          geistMono.variable,
        )}
      >
        <ThemeProvider>
          <Header />

          <div className="relative min-h-[calc(100vh-72px-124px)] sm:min-h-[calc(100vh-72px-72px)] max-w-screen-xl mx-auto pt-[72px]">
            {children}
          </div>

          <div className="w-full max-w-screen-xl mx-auto my-8 px-4 sm:px-12 lg:px-16">
            <Disclaimer />
          </div>

          <Footer />

          <Toaster className="z-50" />
        </ThemeProvider>
      </body>
    </html>
  );
}
