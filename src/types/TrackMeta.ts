// Interface always has to be an object
// Interface can't become an array
export type TrackMeta = {
  trackId: string
  cover: string
  album: string
  genre: string
  title: string
  userDefinedUrl: {}[]
  year: string
  artist: string
  popularimeter: {}
  commentText: string
  location: string
  composer: string
  bpm: number
  initialKey: string
  folderPathRoot: string
}[]
