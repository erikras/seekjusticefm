import type { Episode } from './content';
import {
  applePodcastsURL,
  defaultImage,
  homeDescription,
  rssURL,
  spotifyURL,
  title,
  url,
} from './constants';
import { getMediaMetadata, loadMediaManifest } from './mediaManifest';

const hosts = [
  { '@type': 'Person', name: 'Erik Rasmussen' },
  { '@type': 'Person', name: 'Dennis Schrantz' },
];

const seriesReference = {
  '@type': 'PodcastSeries',
  '@id': `${url}/#podcast`,
  name: title,
  url,
};

function toISODuration(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  return `PT${hours ? `${hours}H` : ''}${minutes ? `${minutes}M` : ''}${seconds}S`;
}

export function podcastSeriesJsonLd() {
  return {
    '@context': 'https://schema.org',
    ...seriesReference,
    description: homeDescription,
    image: defaultImage,
    webFeed: rssURL,
    inLanguage: 'en-US',
    genre: 'Criminal Justice',
    author: hosts,
    sameAs: [applePodcastsURL, spotifyURL],
  };
}

export function podcastEpisodeJsonLd(episode: Episode) {
  const { frontmatter } = episode;
  const pageUrl = `${url}/${frontmatter.slug}`;
  const { durationSeconds, sizeBytes } = getMediaMetadata(
    loadMediaManifest(),
    frontmatter.mp3URL
  );
  const duration = durationSeconds ? toISODuration(durationSeconds) : undefined;

  return {
    '@context': 'https://schema.org',
    '@type': 'PodcastEpisode',
    '@id': `${pageUrl}#episode`,
    url: pageUrl,
    name: frontmatter.title,
    description: frontmatter.description,
    datePublished: frontmatter.date,
    episodeNumber: frontmatter.episode,
    image: frontmatter.art ? `${url}/${frontmatter.art}` : defaultImage,
    inLanguage: 'en-US',
    timeRequired: duration,
    author: hosts,
    partOfSeries: seriesReference,
    associatedMedia: {
      '@type': 'AudioObject',
      contentUrl: `${url}/${frontmatter.mp3URL}`,
      encodingFormat: 'audio/mpeg',
      duration,
      contentSize: sizeBytes ? String(sizeBytes) : undefined,
    },
  };
}
