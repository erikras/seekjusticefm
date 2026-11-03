import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import AudioCardComponent from '@/components/AudioCard';
import { getAllEpisodeSlugs, getEpisode } from '@/lib/episodes';
import {
  defaultImage,
  feedAlternateTypes,
  shareHandle,
  title,
  url,
} from '@/util/constants';

interface CardPageProps {
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
}: CardPageProps): Promise<Metadata> {
  const { episode } = await params;
  const ep = await getEpisode(episode);

  if (!ep) {
    return {
      title: 'Episode Not Found',
    };
  }

  const pageUrl = `${url}/${ep.frontmatter.slug}`;
  const imageUrl = ep.frontmatter.art
    ? `${url}/${ep.frontmatter.art.replace(/^\//, '')}`
    : defaultImage;
  const playerTitle = `${ep.frontmatter.title} (Player)`;
  const playerDescription = `Embedded audio player. ${ep.frontmatter.description}`;

  return {
    title: playerTitle,
    description: playerDescription,
    // The episode page is the indexable URL. This embed stays fetchable for
    // Twitter's player card, so it is noindex rather than blocked in robots.txt.
    robots: {
      index: false,
      follow: true,
    },
    alternates: {
      canonical: pageUrl,
      types: feedAlternateTypes,
    },
    openGraph: {
      title: playerTitle,
      description: playerDescription,
      url: pageUrl,
      siteName: title,
      type: 'website',
      images: [
        {
          url: imageUrl,
          alt: ep.frontmatter.art
            ? `Cover art for ${ep.frontmatter.title}`
            : 'Seek Justice cover art',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: playerTitle,
      description: playerDescription,
      creator: `@${shareHandle}`,
      site: `@${shareHandle}`,
      images: [imageUrl],
    },
  };
}

export default async function CardPage({ params }: CardPageProps) {
  const { episode } = await params;
  const ep = await getEpisode(episode);

  if (!ep) {
    notFound();
  }

  const imageUrl = ep.frontmatter.art
    ? `${url}/${ep.frontmatter.art.replace(/^\//, '')}`
    : `${url}/art300.jpg`;

  return (
    <main className="min-h-screen bg-white p-2">
      <div className="mx-auto max-w-[900px]">
        <AudioCardComponent
          episode={ep}
          image={imageUrl}
          linkToShowNotes
          autoPlay
        />
      </div>
    </main>
  );
}
