import fs from 'node:fs';
import contents from '../util/content';
import { url } from '../util/constants';

;(async () => {
  // URLs must match each page's <link rel="canonical"> exactly.
  const latestEpisodeDate = contents
    .map((episode) => episode.frontmatter.date)
    .sort()
    .reverse()[0];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${url}</loc>
    <lastmod>${latestEpisodeDate}</lastmod>
    <priority>0.5</priority>
  </url>
${contents
  .map(
    (episode) => `  <url>
    <loc>${url}/${episode.frontmatter.slug}</loc>
    <lastmod>${episode.frontmatter.date}</lastmod>
    <priority>0.5</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

  fs.writeFileSync('public/sitemap.xml', sitemap);
})();
