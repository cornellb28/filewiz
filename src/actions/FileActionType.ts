import { trackMeta } from "../types/TrackMeta";

export const FILES_LOADING = "FILES_LOADING";
export const FILES_FAILED = "FILES_FAILED";
export const FILES_SUCCESS = "FILES_SUCCESS";

type FileMeta = {
  filedata: trackMeta[];
};

export interface FileLoading {
  type: typeof FILES_LOADING;
}

export interface FileFailed {
  type: typeof FILES_FAILED;
}

export interface FileSuccess {
  type: typeof FILES_SUCCESS;
  payload: FileMeta;
}

export type FileDispatchType = FileLoading | FileFailed | FileSuccess;
