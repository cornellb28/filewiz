import * as React from 'react'
import '../styles/app.scss'
import { Col } from 'react-bootstrap'
import FileForm from './components/FileForm'

const RightPane = () => {
  return (
    <Col style={{ position: 'relative' }}>
      <section className="file-table">
        {/* Ctrl + space imports the component automayically */}
        <FileForm />
      </section>
    </Col>
  )
}

export default RightPane
