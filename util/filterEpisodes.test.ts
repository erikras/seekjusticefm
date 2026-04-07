import { describe, expect, it } from 'vitest';
import type { Episode } from '../lib/episodes';
import { filterEpisodes } from './filterEpisodes';

const episodes: Episode[] = [
  {
    frontmatter: {
      title: 'A Prosecutor Speaks',
      mp3URL: '/media/001.mp3',
      date: '2024-01-01',
      description: 'An interview about bail reform and sentencing.',
      episode: 1,
      slug: '001',
    },
    body: '<p>Body</p>',
    filepath: '/tmp/001.md',
  },
  {
    frontmatter: {
      title: 'Inside the Jail',
      mp3URL: '/media/024.mp3',
      date: '2024-02-01',
      description: 'A deep dive into prison conditions and oversight.',
      episode: 24,
      slug: '024',
    },
    body: '<p>Body</p>',
    filepath: '/tmp/024.md',
  },
];

describe('filterEpisodes', () => {
  it('returns the full list when the query is empty', () => {
    expect(filterEpisodes(episodes, '   ')).toEqual(episodes);
  });

  it('matches by title', () => {
    expect(filterEpisodes(episodes, 'prosecutor')).toEqual([episodes[0]]);
  });

  it('matches by description', () => {
    expect(filterEpisodes(episodes, 'oversight')).toEqual([episodes[1]]);
  });

  it('matches by episode number', () => {
    expect(filterEpisodes(episodes, '24')).toEqual([episodes[1]]);
  });
});
