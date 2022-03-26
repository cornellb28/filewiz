import NodeID3 from "node-id3";

// Interface can't become an array
interface trackMeta {
  trackId: string;
  type: string;
  size: number;
  extension: string;
  filename: string;
  filePath: string;
  mainFolder: string;
  subFolder: string;
  children: Meta[];
}

type Meta = {
  title: string;
  artist: string;
  bpm: string;
  contentGroup: string;
  genre: string;
  remixArtist: string;
  composer: string;
  initialKey: string;
  publisher: string;
  year: string;
  imageCover: {
    imageLarge: string;
    imageMedium: string;
    imageSmall: string;
  };
  comment: string;
};

export default trackMeta;
