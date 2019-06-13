// export interface Post {
//   body: string
//   id: number
//   title: string
// }
export interface Episode {
  frontmatter: FMType
  body: any
}
export type FMType = {
  title: string
  mp3URL: string
  download: string
  date: string
  art: string
  description: string
  episodeType?: 'full' | 'trailer' | 'bonus'
  episode?: number
  season?: number
  slug?: string
  youtube?: string
}
