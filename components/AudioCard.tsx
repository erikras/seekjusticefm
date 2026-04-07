import AudioCard from 'audiocard';
import type { Episode } from '../lib/episodes';
import { prefixMp3 } from '../util/prefixMp3';

type Props = {
  episode: Episode;
  image?: string;
  linkToShowNotes?: boolean;
  autoPlay?: boolean;
};

export default function AudioCardComponent({
  episode,
  image,
  linkToShowNotes,
  autoPlay,
}: Props) {
  const audioUrl = prefixMp3(`${episode.frontmatter.slug}.mp3`);
  const imageUrl =
    image ||
    (episode.frontmatter.art ? `/${episode.frontmatter.art}` : '/art300.jpg');

  return (
    <div className="mb-6 w-full rounded-[1.75rem] border border-line/70 bg-white/90 p-4 shadow-[0_18px_50px_rgba(31,37,40,0.09)]">
      <AudioCard
        title={episode.frontmatter.title}
        art={imageUrl}
        source={audioUrl}
        autoplay={autoPlay}
        color="#b98552"
        background="#fffdfa"
        progressBarBackground="#eadfce"
        progressBarCompleteBackground="#b98552"
        skipBackSeconds={10}
        skipForwardSeconds={30}
        preload="none"
      />

      {linkToShowNotes ? (
        <div className="mt-4 text-center">
          <a
            href={`/${episode.frontmatter.slug}`}
            className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-4 py-2 text-sm font-semibold text-brand-dark transition-colors duration-150 hover:bg-brand/15"
          >
            Read Show Notes
          </a>
        </div>
      ) : null}
    </div>
  );
}
