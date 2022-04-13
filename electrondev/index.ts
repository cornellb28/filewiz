import NodeID3 from "node-id3";
import fse from "fs-extra";
import trackMeta from "../src/types";
import { trackConversion, saveFiles, imageSrc } from "../utils/track";
import { groupBy, pick, pull } from "lodash";
import { ConvertedData } from "../utils/track";
import path from "path";
import { Buffer } from "buffer";
import { ID3Scan, scanSelectedFiles, scanSelectedDir } from "../utils/index";

////-----------------------------------------------------///
export async function getMetaData(res: string) {
  const rootPath = res; // /Volumes/MUSICLITE/CAPITALRECORDS/90s
  const selectedFolder = rootPath.trim().split("/").filter(Boolean).at(-1); // selectedFolder Ex. 90s

  // Lets grab the whole folder files
  const tracks = await scanSelectedFiles(res);

  let arrayofTracks: trackMeta[] = [];

  const defaultTags = [
    "title",
    "artist",
    "bpm",
    "genre",
    "label",
    "image",
    "initialKey",
    "year",
    "length",
    "contentGroup",
    "publisher",
    "comment",
    "remixArtist",
    "composer",
  ];

  for (let track of tracks.slice(0, 50)) {
    // Grabbing the track structure
    const filename = path.basename(track);
    const filePathRelative = track.replace(res, "");
    const subFolder = filePathRelative.split(path.sep).filter(Boolean)[0];
    const size = fse.lstatSync(track).size;
    const tags = await ID3Scan(track);
    const metaData = pick(tags, defaultTags);
    const { image, comment } = metaData;

    if (typeof image === "undefined" || typeof image === "string") continue;
    if (typeof comment === "undefined") continue;

    const { text } = comment;
    const { imageBuffer } = image;
    // let cover100 = await imageSrc(imageBuffer, 100);
    // let cover50 = await imageSrc(imageBuffer, 50);
    // let cover35 = await imageSrc(imageBuffer, 35);

    // const imageSize = {
    //   cover100,
    //   cover50,
    //   cover35,
    // };

    const newTrack = trackConversion({
      selectedFolder,
      subFolder,
      filename,
      metaData,
      size,
      filePath: track,
    });

    arrayofTracks.push(newTrack);
  }

  console.log(arrayofTracks);
}

////-----------------------------------------------------///

// Resoureces
// https://stackoverflow.com/questions/25469244/how-can-i-define-an-interface-for-an-array-of-objects
// https://stackoverflow.com/questions/15630770/node-js-check-if-path-is-file-or-directory
