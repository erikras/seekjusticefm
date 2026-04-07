'use client';

import { useState } from 'react';
import type { Episode } from '../lib/episodes';
import EpisodeList from './EpisodeList';
import SearchBox from './SearchBox';

interface EpisodeListWithSearchProps {
  episodes: Episode[];
}

export default function EpisodeListWithSearch({
  episodes,
}: EpisodeListWithSearchProps) {
  const [filteredEpisodes, setFilteredEpisodes] = useState(episodes);

  return (
    <div className="space-y-5">
      <SearchBox episodes={episodes} onFilteredEpisodes={setFilteredEpisodes} />
      {filteredEpisodes.length > 0 ? (
        <EpisodeList episodes={filteredEpisodes} />
      ) : (
        <div className="rounded-[2rem] border border-dashed border-line bg-white/86 px-6 py-10 text-center shadow-[0_16px_44px_rgba(31,37,40,0.05)]">
          <h3 className="font-serif text-2xl text-ink">No episodes matched that search.</h3>
          <p className="mt-2 text-base leading-7 text-ink/68">
            Try a title keyword, part of the description, or an episode number.
          </p>
        </div>
      )}
    </div>
  );
}
