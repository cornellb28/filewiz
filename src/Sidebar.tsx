import * as React from "react";
import { useReducer } from "react";
import Folders from "./components/Folders";
import { Col, Stack, Button, ListGroup } from "react-bootstrap";
import trackMeta from "./types";
import filesReducer, { intialState } from "./reducers/scanFilesReducer";
import { AppState as Props } from "./App";

interface IProps {
  filesData: Props["filesData"];
  setFilesData: Props["setFilesData"];
}

declare global {
  interface Window {
    fileApp: {
      // type generics -- returning a promise that will be a
      getDirectoryRoot: () => Promise<trackMeta[]>;
      getNames: () => string;
      addArtist: (name: string) => void;
    };
  }
}

const Header = () => {
  return (
    <Stack className="logo_content" direction="horizontal">
      <div className="logo">
        <i className="bx bx-music"></i>
        <span className="logo_name">filewizz</span>
      </div>
      <i className="bx bx-menu-alt-right btn bx-md"></i>
    </Stack>
  );
};
// This component is my button to grab the selected directory and we begin to scan
// We only need the setter function to grab the data passed back to us
const ScanDirectoryAction = ({
  setFilesData,
}: {
  // This way I just pick the prop I need from my interface
  setFilesData: IProps["setFilesData"];
}) => {

  const scanDir = async () => {
    // @ts-ignore
    const files = await window.fileApp.getDirectoryRoot();

    // setFileData(files as any) only when I'm taking to much time
    setFilesData(files);
  };

  return (
    <Stack className="scan_directory" direction="horizontal">
      <Button
        className="scan_button"
        variant="primary"
        onClick={() => scanDir()}
      >
        <i className="bx bx-upload bx-s"></i>
        <span>Scan Directory</span>
      </Button>
    </Stack>
  );
};

const SidebarAction = () => {
  return (
    <ListGroup variant="flush" className="group_options">
      <ListGroup.Item>
        <i className="bx bxs-folder-plus"></i>
        <span className="folder_name">Create Serato Playlist</span>
      </ListGroup.Item>
      <ListGroup.Item>
        <i className="bx bx-heart"></i>
        <span className="folder_name">Gotos Songs</span>
      </ListGroup.Item>
    </ListGroup>
  );
};

const Sidebar = ({ filesData, setFilesData }: IProps) => {
  //console.log(window.fileApp.getNames());
  return (
    <Col className="sidebar" md={2}>
      <Header />
      <ScanDirectoryAction setFilesData={setFilesData} />
      <SidebarAction />
      <div className="folders-wrap pt-4">
        <h3>Active Folders</h3>
        <Folders filesData={filesData} setFilesData={setFilesData} />
      </div>
    </Col>
  );
};

export default Sidebar;
