import { glob } from "glob";
import fse, { readdir, lstatSync } from "fs-extra";
import NodeID3 from "node-id3";
import uniqid from "uniqid";
import trackMeta, { FoldeViewModel } from "../src/types";
import { sep } from "path";
import { isArray, isEmpty } from "lodash";

interface NewTags {
  file: string;
  tags: NodeID3.Tags | null;
}

// This helps to scan the directory and seperate the folders and files
export const scanDirectoryV1 = async (dir: string) => {
  // breakdown the folders structure
  let { folder, files }: FoldeViewModel = { folder: [], files: [] };

  // read the directory to get pathnames for folder and files
  const namedFolder = await readdir(dir);

  // loop through each folder of file
  namedFolder.map(async (fileName) => {
    const pathName: string = `${dir}${sep}${fileName}`;
    //console.log(pathName);
    // check to see if my path is a folder or file
    // if the path is a file not a directory
    try {
      if (!lstatSync(pathName).isDirectory()) {
        files.push(pathName);
      } else {
        // lets look for only the folders
        folder.push(pathName);
      }
    } catch (error) {
      console.log(error);
    }
  });
  return { folder, files };
};
// This function will scan the filePath and return the metadata from Nodeid3
export async function getMetaData(res: string) {
  let audioTracks: trackMeta[] = [];
  // Empty array to
  const folderStructure = await scanDirectoryV1(res); // returns { fo: string[]; fi: string[]; }

  // destructure to access each properties[]
  const { folder, files } = folderStructure;

  // Lets just grab all the files that was scanned
  async function getFilesMeta(files: string[]) {
    let mediaList: (NodeID3.Tags | null)[] = [];
    const options = { noRaw: true }; // no raw meta
    const pattern = "DS_Store"; // lets always remove those files that contains "DS_Store"
    const filesFilter = files.filter((str) => str.indexOf(pattern) === -1);

    filesFilter.forEach(async (file) => {
      const mediaTags = await new Promise<NodeID3.Tags | null>(
        (resolve, reject) => {
          NodeID3.read(file, options, async (err, tags) => {
            let isTagsEmpty = isEmpty(tags);
            if (isTagsEmpty) {
              let newtags: trackMeta = {
                trackId: uniqid("track_"),
                artist: "",
                title: "",
                location: file,
              };
              NodeID3.write(newtags, file);
            }
            resolve(tags);

            // let obj: Array<NewTags> = [
            //   {
            //     file: file,
            //     tags: tags,
            //   },
            // ];

            // let isTagsEmpty = isEmpty(tags);
            // let updatedFiles: Array<ID3["tags"]> = [];
          });
        }
      );
      console.log(mediaTags);
      //mediaList.push(mediaTags);
    });
  }

  getFilesMeta(files);
}
// const selectedFilePath = result.filePaths;
//       const scandDir = await scanDirectory(selectedFilePath);
//       // Lets create the var that will hold our new data
//       let audioTracks: trackMeta[] = [];

//       for (let audioPath of scandDir.slice(0, 50)) {
//         // set a promise that resolve the promise if tags exist //
//         const tags = await new Promise<NodeID3.Tags | null>(
//           (resolve, reject) => {
//             NodeID3.read(audioPath, { noRaw: true }, (err, tags) => {
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