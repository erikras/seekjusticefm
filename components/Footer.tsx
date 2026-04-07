import EmailIcon from './icons/EmailIcon';
import FacebookIcon from './icons/FacebookIcon';
import TwitterIcon from './icons/TwitterIcon';
import YouTubeIcon from './icons/YouTubeIcon';

export default function Footer() {
  return (
    <footer className="rounded-[2rem] border border-line/70 bg-white/80 px-6 py-8 shadow-[0_18px_50px_rgba(31,37,40,0.08)]">
      <div className="flex flex-col items-center gap-6 text-center">
        <a
          href="mailto:seekjusticefm@gmail.com?subject=Sponsorship"
          className="inline-flex items-center gap-3 rounded-full bg-brand-dark px-5 py-3 text-sm font-semibold text-white transition-transform duration-150 hover:-translate-y-0.5 hover:bg-[#3f2419]"
        >
          <EmailIcon className="h-5 w-5" />
          Become a Sponsor
        </a>

        <div className="flex flex-wrap justify-center gap-3 text-sm font-semibold">
          <a
            href="https://twitter.com/seekjusticefm"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-2 text-ink transition-colors duration-150 hover:border-brand/40 hover:text-brand-dark"
          >
            <TwitterIcon className="h-4 w-4" />
            Twitter
          </a>
          <a
            href="https://www.facebook.com/Seek-Justice-Podcast-328689404657995/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-2 text-ink transition-colors duration-150 hover:border-brand/40 hover:text-brand-dark"
          >
            <FacebookIcon className="h-4 w-4" />
            Facebook
          </a>
          <a
            href="https://www.youtube.com/channel/UCSA6n805m_RP2BQiTvZcbxA/videos"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-2 text-ink transition-colors duration-150 hover:border-brand/40 hover:text-brand-dark"
          >
            <YouTubeIcon className="h-4 w-4" />
            YouTube
          </a>
          <a
            href="mailto:seekjusticefm@gmail.com"
            className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-2 text-ink transition-colors duration-150 hover:border-brand/40 hover:text-brand-dark"
          >
            <EmailIcon className="h-4 w-4" />
            Email
          </a>
        </div>

        <p className="text-sm text-ink/65">
          © Copyright {new Date().getFullYear()} - Seek Justice
        </p>
      </div>
    </footer>
  );
}
