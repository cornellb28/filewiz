import NodeID3 from "node-id3";
import sharp from "sharp";
import fse from "fs-extra";
import trackMeta from "../src/types";
import { trackConversion, saveFiles } from "../utils/track";
import { groupBy, pick } from "lodash";
import { ConvertedData } from "../utils/track";
import path from "path";
import { Buffer } from "buffer";
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

      for (let file of files.slice(0, 100)) {
        // Grabbed the folder Name
        const folderPath = path.dirname(file); // /Volumes/MUSICLITE/CAPITALRECORDS/90s/_Afrobeat
        const filePathRelative = file.replace(res, "");
        const mainFolder = filePathRelative.split(path.sep).filter(Boolean)[0]; // 90s
        const subFolder = filePathRelative.split(path.sep).filter(Boolean)[1]; // _Afrobeat
        const filename = path.basename(file); // 02 When A Fire Starts To Burn.mp3
        const fileType = fse.lstatSync(file).isDirectory() ? "folder" : "file"; // Folder || File
        const size = fse.lstatSync(file).size;
        const tags = await ID3Scan(file); // returns {tags}
        const pulledMetaData = pick(tags, defaultTags); // picking certain tags that I need
        const { image, comment } = pulledMetaData;

        //console.log(subFolder);

        if (typeof image === "undefined" || typeof image === "string") continue;
        if (typeof comment === "undefined") continue;
        if (tags === null) continue;

        // If we do have both images and comments
        const { imageBuffer, mime } = image;
        const { text } = comment;

        const track = trackConversion({
          folderPath,
          mainFolder,
          subFolder,
          filename,
          fileType,
          tags,
          size,
          filePath: file,
        });
        // convert the buffer to a base64
        let dataImageLarge = sharp(Buffer.from(imageBuffer)).resize(100);
        // let dataImageMedium = sharp(Buffer.from(imageBuffer)).resize(50);
        // let dataImageSmall = sharp(Buffer.from(imageBuffer)).resize(35);
        // let dataMime: ImageType = mime.split("/")[1].toLowerCase();
        const coverBuffer = await dataImageLarge.jpeg({ quality: 100 }).toBuffer();

        //const cover = `data:image/jpeg;base64,` + dataImageLarge.threshold();
        //console.log(cover);
        array.push(track);
      }
      const groupedArray = groupBy(array, "mainFolder");
      let jsonPath = path.join(process.cwd(), "database", "db.json");
      const jsonFILE = JSON.stringify(groupedArray);
      // push this to the database
      saveFiles(jsonPath, jsonFILE);
    }
  );
}

////-----------------------------------------------------///

// Resoureces
// https://stackoverflow.com/questions/25469244/how-can-i-define-an-interface-for-an-array-of-objects
// https://stackoverflow.com/questions/15630770/node-js-check-if-path-is-file-or-directory
