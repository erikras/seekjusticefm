import type { Metadata } from 'next';
import EpisodeListWithSearch from '@/components/EpisodeListWithSearch';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import JsonLd from '@/components/JsonLd';
import Listen from '@/components/Listen';
import { getEpisodes } from '@/lib/episodes';
import {
  defaultImage,
  feedAlternateTypes,
  homeDescription,
  homeTitle,
  shareHandle,
  url,
} from '@/util/constants';
import { defaultOpenGraph } from '@/util/metadata';
import { podcastSeriesJsonLd } from '@/util/structuredData';

export const metadata: Metadata = {
  // `absolute` keeps the homepage title from picking up the "%s | Seek Justice" template.
  title: { absolute: homeTitle },
  description: homeDescription,
  alternates: {
    canonical: url,
    types: feedAlternateTypes,
  },
  openGraph: {
    ...defaultOpenGraph,
    url,
  },
  twitter: {
    card: 'summary_large_image',
    title: homeTitle,
    description: homeDescription,
    creator: `@${shareHandle}`,
    site: `@${shareHandle}`,
    images: [defaultImage],
  },
};

export default async function HomePage() {
  const { episodes } = await getEpisodes();
  // Only the fields the archive search renders. Shipping show-note HTML and
  // absolute content paths would publish build-machine links for crawlers.
  const episodeSummaries = episodes.map(({ frontmatter }) => ({ frontmatter }));

  return (
    <main className="page-shell">
      <JsonLd data={podcastSeriesJsonLd()} />
      <Header />

      <div className="content-grid">
        <div className="lg:sticky lg:top-6 lg:self-start">
          <Listen />
        </div>

        <section className="space-y-5">
          <div className="rounded-[2rem] border border-line/70 bg-white/80 px-6 py-5 shadow-[0_18px_50px_rgba(31,37,40,0.07)]">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-dark/65">
              Archive
            </p>
            <h2 className="mt-2 font-serif text-3xl text-ink">Every Episode</h2>
            <p className="mt-2 max-w-3xl text-base leading-7 text-ink/72">
              Conversations, interviews, and policy deep-dives from across the
              criminal justice system.
            </p>
          </div>

          <EpisodeListWithSearch episodes={episodeSummaries} />
        </section>
      </div>

      <Footer />
    </main>
  );
}
