import type { Metadata } from 'next';
import Script from 'next/script';
import { Source_Sans_3, Source_Serif_4 } from 'next/font/google';
import './globals.css';
import { defaultImage, description, gtmId, title, url } from '../util/constants';

const sans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-sans',
});

const serif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-serif',
});

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL(url),
  alternates: {
    canonical: url,
  },
  openGraph: {
    title,
    description,
    url,
    siteName: title,
    type: 'website',
    images: [
      {
        url: defaultImage,
        width: 3000,
        height: 3000,
        alt: title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    creator: '@seekjusticefm',
    site: '@seekjusticefm',
    images: [defaultImage],
  },
  icons: {
    icon: [
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon.ico', rel: 'shortcut icon' },
    ],
    apple: [{ url: '/favicon/apple-icon.png' }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <Script
          id="gtm-script"
          src={`https://www.googletagmanager.com/gtm.js?id=${gtmId}`}
          strategy="afterInteractive"
        />
        {children}
      </body>
    </html>
  );
}
