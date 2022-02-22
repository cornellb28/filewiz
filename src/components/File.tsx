import * as React from "react";
import { InputGroup, Card } from "react-bootstrap";
import { SideBarContext } from "../App";

const FileFooter: React.FC = () => {
  const { trackId, setTrackId } = React.useContext(SideBarContext);
  return (
    <Card.Footer>
      <section className="bottom-pane">
        <div className="d-flex flex-row justify-content-between">
          <div className="actions">
            <a href="#" onClick={() => setTrackId("abc")}>
              <i className="bx bxs-edit bx-xs"></i>
            </a>
            <a href="#">
              <i className="bx bx-folder-minus bx-xs"></i>
            </a>
            <a href="#">
              <i className="bx bx-move bx-xs"></i>
            </a>
          </div>
          <div className="path_link">
            <strong>path:</strong>
            <a className="folder" href="#">
              00s
            </a>
            <a href="#" className="reveal">
              show in finder
            </a>
          </div>
        </div>
      </section>
    </Card.Footer>
  );
};

const FileBody: React.FC = () => {
  return (
    <Card.Body>
      <section className="file-card-info d-flex">
        <div className="select">
          <InputGroup.Checkbox
            id="disabledTextInput"
            aria-label="Checkbox for following text input"
          />
        </div>
        <div className="left-pane">
          <h1 className="fw-bold title">
            <a href="">Party (Clean)</a>
          </h1>
          <section className="artists">
            <a href="">Chris Brown</a>
            <div className="feature d-inline-flex ml-5">
              <span className="badge-label">feat:</span>
              <a href="#">Usher</a>
              <a href="#">Gucci Mane</a>
            </div>
          </section>

          <section className="groupings">
            <span className="badge bg-primary">
              <a href="#">00s</a>
            </span>
            <span className="badge bg-primary">
              <a href="#">CURRENT</a>
            </span>
            <span className="badge bg-primary">
              <a href="#">GOTOS</a>
            </span>
            <span className="badge bg-primary">
              <a href="#">Hip Hop</a>
            </span>
            <span className="badge bg-primary">
              <a href="#">Dance</a>
            </span>
          </section>
        </div>
        <div className="right-pane">
          <span className="d-like mb-1">
            <i className="bx bx-heart bx-sm"></i>
          </span>
          <span className="badge bg-primary rounded-pill bpm">102</span>
        </div>
      </section>
    </Card.Body>
  );
};

const File = () => {
  return (
    <Card>
      <FileBody />
      <FileFooter />
    </Card>
  );
};

export default File;
