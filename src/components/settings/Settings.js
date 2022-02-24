import React from 'react'
import { Button, Modal, Row } from 'react-bootstrap'
import ButtonGrouping from '../buttonGrouping/ButtonGrouping'

const Settings = (props) => {
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
          <ButtonGrouping variant="2" buttons={['order', 'random']} />
        </Row>
        <Row className="formRow">
          <h4>Show side</h4>
        </Row>
        <Row>
          <ButtonGrouping variant="2" buttons={['english', 'chinese']} />
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={props.onClose}>
          Apply
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default Settings
