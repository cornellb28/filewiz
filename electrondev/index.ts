import { glob } from "glob";
import NodeID3 from "node-id3";
import uniqid from "uniqid";
import trackMeta, { FoldeViewModel } from "../src/types";
import { pick } from "lodash";

// Lets get the meta-tags with Nodeid-3
async function ID3Scan(path: string) {
  return await new Promise<NodeID3.Tags | null>((resolve, reject) => {
    NodeID3.read(path, { noRaw: true }, (err, tags) => {
      try {
        resolve(tags);
      } catch (error) {
        reject(err);
      }
    });
  });
}

// Scan for directories
const scanSelectedDir = async (dir: string) => {
  return new Promise<string[]>((resolve, reject) => {
    glob(`${dir}/**/`, (err, folders) => {
      resolve(folders);
    });
  });
};
// Scan for files
const scanSelectedFiles = async (dir: string) => {
  return new Promise<string[]>((resolve, reject) => {
    glob(`${dir}/**/*.mp3`, (err, files) => {
      resolve(files);
    });
  });
};

export async function getMetaData(res: string) {
  let filesTags = [];
  await Promise.all([scanSelectedDir(res), scanSelectedFiles(res)]).then(
    async (values) => {
      const [folders, files] = values;
      const defaultTags = ["title", "artist", "bpm", "genre", "label"];
      for (let file of files) {
        const convertedTag = await ID3Scan(file);
        const pullData = pick(convertedTag, defaultTags);
        console.log(pullData);
      }
    }
  );
}

// const selectedFilePath = result.filePaths;
//       const scandDir = await scanDir(selectedFilePath);
//       // Lets create the var that will hold our new data
//       let audioTracks: trackMeta[] = [];

//       for (let audioPath of scandDir.slice(0, 50)) {
//         console.log(audioPath)
//         // set a promise that resolve the promise if tags exist //
//         const tags = await new Promise<NodeID3.Tags | null>(
//           (resolve, reject) => {
//             NodeID3.read(audioPath, { noRaw: true }, (err, tags) => {
//               let newObj = {
//                 trackId: uniqid('track_'),
//                 ...tags
//               }
//               // early exit
//               if (err) {
//                 console.log("nodeid-3 had an issue", err);
//                 reject(err);
//               }
//               resolve(tags);
//             });
//           }
//         );

//         // early exit
//         if (tags === null) continue; // tags does not exist move on to the next audio file

//         let audioObject: trackMeta = {
//           trackId: uniqid("track_"),
//           location: audioPath,
//           favorite: false,
//           artist: tags.artist,
//           fileType: tags.fileType,
//           year: tags.year,
//           genre: tags.genre,
//           initialKey: tags.initialKey,
//           length: tags.length,
//           bpm: tags.bpm,
//           title: tags.title,
//           contentGroup: tags.contentGroup,
//           publisher: tags.publisher,
//           composer: tags.composer,
//           remixArtist: tags.remixArtist,
//           album: tags.album,
//           image: tags.image,
//           comment: tags.comment,
//         };
//         // I need to deconstruct these two so I can conver the image Buffer for image src
//         // jsut need comment text
//         const { image, comment } = audioObject;

//         if (typeof image === "undefined" || typeof image === "string") continue;

//         const { imageBuffer } = image;

//         let dataImageLarge = sharp(Buffer.from(imageBuffer)).resize(100);
//         // let dataImageMedium = sharp(Buffer.from(imageBuffer)).resize(50)
//         // let dataImageSmall = sharp(Buffer.from(imageBuffer)).resize(35)
//         // let dataMime = mime.split('/')[1].toLowerCase()
//         // await dataImage.toFile(`..covers/record-${id}.${dataMime}`)

//         //const data = JSON.stringify(audioObject);

//         const coverBuffer = await dataImageLarge
//           .jpeg({ quality: 100 })
//           .toBuffer();
//         // const updatedFile = _.omit(audioObject, ["image", "comment"]);
//         //const cover = `data:image/jpeg;base64,` + coverBuffer.toString("base64");
//         audioTracks.push({ ...audioObject });
//       }
//       return audioTracks;
//     }),

// let newTrack: trackMeta[] = {
//   trackId: uniqid("track_"),
//   location: file,
//   favorite: false,
//   artist: tags?.artist ? tags.artist : "",
//   fileType: tags?.fileType ? tags.fileType : "",
//   year: tags?.year ? tags.year : "",
//   genre: tags?.genre ? tags.genre : "",
//   initialKey: tags?.initialKey ? tags.initialKey : "",
//   length: tags?.length ? tags.length : "",
//   bpm: tags?.bpm ? tags.bpm : "",
//   title: tags?.title ? tags.title : "",
//   contentGroup: tags?.contentGroup ? tags.contentGroup : "",
//   publisher: tags?.publisher ? tags.publisher : "",
//   composer: tags?.composer ? tags.composer : "",
//   remixArtist: tags?.remixArtist ? tags.remixArtist : "",
//   album: tags?.album ? tags.album : "",
//   image: tags?.image ? tags.image : "",
//   comment: tags?.comment ? tags.comment : "",
// };

// Resoureces
// https://stackoverflow.com/questions/25469244/how-can-i-define-an-interface-for-an-array-of-objects
