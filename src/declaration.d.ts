declare module "*.jpg";
declare module "*.png";
declare module "*.svg";

declare module global {
  interface Window {
    fileApp: {
      // type generics -- returning a promise that will be a
      getDirectoryRoot: () => Promise<string[]>;
      getNames: () => string[];
      addArtist: (name: string) => void;
    };
  }
}
