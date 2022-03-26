import uniqid from "uniqid";
import NodeID3 from "node-id3";
import trackMeta from "../src/types";

interface ConvertedData {
  items: Partial<NodeID3.Tags>;
  filePath: string;
  type: string;
  extension: string;
  filename: string;
  mainFolder: string;
  subFolder: string;
  size: number;
}

export function trackConversion(data: ConvertedData): trackMeta {
  return {
    trackId: uniqid("track_"),
    size: data.size,
    filePath: data.filePath,
    extension: data.extension,
    mainFolder: data.mainFolder,
    subFolder: data.subFolder,
    fileType: data.type,
    filename: data.filename,
    children: [
      {
        title: data.items.title ? data.items.title : "",
        artist: data.items.artist ? data.items.artist : "",
        bpm: data.items.bpm ? data.items.bpm : "",
        remixArtist: data.items.remixArtist ? data.items.remixArtist : "",
        composer: data.items.composer ? data.items.composer : "",
        contentGroup: data.items.contentGroup ? data.items.contentGroup : "",
        initialKey: data.items.initialKey ? data.items.initialKey : "",
        publisher: data.items.publisher ? data.items.publisher : "",
        year: data.items.year ? data.items.year : "",
        genre: data.items.genre ? data.items.genre : "",
        imageCover: { imageLarge: "", imageMedium: "", imageSmall: "string" },
        comment: { text: data.items.comment },
      },
    ],
  };
}
