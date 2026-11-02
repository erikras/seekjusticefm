import type { Metadata } from 'next';
import { defaultImage, homeDescription, homeTitle, title } from './constants';

// Next.js replaces (rather than merges) a layout's `openGraph` when a page sets
// its own, so pages that only need to add a `url` spread these defaults.
export const defaultOpenGraph = {
  title: homeTitle,
  description: homeDescription,
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
} satisfies Metadata['openGraph'];
