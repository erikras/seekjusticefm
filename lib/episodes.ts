import contents, { type Episode } from '../util/content';

export type { Episode } from '../util/content';

export async function getEpisodes(): Promise<{
  episodes: Episode[];
  totalEpisodes: number;
}> {
  return {
    episodes: contents,
    totalEpisodes: contents.length,
  };
}

export async function getEpisode(slug: string): Promise<Episode | null> {
  return contents.find((episode) => episode.frontmatter.slug === slug) ?? null;
}

export async function getAllEpisodeSlugs(): Promise<string[]> {
  return contents.map((episode) => episode.frontmatter.slug);
}

export async function getNextEpisode(currentSlug: string): Promise<Episode | null> {
  const currentIndex = contents.findIndex(
    (episode) => episode.frontmatter.slug === currentSlug
  );

  if (currentIndex <= 0) {
    return null;
  }

  return contents[currentIndex - 1] ?? null;
}

export async function getPreviousEpisode(
  currentSlug: string
): Promise<Episode | null> {
  const currentIndex = contents.findIndex(
    (episode) => episode.frontmatter.slug === currentSlug
  );

  if (currentIndex === -1 || currentIndex === contents.length - 1) {
    return null;
  }

  return contents[currentIndex + 1] ?? null;
}
