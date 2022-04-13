import uniqid from "uniqid";
import NodeID3 from "node-id3";
import { Buffer } from "buffer";
import sharp from "sharp";
import trackMeta from "../src/types";
import { outputJson, readJson } from "fs-extra";

type IMAGE = {
  cover100: string;
  cover50: string;
  cover35: string;
};

export interface ConvertedData {
  metaData: Partial<NodeID3.Tags>;
  filename: string;
  selectedFolder: string | undefined;
  subFolder: string;
  size: number;
  filePath: string;
}

export function trackConversion(data: ConvertedData): trackMeta {
  return {
    trackId: uniqid("track_"),
    size: data.size,
    folderPath: data.selectedFolder ? data.selectedFolder : "",
    subFolder: data.subFolder,
    filename: data.filename,
    filePath: data.filePath,
    children: [
      {
        title: data.metaData.title ? data.metaData.title : "",
        artist: data.metaData.artist ? data.metaData.artist : "",
        bpm: data.metaData.bpm ? data.metaData.bpm : "",
        remixArtist: data.metaData.remixArtist ? data.metaData.remixArtist : "",
        composer: data.metaData.composer ? data.metaData.composer : "",
        contentGroup: data.metaData.contentGroup
          ? data.metaData.contentGroup
          : "",
        initialKey: data.metaData.initialKey ? data.metaData.initialKey : "",
        label: data.metaData.publisher ? data.metaData.publisher : "",
        year: data.metaData.year ? data.metaData.year : "",
        genre: data.metaData.genre ? data.metaData.genre : "",
        imageCover: null,
        comment: {
          text: data.metaData.comment?.text ? data.metaData.comment?.text : "",
        },
      },
    ],
  };
}

export async function imageSrc(buffer: Buffer, size: number) {
  const img = await sharp(Buffer.from(buffer)).resize(size).toBuffer();
  const convert = new TextDecoder("utf-8").decode(img);
  const image = `data:image/jpeg;base64,` + convert;
  return image;
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

module.exports = { trackConversion, saveFiles, imageSrc };
