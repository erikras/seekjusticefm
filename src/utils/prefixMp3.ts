const prefixes = ['dts.podtrac.com/redirect.mp3/', 'chtbl.com/track/9DG54/']

export const prefixMp3 = (file: string) =>
  `https://${prefixes.reduce(
    (result, prefix) => `${prefix}${result}`,
    `happyhour.fm/media/${file}`,
  )}`
