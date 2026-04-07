# Seek Justice

## [seekjustice.fm](https://seekjustice.fm)

[![Art](public/art.jpg)](https://seekjustice.fm)

## Development

- `pnpm install`
- `pnpm generate-media-manifest`
- `pnpm test`
- `pnpm build`

## Cloudflare deployment

- Production deploys run from `.github/workflows/deploy-cloudflare.yml` on every push to `master`.
- Add these GitHub repository secrets before the first deploy:
- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_API_TOKEN`
- The Cloudflare token only needs permission to deploy Pages.
- Attach both `seekjustice.fm` and `www.seekjustice.fm` to the Pages project.
- Configure the Pages project to serve the `out` directory.

## Audio hosting

- Audio source files remain committed in `public/media`.
- Cloudflare Pages cannot serve these MP3s directly because each file exceeds the 25 MiB Pages asset limit.
- Upload the archive to R2 with `pnpm upload-audio-to-r2`.
- Point `media.seekjustice.fm` at the R2 bucket and keep `public/_redirects` in place so `https://seekjustice.fm/media/<episode>.mp3` continues to work.

## Content publishing

- Add or edit show notes in `content/<episode>.md`.
- Keep episode numbers and filenames zero-padded, for example `024.md`.
- Regenerate `data/media-manifest.json` after changing MP3 files with `pnpm generate-media-manifest`.
- Rebuild RSS with `pnpm generate-rss` when episode metadata changes outside the normal build flow.
