import NodeID3 from "node-id3";

// Interface can't become an array
interface trackMeta {
  trackId: string;
  type: string;
  name: string;
  location: string;
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
  size: string;
  year: string;
  comment: { text: string };
  image: { mime: string; imageBuffer: Buffer };
};

export default trackMeta;
