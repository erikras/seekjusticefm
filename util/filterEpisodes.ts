import type { Episode } from '../lib/episodes';

export function filterEpisodes(episodes: Episode[], searchTerm: string): Episode[] {
  const normalizedTerm = searchTerm.trim().toLowerCase();

  if (!normalizedTerm) {
    return episodes;
  }

  return episodes.filter((episode) => {
    const title = episode.frontmatter.title.toLowerCase();
    const description = episode.frontmatter.description.toLowerCase();
    const episodeNumber = String(episode.frontmatter.episode ?? '');

    return (
      title.includes(normalizedTerm) ||
      description.includes(normalizedTerm) ||
      episodeNumber.includes(normalizedTerm)
    );
  });
}
