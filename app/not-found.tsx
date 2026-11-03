import type { Metadata } from 'next';
import Link from 'next/link';
import { defaultImage, shareHandle } from '@/util/constants';
import { defaultOpenGraph } from '@/util/metadata';

const notFoundTitle = 'Page Not Found';
const notFoundDescription =
  'That page is not on Seek Justice. Browse the episode archive instead.';

export const metadata: Metadata = {
  title: notFoundTitle,
  description: notFoundDescription,
  openGraph: {
    ...defaultOpenGraph,
    title: notFoundTitle,
    description: notFoundDescription,
  },
  twitter: {
    card: 'summary_large_image',
    title: notFoundTitle,
    description: notFoundDescription,
    creator: `@${shareHandle}`,
    site: `@${shareHandle}`,
    images: [defaultImage],
  },
};

export default function NotFound() {
  return (
    <main className="page-shell items-center justify-center">
      <div className="max-w-xl rounded-[2rem] border border-line/70 bg-white/90 p-10 text-center shadow-[0_24px_60px_rgba(31,37,40,0.09)]">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-dark/60">
          404
        </p>
        <h1 className="mt-3 font-serif text-4xl text-ink">Page not found</h1>
        <p className="mt-4 text-lg leading-8 text-ink/72">
          The page may have moved, or the link may be incomplete.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center rounded-full bg-brand-dark px-5 py-3 text-sm font-semibold text-white transition-transform duration-150 hover:-translate-y-0.5"
        >
          Return to the episode archive
        </Link>
      </div>
    </main>
  );
}
