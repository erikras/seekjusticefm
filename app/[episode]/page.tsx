import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import AudioCardComponent from '@/components/AudioCard';
import DownloadBar from '@/components/DownloadBar';
import EpisodeNavigation from '@/components/EpisodeNavigation';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Listen from '@/components/Listen';
import ShowNotes from '@/components/ShowNotes';
import {
  getAllEpisodeSlugs,
  getEpisode,
  getNextEpisode,
  getPreviousEpisode,
} from '@/lib/episodes';
import JsonLd from '@/components/JsonLd';
import {
  defaultImage,
  feedAlternateTypes,
  shareHandle,
  title,
  url,
} from '@/util/constants';
import { prefixMp3 } from '@/util/prefixMp3';
import { podcastEpisodeJsonLd } from '@/util/structuredData';

interface EpisodePageProps {
  params: Promise<{ episode: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllEpisodeSlugs();

  return slugs.map((slug) => ({
    episode: slug,
  }));
}

export async function generateMetadata({
  params,
}: EpisodePageProps): Promise<Metadata> {
  const { episode } = await params;
  const ep = await getEpisode(episode);

  if (!ep) {
    return {
      title: 'Episode Not Found',
    };
  }

  const pageUrl = `${url}/${ep.frontmatter.slug}`;
  const playerUrl = `${url}/card/${ep.frontmatter.slug}`;
  const audioUrl = prefixMp3(`${ep.frontmatter.slug}.mp3`);
  const imageUrl = ep.frontmatter.art
    ? `${url}/${ep.frontmatter.art}`
    : defaultImage;

  return {
    title: ep.frontmatter.title,
    description: ep.frontmatter.description,
    alternates: {
      canonical: pageUrl,
      types: feedAlternateTypes,
    },
    openGraph: {
      title: ep.frontmatter.title,
      description: ep.frontmatter.description,
      url: pageUrl,
      siteName: title,
      type: 'article',
      publishedTime: ep.frontmatter.date,
      images: [
        {
          url: imageUrl,
          // Only the default cover art has known dimensions (3000x3000).
          ...(ep.frontmatter.art ? {} : { width: 3000, height: 3000 }),
          alt: ep.frontmatter.title,
        },
      ],
    },
    twitter: {
      card: 'player',
      title: ep.frontmatter.title,
      description: ep.frontmatter.description,
      creator: `@${shareHandle}`,
      site: `@${shareHandle}`,
      images: [imageUrl],
    },
    other: {
      'twitter:player': playerUrl,
      'twitter:player:width': '800',
      'twitter:player:height': '240',
      'twitter:player:stream': audioUrl,
      'twitter:player:stream:content_type': 'audio/mpeg',
      'twitter:image:alt': `Cover art for ${ep.frontmatter.title}`,
    },
  };
}

export default async function EpisodePage({ params }: EpisodePageProps) {
  const { episode } = await params;
  const ep = await getEpisode(episode);

  if (!ep) {
    notFound();
  }

  const [nextEpisode, previousEpisode] = await Promise.all([
    getNextEpisode(episode),
    getPreviousEpisode(episode),
  ]);

  return (
    <main className="page-shell">
      <JsonLd data={podcastEpisodeJsonLd(ep)} />
      <Header episode={ep} />

      <div className="content-grid">
        <div className="lg:sticky lg:top-6 lg:self-start">
          <Listen />
        </div>

        <article className="space-y-6">
          <section className="rounded-[2rem] border border-line/70 bg-white/92 p-6 shadow-[0_18px_50px_rgba(31,37,40,0.08)] sm:p-8">
            <DownloadBar frontmatter={ep.frontmatter} />

            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-dark/65">
                Episode {ep.frontmatter.episode}
              </p>
              <h1 className="font-serif text-4xl leading-tight text-ink">
                {ep.frontmatter.title}
              </h1>
              <p className="max-w-4xl text-lg leading-8 text-ink/72">
                {ep.frontmatter.description}
              </p>
            </div>

            <div className="mt-8">
              <AudioCardComponent episode={ep} />
            </div>

            {ep.frontmatter.art ? (
              <figure className="mb-8 mt-8 overflow-hidden rounded-[1.8rem] border border-line/70 bg-paper shadow-[0_16px_40px_rgba(31,37,40,0.08)]">
                <img
                  src={`/${ep.frontmatter.art}`}
                  alt={ep.frontmatter.title}
                  className="h-auto w-full object-cover"
                />
              </figure>
            ) : null}

            <ShowNotes episode={ep} />

            <div className="mt-8 rounded-[1.75rem] bg-[#231915] px-6 py-5 text-sm leading-7 text-[#f7ede3] shadow-[0_18px_45px_rgba(31,37,40,0.16)]">
              Our theme music is{' '}
              <a
                href="https://www.incompetech.com/music/royalty-free/index.html?isrc=USUAN1600039"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#f1c58f] underline decoration-[#f1c58f]/50"
              >
                District Four
              </a>
              , by Kevin MacLeod (incompetech.com). Licensed under{' '}
              <a
                href="http://creativecommons.org/licenses/by/3.0/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#f1c58f] underline decoration-[#f1c58f]/50"
              >
                Creative Commons: By Attribution 3.0 License
              </a>
              .
            </div>

            <EpisodeNavigation
              currentEpisode={ep}
              nextEpisode={nextEpisode}
              previousEpisode={previousEpisode}
            />
          </section>
        </article>
      </div>

      <Footer />
    </main>
  );
}
