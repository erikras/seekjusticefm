import fs from 'node:fs';
import path from 'node:path';
import frontMatter from 'front-matter';
import MarkdownIt from 'markdown-it';

const contentFolder = 'content';
const md = new MarkdownIt({ html: true, linkify: true });

export interface EpisodeFrontmatter {
  title: string;
  mp3URL: string;
  download?: string;
  date: string;
  art?: string;
  description: string;
  episodeType?: 'full' | 'trailer' | 'bonus';
  episode?: number;
  season?: number;
  slug: string;
  youtube?: string;
}

export interface Episode {
  frontmatter: EpisodeFrontmatter;
  body: string;
  filepath: string;
}

function normalizeSlug(filepath: string) {
  return path.basename(filepath, '.md');
}

function normalizeDate(value: unknown): string {
  if (typeof value === 'string') {
    return value;
  }

  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }

  return String(value ?? '');
}

function grabContents(filepaths: string[]): Episode[] {
  const contents: Episode[] = [];

  for (const filepath of filepaths) {
    try {
      const content = fs.readFileSync(filepath, 'utf-8');
      const { attributes, body } = frontMatter<Omit<EpisodeFrontmatter, 'slug'>>(
        content
      );

      contents.push({
        frontmatter: {
          ...attributes,
          date: normalizeDate(attributes.date),
          slug: normalizeSlug(filepath),
        },
        body: md.render(body),
        filepath,
      });
    } catch (error) {
      console.warn(`Error processing ${filepath}:`, error);
    }
  }

  return contents.sort((left, right) => {
    const episodeDelta =
      (right.frontmatter.episode ?? 0) - (left.frontmatter.episode ?? 0);

    if (episodeDelta !== 0) {
      return episodeDelta;
    }

    return right.frontmatter.date.localeCompare(left.frontmatter.date);
  });
}

const filenames = fs
  .readdirSync(contentFolder)
  .filter((filename) => filename.endsWith('.md'));
const filepaths = filenames.map((file) =>
  path.join(process.cwd(), contentFolder, file)
);

const contents = grabContents(filepaths);

export default contents;
