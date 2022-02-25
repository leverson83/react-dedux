import React from 'react'
import { Button, Modal, Row } from 'react-bootstrap'
import ButtonGrouping from '../buttonGrouping/ButtonGrouping'
import { useState } from 'react'
import { useSelector } from 'react-redux'

const Settings = (props) => {
  const [sort, setSort] = useState(
    useSelector((state) => state.root.menu.action),
  )

  const [side, setSide] = useState(
    useSelector((state) => state.root.data.faceUp),
  )

  const save = () => {
    props.handleAction(sort)
    props.setSide(side)
    props.onClose()
  }

  return (
    <Modal show={props.show} onHide={props.onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Settings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="formRow">
          <h4>Sorting</h4>
        </Row>
        <Row>
          <ButtonGrouping
            variant="2"
            buttons={['order', 'random']}
            active={sort}
            update={setSort}
          />
        </Row>
        <Row className="formRow">
          <h4>Show side</h4>
        </Row>
        <Row>
          <ButtonGrouping
            variant="2"
            buttons={['english', 'chinese']}
            update={setSide}
            active={side}
          />
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={save}>
          Apply
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default Settings
