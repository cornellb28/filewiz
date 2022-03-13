import { ReactChild, ReactChildren } from "react";
import { createContext, useReducer } from "react";
import scanFilesReducer, {
  intialState,
  IState,
} from "../reducers/scanFilesReducer";
import { IState as Props } from "../reducers/scanFilesReducer";
import trackMeta from "../types";

// Setting my props
interface AuxProps {
  children: ReactChild | ReactChildren;
  addFiles: (files: trackMeta[]) => void;
  removeFiles: (files: trackMeta[]) => void;
  editFiles: (files: trackMeta[]) => void;
}

export const FileContext = createContext(intialState);

export const FileProvider = ({ children }: AuxProps) => {
  const [state, dispatch] = useReducer(scanFilesReducer, intialState);

  const addFiles: AuxProps["addFiles"] = (file: trackMeta) => {};

  const removeFiles: AuxProps["removeFiles"] = (file) => {
    const updateFiles = state.files.concat(file);

    dispatch({
      type: "REMOVE_FILES",
      payload: {
        files: updateFiles,
      },
    });
  };
};

// https://stackoverflow.com/questions/53688899/typescript-and-react-children-type
