import Link from 'next/link';
import type { Episode } from '../lib/episodes';
import { formatDisplayDate } from '../util/formatDate';

interface EpisodeListProps {
  episodes: Episode[];
}

export default function EpisodeList({ episodes }: EpisodeListProps) {
  return (
    <div className="space-y-5">
      {episodes.map((episode) => (
        <Link key={episode.frontmatter.slug} href={`/${episode.frontmatter.slug}`}>
          <article className="group rounded-[2rem] border border-line/80 bg-white/92 p-5 shadow-[0_16px_44px_rgba(31,37,40,0.08)] transition-all duration-200 hover:-translate-y-1 hover:border-brand/45 hover:shadow-[0_26px_54px_rgba(31,37,40,0.14)] sm:p-6">
            <div className="flex flex-col gap-5 md:flex-row">
              <div className="relative overflow-hidden rounded-[1.5rem] border border-line/70 bg-sand shadow-[0_12px_28px_rgba(31,37,40,0.08)] md:w-52 md:flex-shrink-0">
                <img
                  src={episode.frontmatter.art || '/art300.jpg'}
                  alt={episode.frontmatter.title}
                  className="aspect-square h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-[#1f2528]/55 via-transparent to-transparent">
                  <div className="rounded-full border border-white/35 bg-white/18 p-4 text-white backdrop-blur">
                    <svg className="h-10 w-10" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <div className="mb-3 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-brand-dark/65">
                    <span>Episode {episode.frontmatter.episode}</span>
                    <span className="h-1 w-1 rounded-full bg-brand/60" />
                    <span>{formatDisplayDate(episode.frontmatter.date)}</span>
                  </div>
                  <h2 className="font-serif text-2xl leading-tight text-ink transition-colors duration-150 group-hover:text-brand-dark">
                    {episode.frontmatter.title}
                  </h2>
                  <p className="mt-3 max-w-3xl text-base leading-7 text-ink/72">
                    {episode.frontmatter.description}
                  </p>
                </div>

                <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-dark">
                  Listen now
                  <svg className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </article>
        </Link>
      ))}
    </div>
  );
}
