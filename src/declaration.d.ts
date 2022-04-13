declare module "*.jpg";
declare module "*.png";
declare module "*.svg";

export declare module global {
  type API = {
    // type generics -- returning a promise that will be a
    getDirectoryRoot: () => Promise<string[]>;
    getNames: () => string[];
    addArtist: (name: string) => void;
    sendNotification: () => void;
  };

  interface Window {
    fileApp: API;
  }
}
