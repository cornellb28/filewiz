import * as React from 'react'
import * as fse from 'fs-extra'
import * as path from 'path'
import { ListGroup } from 'react-bootstrap'
import { TrackMeta } from '../types/TrackMeta'

const Folders = ({ filesData }: { filesData: TrackMeta }) => {
  const folderView: string[] = filesData.map((file) => {
    const { location }: { location: string } = file
    return location
  })
  //console.log(folderView)
  return (
    <ListGroup variant="flush">
      {folderView}
      <ListGroup.Item>
        <i className="bx bxs-folder"></i>
        <span className="folder_name">90s</span>
        <span className="file_count">(3,000)</span>
      </ListGroup.Item>
    </ListGroup>
  )
}

export default Folders
