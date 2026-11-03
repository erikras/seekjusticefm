import fs from 'node:fs';
import { describe, expect, it } from 'vitest';
import { url } from './constants';
import contents from './content';
import { buildSitemapXml } from './sitemap';

function captureAll(xml: string, pattern: RegExp): string[] {
  const expression = new RegExp(
    pattern.source,
    pattern.flags.includes('g') ? pattern.flags : `${pattern.flags}g`
  );
  const values: string[] = [];
  let match = expression.exec(xml);

  while (match) {
    values.push(match[1] ?? '');
    match = expression.exec(xml);
  }

  return values;
}

describe('buildSitemapXml', () => {
  const xml = buildSitemapXml(url, contents);
  const locs = captureAll(xml, /<loc>([^<]+)<\/loc>/g);

  it('is a urlset document of absolute https://seekjustice.fm URLs', () => {
    expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true);
    expect(xml).toContain(
      'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"'
    );
    expect(locs[0]).toBe('https://seekjustice.fm');
    expect(locs.every((loc) => loc?.startsWith('https://seekjustice.fm'))).toBe(
      true
    );
  });

  it('lists the homepage and every episode once', () => {
    const episodeLocs = contents.map(
      (episode) => `https://seekjustice.fm/${episode.frontmatter.slug}`
    );

    expect(locs).toEqual([
      'https://seekjustice.fm',
      ...[...episodeLocs].sort(),
    ]);
    expect(new Set(locs).size).toBe(locs.length);
    expect(xml).not.toContain('/card/');
  });

  it('emits YYYY-MM-DD lastmod values', () => {
    const lastmods = captureAll(xml, /<lastmod>([^<]+)<\/lastmod>/g);

    expect(lastmods).toHaveLength(contents.length + 1);
    expect(
      lastmods.every((value) => /^\d{4}-\d{2}-\d{2}$/.test(value ?? ''))
    ).toBe(true);
  });
});

describe('robots.txt', () => {
  it('points at the production sitemap', () => {
    const robots = fs.readFileSync('public/robots.txt', 'utf8');

    expect(robots).toContain('Sitemap: https://seekjustice.fm/sitemap.xml');
    expect(robots).toContain('User-agent: *');
  });
});
