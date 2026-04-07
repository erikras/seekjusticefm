'use client';

import { useDeferredValue, useEffect, useMemo, useState } from 'react';
import type { Episode } from '../lib/episodes';
import { filterEpisodes } from '../util/filterEpisodes';

interface SearchBoxProps {
  episodes: Episode[];
  onFilteredEpisodes: (episodes: Episode[]) => void;
}

export default function SearchBox({
  episodes,
  onFilteredEpisodes,
}: SearchBoxProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const deferredSearchTerm = useDeferredValue(searchTerm);

  const filteredEpisodes = useMemo(
    () => filterEpisodes(episodes, deferredSearchTerm),
    [episodes, deferredSearchTerm]
  );

  useEffect(() => {
    onFilteredEpisodes(filteredEpisodes);
  }, [filteredEpisodes, onFilteredEpisodes]);

  const hasActiveSearch = searchTerm.trim().length > 0;

  return (
    <div className="rounded-[2rem] border border-line/70 bg-white/86 p-5 shadow-[0_16px_44px_rgba(31,37,40,0.07)]">
      <label
        htmlFor="episode-search"
        className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-dark/65"
      >
        Search the archive
      </label>

      <div className="relative mt-3">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-brand-dark/45">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <input
          id="episode-search"
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search by title, description, or episode number..."
          className="block w-full rounded-[1.25rem] border border-line/80 bg-sand/55 py-3 pl-11 pr-12 text-base text-ink placeholder:text-ink/42 focus:border-brand/60 focus:outline-none focus:ring-2 focus:ring-brand/20"
        />

        {hasActiveSearch ? (
          <button
            type="button"
            onClick={() => setSearchTerm('')}
            className="absolute inset-y-0 right-0 flex items-center pr-4 text-brand-dark/45 transition-colors duration-150 hover:text-brand-dark"
            aria-label="Clear search"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        ) : null}
      </div>

      {hasActiveSearch ? (
        <p className="mt-3 text-sm text-ink/65">
          Found {filteredEpisodes.length} episode
          {filteredEpisodes.length === 1 ? '' : 's'}
          {filteredEpisodes.length !== episodes.length
            ? ` out of ${episodes.length}`
            : ''}
          .
        </p>
      ) : null}
    </div>
  );
}
