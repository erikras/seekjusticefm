import Link from 'next/link';
import type { Episode } from '../lib/episodes';
import {
  description,
  shareHandle,
  title,
  url,
} from '../util/constants';
import Share from './Share';

interface HeaderProps {
  episode?: Episode;
}

export default function Header({ episode }: HeaderProps) {
  const shareTitle = episode ? episode.frontmatter.title : title;
  const shareDescription = episode
    ? episode.frontmatter.description
    : description;
  const shareUrl = episode ? `${url}/${episode.frontmatter.slug}` : url;
  // Episode pages use the episode title as their <h1>.
  const SiteTitle = episode ? 'p' : 'h1';

  return (
    <header className="rounded-[2.5rem] border border-line/70 bg-[linear-gradient(135deg,rgba(255,250,243,0.96),rgba(242,234,223,0.85))] p-6 shadow-[0_28px_70px_rgba(31,37,40,0.09)] sm:p-8 lg:p-10">
      <div className="grid items-center gap-8 lg:grid-cols-[300px_minmax(0,1fr)]">
        <div className="mx-auto w-full max-w-[300px]">
          <Link href="/" className="block">
            <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-white p-3 shadow-[0_22px_55px_rgba(31,37,40,0.14)] transition-transform duration-200 hover:-translate-y-1">
              <img
                src="/art300.jpg"
                alt="Seek Justice cover art"
                width={300}
                height={300}
                className="h-auto w-full rounded-[1.35rem]"
              />
            </div>
          </Link>
        </div>

        <div className="space-y-5 text-center lg:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-brand-dark/65">
            Criminal Justice Podcast
          </p>
          <div className="space-y-3">
            <SiteTitle className="font-serif text-4xl leading-tight text-ink sm:text-5xl">
              <Link href="/" className="transition-colors duration-150 hover:text-brand-dark">
                {title}
              </Link>
            </SiteTitle>
            <p className="mx-auto max-w-3xl text-lg leading-8 text-ink/72 lg:mx-0">
              {description}
            </p>
          </div>

          {episode ? (
            <div className="inline-flex max-w-full flex-col rounded-[1.75rem] border border-brand/20 bg-white/80 px-5 py-4 text-left shadow-[0_12px_30px_rgba(31,37,40,0.06)]">
              <span className="text-xs font-semibold uppercase tracking-[0.26em] text-brand-dark/65">
                Episode {episode.frontmatter.episode}
              </span>
              <span className="mt-2 font-serif text-2xl leading-tight text-ink">
                {episode.frontmatter.title}
              </span>
            </div>
          ) : null}

          <Share
            title={shareTitle}
            description={shareDescription}
            author={shareHandle}
            url={shareUrl}
          />
        </div>
      </div>
    </header>
  );
}
