import type { Episode } from './content';

const lastmodPattern = /^\d{4}-\d{2}-\d{2}$/;

export function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function buildSitemapXml(siteUrl: string, episodes: Episode[]): string {
  const dates = episodes
    .map((episode) => episode.frontmatter.date)
    .filter((date) => lastmodPattern.test(date))
    .sort();
  const latest = dates.length > 0 ? dates[dates.length - 1] : undefined;

  const entries = [
    { loc: siteUrl, lastmod: latest },
    ...[...episodes]
      .sort((left, right) =>
        left.frontmatter.slug.localeCompare(right.frontmatter.slug)
      )
      .map((episode) => ({
        loc: `${siteUrl}/${episode.frontmatter.slug}`,
        lastmod: lastmodPattern.test(episode.frontmatter.date)
          ? episode.frontmatter.date
          : undefined,
      })),
  ];

  const urls = entries
    .map((entry) => {
      const lastmod = entry.lastmod
        ? `\n    <lastmod>${escapeXml(entry.lastmod)}</lastmod>`
        : '';

      return `  <url>
    <loc>${escapeXml(entry.loc)}</loc>${lastmod}
  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}
