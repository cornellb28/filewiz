import React, { useContext } from "react";
import "../styles/app.scss";
import { Container, Row } from "react-bootstrap";
import Sidebar from "./Sidebar";
import Divider from "./components/Divider";
import Directory from "./Directory";
import RightPane from "./RightPane";
import FoldersList from "./components/FoldersList";
import trackMeta from "./types";

export interface AppState {
  filesData: trackMeta[];
  setFilesData: React.Dispatch<React.SetStateAction<trackMeta[]>>;
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

export const SideBarContext = React.createContext<{
  trackId: string | null;
  setTrackId: (id: string | null) => void;
}>(null as any);

const App = () => {
  const [filesData, setFilesData] = React.useState<AppState["filesData"]>([]);
  const [trackId, setTrackId] = React.useState<string | null>(null);
  // console.log(window.fileApp.getNames());
  return (
    <main>
      <SideBarContext.Provider value={{ trackId, setTrackId }}>
        <Container fluid>
          <Row>
            <FoldersList />
            
            <Sidebar filesData={filesData} setFilesData={setFilesData} />
            {/* <Directory filesData={filesData} setFilesData={setFilesData} /> */}
            {/* <RightPane /> */}
          </Row>
        </Container>
      </SideBarContext.Provider>
    </main>
  );
};

export default App;

// Resources
// https://flaviocopes.com/typescript-object-destructuring/
