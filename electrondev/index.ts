import NodeID3 from "node-id3";
import sharp from "sharp";
import fse from "fs-extra";
import trackMeta from "../src/types";
import { trackConversion } from "../utils/track";
import { pick } from "lodash";
import path from "path";
import { ID3Scan, scanSelectedFiles, scanSelectedDir } from "../utils/index";

////-----------------------------------------------------///
export async function getMetaData(res: string) {
  await Promise.all([scanSelectedDir(res), scanSelectedFiles(res)]).then(
    async (values) => {
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
      const [folders, files] = values;
      const array: trackMeta[] = [];

      for (let file of files.slice(0, 50)) {
        // Grabbed the folder Name
        const filePath = path.dirname(file); // /Volumes/MUSICLITE/CAPITALRECORDS/90s/_Afrobeat
        const mainFolder = file.split(path.sep).filter(Boolean)[3]; // 90s
        const subFolder = file.split(path.sep).filter(Boolean)[4]; // _Afrobeat
        const filename = path.basename(file); // 02 When A Fire Starts To Burn.mp3
        const fileType = (a: string) =>
          fse.lstatSync(a).isDirectory() ? "folder" : "file"; // Folder || File

        const convertAudio = await ID3Scan(file); // returns {tags}
        const pulledMetaData = pick(convertAudio, defaultTags); // picking certain tags that I need
        const { image, comment } = pulledMetaData;

        if (typeof image === "undefined" || typeof image === "string") continue;
        if (typeof comment === "undefined") continue;

        let newImage = {
          imageLarge: null,
          imageMedium: null,
          imageSmall: null,
          default: null,
        };
        let newComment = "";

        // If we do have both images and comments
        const { imageBuffer, mime } = image;
        const { text } = comment;

        type ImageType = string;
        // convert the buffer to a base64
        let dataImageLarge = sharp(Buffer.from(imageBuffer)).resize(100);
        let dataImageMedium = sharp(Buffer.from(imageBuffer)).resize(50);
        let dataImageSmall = sharp(Buffer.from(imageBuffer)).resize(35);
        let dataMime: ImageType = mime.split("/")[1].toLowerCase();

        //const cover = `data:image/jpeg;base64,` + coverBuffer.toString("base64");

        // let track = trackConversion(
        //   pulledMetaData,
        //   file,
        //   isFolder,
        //   filename,
        //   mainFolder,
        //   subFolder
        // );
        // array.push("");
      }
    }
  );
}

////-----------------------------------------------------///

// Resoureces
// https://stackoverflow.com/questions/25469244/how-can-i-define-an-interface-for-an-array-of-objects
// https://stackoverflow.com/questions/15630770/node-js-check-if-path-is-file-or-directory
