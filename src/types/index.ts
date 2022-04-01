import NodeID3 from "node-id3";

// Interface can't become an array
interface trackMeta {
  trackId: string;
  fileType: string;
  size: number;
  filename: string;
  folderPath: string;
  mainFolder: string;
  subFolder: string;
  children: Meta[];
  filePath: string;
}

type Meta = {
  title: string | null;
  artist: string | null;
  bpm: string | null;
  contentGroup: string | null;
  genre: string | null;
  remixArtist: string | null;
  composer: string | null;
  initialKey: string | null;
  publisher: string | null;
  year: string | null;
  imageCover: {
    imageLarge: string | null;
    imageMedium: string | null;
    imageSmall: string | null;
  } | null;
  comment: { text: string | null };
};

export default trackMeta;
