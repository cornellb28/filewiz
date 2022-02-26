// Interface always has to be an object
// Interface can't become an array
export type TrackMeta = {
  trackId: string;
  trackCover?: ImageMeta;
  userDefinedUrl: {}[];
  location: string;
  title?: TrackTitle;
  artist?: Artists;
  genre: string[];
  contentGroup: string[];
  year: string;
  initialKey: string;
  userDefinedText: UserDefinedText[];
  bpm: string;
  publisher: string[];
  trackComments: CommentMeta;
  composer: string[];
  remixArtist: string[];
  album: string;
  trackLength: string;
  favorite: boolean;
  SampleInfo: Samples;
  fileType: string;
}[];

export type ImageMeta = {
  mime: string | undefined;
  imageBuffer: Buffer | undefined;
  type: { id: number; name: string };
  description: string | undefined;
};
export type UserDefinedText = { description: string; value: string };
export type Artists = { artist: string; features: string[] };
export type TrackTitle = { name: string; version: string };
export type CommentMeta = {
  language: string;
  shortText: undefined | string;
  text: string[];
};
export type Ratings = { ratings: number };
export type Samples = { sample_artist: string; sample_title: string }[];
