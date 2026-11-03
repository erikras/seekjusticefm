import { describe, expect, it } from 'vitest';
import { serializeJsonLd } from '../components/JsonLd';
import contents from './content';
import {
  podcastEpisodeJsonLd,
  podcastSeriesJsonLd,
  toISODuration,
} from './structuredData';

describe('toISODuration', () => {
  it('formats hours, minutes, and seconds', () => {
    expect(toISODuration(3650)).toBe('PT1H50S');
    expect(toISODuration(90)).toBe('PT1M30S');
    expect(toISODuration(45)).toBe('PT45S');
    expect(toISODuration(3600)).toBe('PT1H');
  });

  it('omits a duration when the length is unknown', () => {
    expect(toISODuration(0)).toBeUndefined();
    expect(toISODuration(Number.NaN)).toBeUndefined();
  });
});

describe('podcast structured data', () => {
  it('describes the show on the homepage', () => {
    const data = podcastSeriesJsonLd();

    expect(data['@context']).toBe('https://schema.org');
    expect(data['@type']).toBe('PodcastSeries');
    expect(data['@id']).toBe('https://seekjustice.fm/#podcast');
    expect(data.name).toBe('Seek Justice');
    expect(data.url).toBe('https://seekjustice.fm');
    expect(data.webFeed).toBe('https://seekjustice.fm/rss.xml');
    expect(data.image).toBe('https://seekjustice.fm/art.jpg');
    expect(data.description.length).toBeGreaterThan(40);
  });

  it('describes one episode with its audio file', () => {
    const episode = contents.find((item) => item.frontmatter.slug === '001');
    expect(episode).toBeDefined();
    if (!episode) {
      return;
    }

    const data = podcastEpisodeJsonLd(episode);

    expect(data['@type']).toBe('PodcastEpisode');
    expect(data.url).toBe('https://seekjustice.fm/001');
    expect(data.name).toBe(episode.frontmatter.title);
    expect(data.description).toBe(episode.frontmatter.description);
    expect(data.datePublished).toBe('2019-03-28');
    expect(data.episodeNumber).toBe(1);
    expect(data.partOfSeries).toMatchObject({
      '@type': 'PodcastSeries',
      name: 'Seek Justice',
      url: 'https://seekjustice.fm',
    });
    expect(data.timeRequired).toBe('PT1H50S');
    expect(data.associatedMedia).toMatchObject({
      '@type': 'AudioObject',
      contentUrl: 'https://media.seekjustice.fm/media/001.mp3',
      encodingFormat: 'audio/mpeg',
      duration: 'PT1H50S',
      contentSize: '58465010',
    });
  });

  it('keeps episode titles and descriptions unique', () => {
    const titles = contents.map((episode) => episode.frontmatter.title);
    const descriptions = contents.map(
      (episode) => episode.frontmatter.description
    );

    expect(new Set(titles).size).toBe(titles.length);
    expect(new Set(descriptions).size).toBe(descriptions.length);
    expect(titles.every((title) => title.trim().length > 0)).toBe(true);
    expect(
      descriptions.every((description) => description.trim().length > 0)
    ).toBe(true);
  });
});

describe('serializeJsonLd', () => {
  it('escapes angle brackets so the payload cannot close the script tag', () => {
    expect(serializeJsonLd({ name: '</script><script>alert(1)' })).toBe(
      '{"name":"\\u003c/script>\\u003cscript>alert(1)"}'
    );
  });
});
