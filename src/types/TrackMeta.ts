// Interface always has to be an object
// Interface can't become an array
type trackMeta = {
  trackId?: string;
  trackCover?: ImageMeta;
  location?: string;
  title?: TrackTitle;
  artist?: Artists;
  genre?: string;
  contentGroup?: string;
  year?: string;
  initialKey?: string;
  bpm?: string;
  publisher?: string;
  trackComments?: CommentMeta;
  composer?: string;
  remixArtist?: string;
  album?: string;
  trackLength?: string;
  favorite?: boolean;
  SampleInfo?: Samples;
  fileType?: string;
};

export type ImageMeta = {
  mime?: string;
  imageBuffer?: Buffer;
  type: { id?: number; name?: string };
  description?: string;
};
export type UserDefinedText = { description: string; value: string };
export type Artists = { artist?: string; features?: string[] };
export type TrackTitle = { name?: string; version?: string };
export type CommentMeta = {
  language?: string;
  shortText?: undefined | string;
  text?: string[];
};
export type Ratings = { ratings: number };
export type Samples = { sample_artist: string; sample_title: string }[];

export default trackMeta;
