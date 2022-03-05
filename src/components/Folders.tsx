import * as React from "react";
import { useState } from "react";
import { ListGroup } from "react-bootstrap";
import Folder from "../components/Folder";
import { AppState as Props } from "../App";
import path from "path";
import trackMeta from "../types";

interface IProps {
  filesData: Props["filesData"];
  setFilesData: Props["setFilesData"];
}

type LocationType = {
  location?: string;
};

const Folders = ({ filesData, setFilesData }: IProps) => {
  const [folderName, setFolderName] = useState<string>("");
  const [fileLength, setFileLength] = useState<number | null>(null);

  const folderPathName = filesData.map((name) => {
    // https://flaviocopes.com/typescript-object-destructuring/
    const location: LocationType["location"] = name.location;
    console.log(location);
  });

  return (
    <ListGroup variant="flush">
      <Folder />
    </ListGroup>
  );
};

export default Folders;
