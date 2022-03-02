// Interface always has to be an object
// Interface can't become an array
export type trackMeta = {
  trackId: string;
  location?: string;
  title?: string;
  artist?: string;
  genre?: string;
  contentGroup?: string;
  year?: string;
  initialKey?: string;
  bpm?: string;
  publisher?: string;
  trackComments?:
    | string
    | {
        language: string;
        text: string;
      };
  trackCover?: ImageMeta;
  composer?: string;
  remixArtist?: string;
  album?: string;
  trackLength?: string;
  favorite?: boolean;
  fileType?: string;
};

type ImageMeta =
  | string
  | {
      mime: string;
      type: {
        id: number;
        name: string;
      };
      description: string;
      imageBuffer: Buffer;
    };
