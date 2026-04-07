export interface ListenLinkProps {
  src: string;
  href: string;
  text: string;
}

export function ListenLink({ src, href, text }: ListenLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 rounded-2xl border border-line/80 bg-white/85 px-4 py-3 text-sm font-semibold text-ink shadow-[0_12px_30px_rgba(31,37,40,0.06)] transition-all duration-150 hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-[0_20px_36px_rgba(31,37,40,0.12)]"
    >
      <img
        src={`/listen/${src}`}
        width="40"
        height="40"
        className="rounded-xl shadow-sm"
        alt={text}
      />
      <span className="transition-colors duration-150 group-hover:text-brand-dark">
        {text}
      </span>
    </a>
  );
}
