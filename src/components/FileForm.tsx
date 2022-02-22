import * as React from 'react'
import { Col, Form, Row, InputGroup, FormControl } from 'react-bootstrap'
import CreatableSelect from 'react-select/creatable'
import { ActionMeta, OnChangeValue } from 'react-select'
import { SideBarContext } from '../App'

interface GenreOption {
  value: string
  label: string
  color: string
  isFixed?: boolean
  isDisabled?: boolean
}

const genreOptions: GenreOption[] = [
  { value: 'hiphop', label: 'Hip Hop', color: '#00B8D9', isFixed: true },
  { value: 'soul', label: 'Soul', color: '#00B8D9', isFixed: true },
  { value: 'dance', label: 'Dance', color: '#00B8D9', isFixed: true },
  { value: 'house', label: 'House', color: '#00B8D9', isFixed: true },
]

const FileForm = () => {
  const { trackId, setTrackId } = React.useContext(SideBarContext)
  const handleChange = (
    newValue: OnChangeValue<GenreOption, true>,
    actionMeta: ActionMeta<GenreOption>
  ) => {
    console.group('Value Changed')
    console.log(newValue)
    console.log(`action: ${actionMeta.action}`)
    console.groupEnd()
  }

  return (
    <section className={`form_box ${trackId !== null ? 'open' : ''}`}>
      <a className="arrow arrow-up" title="Prev" href="#">
        <i className="bx bxs-chevrons-up bx-md"></i>
      </a>
      <Form className={`flyout_form px-4`}>
        <section className="form_like d-flex align-items-end flex-row justify-content-end align-items-center mb-2">
          <span className="label-like">Gotos</span>
          <i className="bx bx-heart bx-sm"></i>
        </section>
        <Row>
          <Col>
            <div className="artist_name">
              <Form.Label>Artist Name</Form.Label>
              <Form.Control placeholder="Artist" size="sm" />
            </div>
          </Col>
          <Col>
            <div className="artist_name">
              <Form.Label>Song Title</Form.Label>
              <Form.Control placeholder="Title" size="sm" />
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Label>year</Form.Label>
            <CreatableSelect
              isMulti
              onChange={handleChange}
              options={genreOptions}
            />
          </Col>
          <Col className="bpm">
            <Form.Label>bpm</Form.Label>
            <Form.Control placeholder="Bpm" size="sm" />
            <a href="#" className="analyze_bpm">
              analyze
            </a>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Label>grouping</Form.Label>
            <CreatableSelect
              isMulti
              onChange={handleChange}
              options={genreOptions}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Label>Genre</Form.Label>
            <CreatableSelect
              isMulti
              onChange={handleChange}
              options={genreOptions}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Label>Label</Form.Label>
            <CreatableSelect
              isMulti
              onChange={handleChange}
              options={genreOptions}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Label>Composer</Form.Label>
            <CreatableSelect
              isMulti
              onChange={handleChange}
              options={genreOptions}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Label>Remixer</Form.Label>
            <CreatableSelect
              isMulti
              onChange={handleChange}
              options={genreOptions}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Label>Filename</Form.Label>
            <InputGroup className="mb-1">
              <FormControl
                placeholder="fileName"
                aria-label="fileName"
                aria-describedby=""
              />
              <InputGroup.Text id="basic-addon2">.mp3</InputGroup.Text>
            </InputGroup>
            <section className="location_path d-flex justify-content-start">
              <span className="label">location:</span>
              <a href="#" className="path_name">
                /Volume/MUSICLITE/CAPITALRECORDS/00s
              </a>
            </section>
          </Col>
        </Row>
      </Form>
      <a className="arrow arrow-down" title="Next" href="#">
        <i className="bx bxs-chevrons-down bx-md"></i>
      </a>
    </section>
  )
}

export default FileForm
