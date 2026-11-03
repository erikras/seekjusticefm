import fs from 'node:fs';
import { url } from '../util/constants';
import contents from '../util/content';
import { buildSitemapXml } from '../util/sitemap';

const sitemap = buildSitemapXml(url, contents);

fs.writeFileSync('public/sitemap.xml', sitemap);
console.log(`Sitemap written with ${contents.length + 1} URLs`);
