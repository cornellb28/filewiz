import React from "react";

import { FolderView as Props } from "./FoldersList";

const FolderCard = ({ title, totalFiles, options, icon }: Props) => {
  return (
    <div className="card p-4">
      <div className="card-icon-menu">
        <i className="bx bx-folder bx-lg"></i>
        <i className="bx bx-dots-vertical-rounded bx-md"></i>
      </div>
      <div>
        <h4>{title}</h4>
        <span>{totalFiles} files</span>
      </div>
    </div>
  );
};

export default FolderCard;
