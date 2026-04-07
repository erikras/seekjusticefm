import { ListenLink } from './ListenLink';
import { links } from './links';

export default function Listen() {
  return (
    <aside className="rounded-[2rem] border border-line/80 bg-white/75 p-5 shadow-[0_22px_60px_rgba(31,37,40,0.08)] backdrop-blur">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-brand-dark/70">
        Listen On
      </p>
      <h2 className="font-serif text-2xl text-ink">Subscribe Anywhere</h2>
      <p className="mb-5 mt-2 text-sm leading-6 text-ink/70">
        Follow the show in the podcast app you already use.
      </p>
      <div className="space-y-3">
        {links.map((link) => (
          <ListenLink key={link.text} {...link} />
        ))}
      </div>
    </aside>
  );
}
