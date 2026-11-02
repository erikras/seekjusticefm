export const title = 'Seek Justice';
export const description =
  'A weekly deep dive into Criminal Justice with Erik Rasmussen and Dennis Schrantz';
export const homeTitle = 'Seek Justice – A Criminal Justice Reform Podcast';
export const homeDescription =
  'Seek Justice is a criminal justice reform podcast with Erik Rasmussen and Dennis Schrantz, taking deep dives into prisons, sentencing, reentry, policing, and policy.';
export const url = 'https://seekjustice.fm';
export const rssURL = `${url}/rss.xml`;
// <link rel="alternate"> for feed autodiscovery. Pages that set their own
// `alternates` (for canonical) replace the layout's, so they spread this in.
export const feedAlternateTypes = {
  'application/rss+xml': [{ url: rssURL, title: 'Seek Justice' }],
};
export const defaultImage = `${url}/art.jpg`;
export const applePodcastsURL =
  'https://podcasts.apple.com/us/podcast/seek-justice/id1457318833';
export const spotifyURL = 'https://open.spotify.com/show/5YMjx8eThZzMsz17Icw7Vz';
export const ghURL = 'https://github.com/erikras/seekjusticefm';
export const shareHandle = 'seekjusticefm';
export const gtmId = 'GTM-TW93497';

export const author = {
  name: 'Erik Rasmussen and Dennis Schrantz',
  email: 'seekjusticefm@gmail.com',
  link: url,
} as const;

export const rssKeywords = [
  'Criminal Justice',
  'Crime',
  'Prison',
  'Reform',
  'Police',
  'Jail',
  'Justice',
  'Politics',
] as const;
