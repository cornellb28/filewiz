import * as React from "react";
import { ListGroup } from "react-bootstrap";
import Folder from "../components/Folder";
import trackMeta from "../types/TrackMeta";

interface IState {
  filesData: trackMeta[];
}

const Folders = ({ filesData }: { filesData: IState }) => {
  console.log(filesData);
  return <ListGroup variant="flush">
    
  </ListGroup>;
};

export default Folders;
