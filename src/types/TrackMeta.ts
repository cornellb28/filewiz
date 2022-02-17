// Interface always has to be an object
// Interface can't become an array
export type TrackMeta = {
  trackId: string;
  cover: string;
  userDefinedUrl: {}[];
  location: string;
  folderPathRoot: string;
  title: TrackTitle;
  artist: Artists;
  genre: string[];
  contentGroup: string[];
  year: string;
  initialKey: string;
  userDefinedText: UserDefinedText[];
  bpm: string;
  image: Image;
  publisher: string[];
  comment: Comment;
  composer: string[];
  remixArtist: string[];
  album: string;
  length: string;
  popularimeter: Ratings;
  favorite: boolean;
  SampleInfo: Samples;
  artistUrl: string[];
}[];

export type Image = { mime: string; imageBuffer: Buffer };
export type UserDefinedText = { description: string; value: string };
export type Artists = { performerInfo: string; features: string[] };
export type TrackTitle = { name: string; version: string };
export type Comment = {
  language: string;
  shortText: undefined | string;
  text: string[];
};
export type Ratings = { ratings: number };
export type Samples = { sample_artist: string; sample_title: string };
