import trackMeta from "../types";

export interface IState {
  numberOfFiles: number;
  files: trackMeta[];
  isLoading: boolean;
  error: "";
  isScanCompleted: boolean;
}

export const intialState: IState = {
  numberOfFiles: 0,
  files: [],
  isLoading: false,
  isScanCompleted: false,
  error: "",
};

const scanFilesReducer = (
  state: IState,
  action: { type: string; payload: trackMeta[] }
) => {
  const { type, payload } = action;

  switch (type) {
    case "SCAN_FILES":
      return {
        ...state,
        isLoading: true,
        error: "",
      };
    case "SCAN_SUCCESS":
      return {
        ...state,
        isScanCompleted: true,
        isLoading: false,
      };
    case "SCAN_ERROR":
      return {
        ...state,
        error: "Cancelled Scan",
        isLoading: false,
        files: [],
      };
    default:
      return state;
  }
};

export default scanFilesReducer;

// https://www.youtube.com/watch?v=9KzQ9xFSAEU&t=309s
