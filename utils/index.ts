import { glob } from "glob";
import NodeID3 from "node-id3";

// Lets get the meta-tags with Nodeid-3
export const ID3Scan = async (path: string) => {
  return await new Promise<NodeID3.Tags | null>((resolve, reject) => {
    const options = { noRaw: true };
    NodeID3.read(path, options, (err, tags) => {
      try {
        resolve(tags);
      } catch (error) {
        reject(err);
      }
    });
  });
};

// Scan for directories
export const scanSelectedDir = async (dir: string) => {
  return new Promise<string[]>((resolve, reject) => {
    glob(`${dir}/**/`, (err, folders) => {
      resolve(folders);
    });
  });
};

// Scan for files
export const scanSelectedFiles = async (dir: string) => {
  return new Promise<string[]>((resolve, reject) => {
    glob(`${dir}/**/*.mp3`, (err, files) => {
      resolve(files);
    });
  });
};

module.exports = { ID3Scan, scanSelectedFiles, scanSelectedDir };
