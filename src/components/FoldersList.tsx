import React from "react";
import FolderCard from "./FolderCard";

export interface FolderView {
  title: string;
  totalFiles: number;
  options: string[];
  icon: null;
}

const data: FolderView[] = [
  {
    title: "90's",
    totalFiles: 340,
    options: ["editFolderName", "moveFolder", "removeFolder"],
    icon: null,
  },
  {
    title: "80's",
    totalFiles: 340,
    options: ["editFolderName", "moveFolder", "removeFolder"],
    icon: null,
  },
  {
    title: "70's",
    totalFiles: 340,
    options: ["editFolderName", "moveFolder", "removeFolder"],
    icon: null,
  },
  {
    title: "2000",
    totalFiles: 340,
    options: ["editFolderName", "moveFolder", "removeFolder"],
    icon: null,
  },
];

const FoldersList = () => {
  return (
    <section id="folder-view-all" className="d-flex flex-column p-0">
      <section className="d-flex flex-row top-card">
        <h3 className="col-md-4">Folders</h3>
        <a className="col-md-4 ml-auto" href="">
          {"View All"}
        </a>
      </section>
      <section id="folders" className="row-cols-*">
        {/* {data.map(({ title, totalFiles, options, icon }) => (
          <FolderCard
            title={title}
            totalFiles={totalFiles}
            options={options}
            icon={icon}
          />
        ))} */}
      </section>
    </section>
  );
};

export default FoldersList;
