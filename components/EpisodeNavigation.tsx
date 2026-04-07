import Link from 'next/link';
import type { Episode } from '../lib/episodes';

interface EpisodeNavigationProps {
  currentEpisode: Episode;
  previousEpisode?: Episode | null;
  nextEpisode?: Episode | null;
}

export default function EpisodeNavigation({
  previousEpisode,
  nextEpisode,
}: EpisodeNavigationProps) {
  return (
    <div className="mt-8 grid gap-4 border-t border-line/70 pt-8 sm:grid-cols-2">
      <div>
        {previousEpisode ? (
          <Link
            href={`/${previousEpisode.frontmatter.slug}`}
            className="group block rounded-[1.5rem] border border-line/70 bg-white/80 p-5 shadow-[0_12px_30px_rgba(31,37,40,0.06)] transition-all duration-150 hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-[0_20px_36px_rgba(31,37,40,0.1)]"
          >
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-dark/60">
              Previous Episode
            </div>
            <div className="mt-2 font-serif text-xl text-ink transition-colors duration-150 group-hover:text-brand-dark">
              {previousEpisode.frontmatter.title}
            </div>
          </Link>
        ) : null}
      </div>

      <div>
        {nextEpisode ? (
          <Link
            href={`/${nextEpisode.frontmatter.slug}`}
            className="group block rounded-[1.5rem] border border-line/70 bg-white/80 p-5 text-left shadow-[0_12px_30px_rgba(31,37,40,0.06)] transition-all duration-150 hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-[0_20px_36px_rgba(31,37,40,0.1)] sm:text-right"
          >
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-dark/60">
              Next Episode
            </div>
            <div className="mt-2 font-serif text-xl text-ink transition-colors duration-150 group-hover:text-brand-dark">
              {nextEpisode.frontmatter.title}
            </div>
          </Link>
        ) : null}
      </div>
    </div>
  );
}
