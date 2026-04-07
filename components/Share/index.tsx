'use client';

import * as React from 'react';
import * as qs from 'qs';
import FacebookIcon from '../icons/FacebookIcon';
import CheckIcon from '../icons/CheckIcon';
import CopyIcon from '../icons/CopyIcon';
import TwitterIcon from '../icons/TwitterIcon';
import { copyToClipboard } from './copyToClipboard';
import { windowPopup } from './windowPopup';

export interface ShareRowProps {
  title?: string;
  description?: string;
  url?: string;
  author?: string;
}

function truncateDescription(description: string, maxLength = 88) {
  if (description.length <= maxLength) {
    return description;
  }

  const truncated = description.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  return `${truncated.slice(0, lastSpace > 0 ? lastSpace : maxLength)}...`;
}

export default function Share({
  title,
  description,
  url,
  author,
}: ShareRowProps) {
  const [didCopy, setDidCopy] = React.useState(false);
  const shareUrl =
    url || (typeof window !== 'undefined' ? window.location.href : '');
  const shareText = description
    ? `${title} - ${truncateDescription(description)}`
    : title;
  const twitterUrl = `https://twitter.com/intent/tweet?${qs.stringify({
    text: shareText,
    url: shareUrl,
    via: author,
  })}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?${qs.stringify(
    {
      u: shareUrl,
    }
  )}`;

  const handleShare = (href: string) => () => {
    windowPopup(href, 540, 320);
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        onClick={handleShare(twitterUrl)}
        className="inline-flex items-center gap-2 rounded-full bg-[#1d9bf0] px-4 py-2 text-sm font-semibold text-white transition-transform duration-150 hover:-translate-y-0.5 hover:bg-[#198cd8]"
        type="button"
      >
        <TwitterIcon className="h-4 w-4" />
        Tweet
      </button>

      <button
        onClick={handleShare(facebookUrl)}
        className="inline-flex items-center gap-2 rounded-full bg-[#4267b2] px-4 py-2 text-sm font-semibold text-white transition-transform duration-150 hover:-translate-y-0.5 hover:bg-[#365899]"
        type="button"
      >
        <FacebookIcon className="h-4 w-4" />
        Share
      </button>

      <button
        onClick={() => {
          copyToClipboard(shareUrl);
          setDidCopy(true);
        }}
        className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-white/80 px-4 py-2 text-sm font-semibold text-ink transition-transform duration-150 hover:-translate-y-0.5 hover:border-brand/50 hover:bg-white"
        type="button"
      >
        {didCopy ? (
          <>
            <CheckIcon className="h-4 w-4" />
            Copied
          </>
        ) : (
          <>
            <CopyIcon className="h-4 w-4" />
            Copy Link
          </>
        )}
      </button>
    </div>
  );
}
