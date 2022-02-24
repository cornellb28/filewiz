import * as React from "react";
import Folders from "./components/Folders";
import { Col, Stack, Button, ListGroup } from "react-bootstrap";
import { TrackMeta } from "./types/TrackMeta";

declare global {
  interface Window {
    fileApp: {
      // type generics -- returning a promise that will be a
      getDirectoryRoot: () => Promise<string[]>;
      getNames: () => string[];
      addArtist: (name: string) => void;
    };
  }
}

interface IProps {
  filesData: TrackMeta;
  setFilesData: React.Dispatch<React.SetStateAction<TrackMeta>>;
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

const ScanDirectoryAction = ({
  setFilesData,
}: {
  // This way I just pick the prop I need from my interface
  setFilesData: IProps["setFilesData"];
}) => {
  const scanDir = () => {
    console.log("Sacn The Dir");
    //const files = await window.fileApp.getDirectoryRoot();
    // @ts-ignore
    // setFileData(files as any) only when I'm taking to much time
    //setFilesData(files);
  };

  const handleChange = () => {
    console.log("Kanye:West");
  };
  return (
    <Stack className="scan_directory" direction="horizontal">
      <Button variant="primary" onClick={() => handleChange}>
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
  //console.log(window.fileApp.addArtist('Bob James'))
  return (
    <Col className="sidebar" md={2}>
      <Header />
      <ScanDirectoryAction setFilesData={setFilesData} />
      <SidebarAction />
      <div className="folders-wrap pt-4">
        <h3>Active Folders</h3>
        <Folders filesData={filesData} />
      </div>
    </Col>
  );
};

export default Sidebar;
