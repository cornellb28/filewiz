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
      </section>
    </Col>
  );
};

export default RightPane;
