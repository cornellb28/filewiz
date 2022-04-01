import uniqid from "uniqid";
import NodeID3 from "node-id3";
import trackMeta from "../src/types";
import { outputJson, readJson } from "fs-extra";

export interface ConvertedData {
  tags: Partial<NodeID3.Tags>;
  folderPath: string;
  filename: string;
  mainFolder: string;
  subFolder: string;
  size: number;
  fileType: string;
  filePath: string;
}

export function trackConversion(data: ConvertedData): trackMeta {
  return {
    trackId: uniqid("track_"),
    size: data.size,
    folderPath: data.folderPath,
    mainFolder: data.mainFolder,
    subFolder: data.subFolder,
    fileType: data.fileType,
    filename: data.filename,
    filePath: data.filePath,
    children: [
      {
        title: data.tags.title ? data.tags.title : "",
        artist: data.tags.artist ? data.tags.artist : "",
        bpm: data.tags.bpm ? data.tags.bpm : "",
        remixArtist: data.tags.remixArtist ? data.tags.remixArtist : "",
        composer: data.tags.composer ? data.tags.composer : "",
        contentGroup: data.tags.contentGroup ? data.tags.contentGroup : "",
        initialKey: data.tags.initialKey ? data.tags.initialKey : "",
        publisher: data.tags.publisher ? data.tags.publisher : "",
        year: data.tags.year ? data.tags.year : "",
        genre: data.tags.genre ? data.tags.genre : "",
        imageCover: null,
        comment: {
          text: data.tags.comment?.text ? data.tags.comment?.text : "",
        },
      },
    ],
  };
}

export async function saveFiles(filePath: string, content: {}) {
  try {
    await outputJson(filePath, content);
    const data = await readJson(filePath);
    console.log("JSON written successfully with Promises!");
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

module.exports = { trackConversion, saveFiles };
