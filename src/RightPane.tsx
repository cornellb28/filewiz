import * as React from "react";
import { useState } from "react";
import "../styles/app.scss";
import { Col, Tabs, Tab } from "react-bootstrap";
import FileForm from "./components/FileForm";
import FileList from "./FileList";
import FileFilter from "./components/FileFilter";

const RightPane = () => {
  const [key, setKey] = useState("profile");
  return (
    <Col className="right-pane">
      <section className="file-table m-4">
        {/* Ctrl + space imports the component automayically */}
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          //onSelect={(k: string) => setKey(k)}
          className="mb-3"
        >
          <Tab eventKey="home" title="Home">
            <FileList />
          </Tab>
          <Tab eventKey="profile" title="Profile">
            <FileFilter />
            <FileList />
          </Tab>
          <Tab eventKey="contact" title="Contact" disabled>
            <FileList />
          </Tab>
        </Tabs>
        <FileForm />
      </section>
    </Col>
  );
};

export default RightPane;
