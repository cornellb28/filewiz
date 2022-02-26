import React from "react";
import "../styles/app.scss";
import { Container, Row } from "react-bootstrap";
import Sidebar from "./Sidebar";
import Divider from "./components/Divider";
import Directory from "./Directory";
import RightPane from "./RightPane";
import { TrackMeta } from "./types/TrackMeta";

interface AppState {
  filesData?: TrackMeta | undefined;
  setFilesData: React.Dispatch<React.SetStateAction<TrackMeta>>;
}

export const SideBarContext = React.createContext<{
  trackId: string | null;
  setTrackId: (id: string | null) => void;
}>(null as any);

const App = () => {
  const [filesData, setFilesData] = React.useState<TrackMeta>([]);
  const [trackId, setTrackId] = React.useState<string | null>(null);
  //console.log(window.fileApp.addArtist('Bob James'))
  return (
    <main>
      <SideBarContext.Provider value={{ trackId, setTrackId }}>
        <Container fluid>
          <Row>
            <Sidebar filesData={filesData} setFilesData={setFilesData} />
            <Divider />
            <Directory />
            <Divider />
            <RightPane />
          </Row>
        </Container>
      </SideBarContext.Provider>
    </main>
  );
};

export default App;
