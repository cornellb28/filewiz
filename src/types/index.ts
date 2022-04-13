import NodeID3 from "node-id3";

// Interface can't become an array
interface trackMeta {
  trackId: string;
  size: number;
  filename: string;
  folderPath: string;
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
  label: string | null;
  year: string | null;
  imageCover: {
    cover100: string | null;
    cover50: string | null;
    cover35: string | null;
  } | null;
  comment: { text: string | null };
};

export default trackMeta;
