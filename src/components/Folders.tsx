import * as React from "react";
import { useState } from "react";
import { ListGroup } from "react-bootstrap";
import Folder from "../components/Folder";
import { AppState as Props } from "../App";
import * as path from "path";

interface IProps {
  filesData: Props["filesData"];
  setFilesData: Props["setFilesData"];
}

type LocationType = {
  location: string[];
};

const Folders = ({ filesData, setFilesData }: IProps) => {
  const [folderName, setFolderName] = useState<string>("");
  const [fileLength, setFileLength] = useState<number | null>(null);

  // const folderPathName = filesData.map((name) => {
  //   // Had to remove the first empty index so no bugs on indexing
  //   // @ts-ignore
  //   const location: LocationType["location"] = name.location
  //     .split("/")
  //     .filter((e) => e);
  // });

  return (
    <ListGroup variant="flush">
      <Folder />
    </ListGroup>
  );
};

export default Folders;

// Resources
// https://github.com/leighhalliday/reduce-example/blob/master/index.js
// https://flaviocopes.com/typescript-object-destructuring/
// https://stackoverflow.com/questions/281264/remove-empty-elements-from-an-array-in-javascript
