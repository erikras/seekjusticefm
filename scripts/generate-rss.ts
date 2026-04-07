import fs from 'node:fs';
import path from 'node:path';
import {
  author,
  defaultImage,
  description,
  rssKeywords,
  title,
  url,
} from '../util/constants';
import contents from '../util/content';
import { getMediaMetadata, loadMediaManifest } from '../util/mediaManifest';
import { prefixMp3 } from '../util/prefixMp3';

interface Episode {
  title: string;
  episode: number;
  date: string;
  mp3URL: string;
  sizeBytes: number;
  description: string;
  body: string;
  durationSeconds: number;
  explicit?: boolean;
  episodeType?: 'full' | 'trailer' | 'bonus';
  season?: number;
  slug: string;
}

interface RSSFeed {
  title: string;
  description: string;
  link: string;
  language: string;
  copyright: string;
  author: string;
  image: string;
  episodes: Episode[];
}

const decorateURL = (mp3Path: string) => {
  const filename = path.basename(mp3Path);
  return prefixMp3(filename);
};

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function formatDate(dateString: string): string {
  const normalizedDate = /^\d{4}-\d{2}-\d{2}$/.test(dateString)
    ? `${dateString}T00:00:00Z`
    : dateString;
  const date = new Date(normalizedDate);

  if (Number.isNaN(date.getTime())) {
    throw new Error(`Invalid date: ${dateString}`);
  }

  return date.toUTCString();
}

function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

function generateRSS(feed: RSSFeed): string {
  const now = new Date().toUTCString();

  let rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:cc="http://web.resource.org/cc/" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" xmlns:media="http://search.yahoo.com/mrss/" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
    <channel>
        <title>${escapeXml(feed.title)}</title>
        <link>${escapeXml(feed.link)}</link>
        <language>${feed.language}</language>
        <description>${escapeXml(feed.description)}</description>
        <managingEditor>${author.email} (${escapeXml(feed.author)})</managingEditor>
        <pubDate>${now}</pubDate>
        <lastBuildDate>${now}</lastBuildDate>
        <docs>${escapeXml(feed.link)}</docs>
        <generator>Custom RSS Generator</generator>
        <itunes:summary>${escapeXml(feed.title)}</itunes:summary>
        <itunes:author>${escapeXml(feed.author)}</itunes:author>
        <itunes:keywords>${rssKeywords.join(',')}</itunes:keywords>
        <itunes:category text="News &amp; Politics"/>
        <itunes:category text="Society &amp; Culture">
            <itunes:category text="Philosophy"/>
        </itunes:category>
        <itunes:image href="${escapeXml(feed.image)}"/>
        <itunes:explicit>clean</itunes:explicit>
        <itunes:owner>
            <itunes:name><![CDATA[${feed.author}]]></itunes:name>
            <itunes:email>${author.email}</itunes:email>
        </itunes:owner>
        <itunes:type>episodic</itunes:type>
        <copyright>${escapeXml(feed.copyright)}</copyright>`;

  feed.episodes.forEach((episode) => {
    const decoratedMp3URL = decorateURL(episode.mp3URL);

    rss += `
        <item>
            <title><![CDATA[${episode.title}]]></title>
            <link><![CDATA[${decoratedMp3URL}]]></link>
            <guid>${decoratedMp3URL}</guid>
            <pubDate>${formatDate(episode.date)}</pubDate>
            <description><![CDATA[${episode.body}]]></description>
            <content:encoded><![CDATA[${episode.body}]]></content:encoded>
            <author>${author.email} (${escapeXml(feed.author)})</author>
            <enclosure length="${episode.sizeBytes}" type="audio/mpeg" url="${decoratedMp3URL}"/>
            <itunes:duration>${formatDuration(episode.durationSeconds)}</itunes:duration>
            <itunes:explicit>${episode.explicit ? 'yes' : 'no'}</itunes:explicit>
            <itunes:subtitle><![CDATA[${episode.description}]]></itunes:subtitle>
            <itunes:episodeType>${episode.episodeType ?? 'full'}</itunes:episodeType>
            <itunes:episode>${episode.episode}</itunes:episode>`;

    if (episode.season) {
      rss += `
            <itunes:season>${episode.season}</itunes:season>`;
    }

    rss += `
        </item>`;
  });

  rss += `
    </channel>
</rss>`;

  return rss;
}

async function generateRSSFeed(): Promise<void> {
  try {
    console.log('Generating RSS feed...');
    const mediaManifest = loadMediaManifest();
    const episodes: Episode[] = [];

    for (const content of contents) {
      const episodeNumber = content.frontmatter.episode ?? 0;
      const slug =
        content.frontmatter.slug || path.basename(content.filepath, '.md');
      const mediaMetadata = getMediaMetadata(
        mediaManifest,
        content.frontmatter.mp3URL
      );

      episodes.push({
        title: content.frontmatter.title,
        episode: episodeNumber,
        date: content.frontmatter.date,
        mp3URL: content.frontmatter.mp3URL,
        sizeBytes: mediaMetadata.sizeBytes,
        description: content.frontmatter.description,
        body: content.body,
        durationSeconds: mediaMetadata.durationSeconds,
        explicit: false,
        episodeType: content.frontmatter.episodeType,
        season: content.frontmatter.season,
        slug,
      });
    }

    episodes.sort((a, b) => b.episode - a.episode);

    const feed: RSSFeed = {
      title,
      description,
      link: url,
      language: 'en',
      copyright: 'Copyright – Erik Rasmussen and Dennis Schrantz',
      author: author.name,
      image: defaultImage,
      episodes,
    };

    fs.writeFileSync('public/rss.xml', generateRSS(feed));
    console.log(`RSS feed generated with ${episodes.length} episodes`);
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    throw error;
  }
}

if (require.main === module) {
  generateRSSFeed().catch(console.error);
}

export { generateRSSFeed, generateRSS, formatDate, formatDuration };
