import * as React from "react";
import { ListGroup } from "react-bootstrap";
import TrackMeta from "../types/TrackMeta";

const Folders = ({ filesData }: { filesData: TrackMeta }) => {
  //console.log(filesData);
  return (
    <ListGroup variant="flush">
      <ListGroup.Item>
        <i className="bx bxs-folder"></i>
        <span className="folder_name">90s</span>
        <span className="file_count">(3,000)</span>
      </ListGroup.Item>
    </ListGroup>
  );
};

export default Folders;
