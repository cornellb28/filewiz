import * as React from "react";
import { ListGroup } from "react-bootstrap";
import { trackMeta } from "../types/TrackMeta";

const Folders = () => {
  return (
    <ListGroup.Item>
      <i className="bx bxs-folder"></i>
      <span className="folder_name">90s</span>
      <span className="file_count">(3,000)</span>
    </ListGroup.Item>
  );
};

export default Folders;
