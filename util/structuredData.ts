import {
  applePodcastsURL,
  defaultImage,
  homeDescription,
  mediaBaseURL,
  rssURL,
  spotifyURL,
  title,
  url,
} from './constants';
import type { Episode } from './content';
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

export function toISODuration(totalSeconds: number): string | undefined {
  if (!Number.isFinite(totalSeconds) || totalSeconds <= 0) {
    return undefined;
  }

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);
  const parts = ['PT'];

  if (hours) {
    parts.push(`${hours}H`);
  }

  if (minutes) {
    parts.push(`${minutes}M`);
  }

  if (seconds || parts.length === 1) {
    parts.push(`${seconds}S`);
  }

  return parts.join('');
}

function audioContentUrl(mp3URL: string): string {
  if (/^https?:\/\//.test(mp3URL)) {
    return mp3URL;
  }

  return `${mediaBaseURL}/${mp3URL.replace(/^\//, '')}`;
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
  const duration = toISODuration(durationSeconds);

  return {
    '@context': 'https://schema.org',
    '@type': 'PodcastEpisode',
    '@id': `${pageUrl}#episode`,
    url: pageUrl,
    name: frontmatter.title,
    description: frontmatter.description,
    datePublished: frontmatter.date,
    episodeNumber: frontmatter.episode,
    image: frontmatter.art
      ? `${url}/${frontmatter.art.replace(/^\//, '')}`
      : defaultImage,
    inLanguage: 'en-US',
    ...(duration ? { timeRequired: duration } : {}),
    author: hosts,
    partOfSeries: seriesReference,
    associatedMedia: {
      '@type': 'AudioObject',
      contentUrl: audioContentUrl(frontmatter.mp3URL),
      encodingFormat: 'audio/mpeg',
      ...(duration ? { duration } : {}),
      ...(sizeBytes ? { contentSize: String(sizeBytes) } : {}),
    },
  };
}
