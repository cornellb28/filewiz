declare module "global" {
  export interface Window {
    fileApp: {
      notificationApi: string;
      // type generics -- returning a promise that will be a
      getDirectoryRoot: () => Promise<string[]>;
      getNames: () => string[];
      addArtist: (name: string) => void;
    };
  }
}

//* https://www.reddit.com/r/typescript/comments/hly19w/help_me_understand_dts_files/  *//
//*  https://stackoverflow.com/questions/12703266/how-to-handle-warnings-for-proprietary-custom-properties-of-built-in-objects-in/12703866#12703866 *//
//* https://mariusschulz.com/blog/declaring-global-variables-in-typescript *//
