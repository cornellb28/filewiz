import * as React from 'react'
import FileForm from './components/FileForm'
import Files from './Files'
import { Col, Form } from 'react-bootstrap'
import { SideBarContext } from './App'


const DirectoryHeader: React.FC = () => {
  return (
    <div className="directory-header">
      <Form.Control id="disabledTextInput" placeholder="Search Directory..." />
    </div>
  )
}

const DirectoryFilter: React.FC = () => {
  
  return (
    <div className="filter-wrap d-flex">
      <section className="select-all-check d-flex">
        <label htmlFor="selectAll">select all</label>
        <input type="checkbox" name="selectAll" />
        <span>(12)</span>
      </section>
      <section className="d-flex">
        <select
          className="form-select form-select-sm genre"
          aria-label=".form-select-sm example"
        >
          <option value="1">Genre</option>
          <option value="2">Comments</option>
          <option value="3">Grouping</option>
        </select>
        <select
          className="form-select form-select-sm genre"
          aria-label=".form-select-sm example"
        >
          <option value="1">Hip Hop</option>
          <option value="2">Soul</option>
          <option value="3">R&amp;B</option>
        </select>
      </section>
    </div>
  )
}

const Directory: React.FC = () => {
  return (
    <Col md={4} className="directory-wrapper">
      <DirectoryHeader />
      <DirectoryFilter />
      <Files />
    </Col>
  )
}

export default Directory
