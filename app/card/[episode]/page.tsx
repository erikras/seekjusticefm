import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import AudioCardComponent from '@/components/AudioCard';
import { getAllEpisodeSlugs, getEpisode } from '@/lib/episodes';
import { defaultImage, shareHandle, title, url } from '@/util/constants';

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

  const imageUrl = ep.frontmatter.art
    ? `${url}/${ep.frontmatter.art}`
    : defaultImage;

  return {
    title: `${ep.frontmatter.title} (Player)`,
    description: ep.frontmatter.description,
    // This is the embeddable Twitter player; the episode page is the
    // indexable version. Not disallowed in robots.txt because Twitterbot
    // must still be able to fetch it.
    robots: {
      index: false,
      follow: true,
    },
    alternates: {
      canonical: `${url}/${ep.frontmatter.slug}`,
    },
    openGraph: {
      title: ep.frontmatter.title,
      description: ep.frontmatter.description,
      siteName: title,
      type: 'article',
      images: [imageUrl],
    },
    twitter: {
      card: 'player',
      title: ep.frontmatter.title,
      description: ep.frontmatter.description,
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
    ? `${url}/${ep.frontmatter.art}`
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
