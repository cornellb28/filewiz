// Interface always has to be an object
// Interface can't become an array
interface trackMeta {
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
  mediaType?: string;
  size?: string;
  comment?: {
    language: string;
    text: string;
  };
  image?: ImageMeta;
  composer?: string;
  remixArtist?: string;
  album?: string;
  length?: string;
  favorite?: boolean;
  fileType?: string;
}

type ImageMeta =
  | string
  | {
      mime: string;
      imageBuffer: Buffer;
    };
export type FoldeViewModel = {
  fo: string[];
  fi: string[];
};

export default trackMeta;
