import * as React from "react";
import { Container, Row } from "react-bootstrap";

const FileFilter = () => {
  return (
    <Container>
      <Row>
        <div className="mb-4 d-flex justify-content-end">
          <button className="btn-success btn float-right create-playlist">
            create playlist<i className="bx bxs-playlist"></i>
          </button>
        </div>
      </Row>
    </Container>
  );
};

export default FileFilter;
