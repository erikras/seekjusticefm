import type { Episode } from '../lib/episodes';

type Props = { episode: Episode };

export default function ShowNotes({ episode }: Props) {
  if (!episode.body) {
    return <div>no content</div>;
  }

  return (
    <div className="w-full rounded-[2rem] border border-line/70 bg-white/95 p-6 shadow-[0_18px_50px_rgba(31,37,40,0.08)] sm:p-8">
      <div
        className="prose prose-lg max-w-none prose-headings:scroll-mt-24 prose-a:break-words"
        dangerouslySetInnerHTML={{ __html: episode.body }}
      />
    </div>
  );
}
