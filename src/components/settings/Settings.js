import React from 'react'
import { Button, Modal, Row } from 'react-bootstrap'
import ButtonGrouping from '../buttonGrouping/ButtonGrouping'
import GroupButtons from '../buttonGrouping/GroupButtons'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setGroup } from '../root/rootSlice'

const Settings = (props) => {
  const dispatch = useDispatch()
  const [sort, setSort] = useState(
    useSelector((state) => state.root.menu.action),
  )

  const groupData = useSelector((state) => state.root.data.groups)
  const [groups, setGroups] = useState(groupData)

  const [chosenGroups, setChosenGroups] = useState([])

  const [side, setSide] = useState(
    useSelector((state) => state.root.data.faceUp),
  )

  const addGroup = (group_id) => {
    let id = group_id.toString()
    let arr = [...chosenGroups]

    if (arr.includes(id)) {
      let index = arr.indexOf(id)
      if (index > -1) {
        arr.splice(index, 1)
      }
    } else {
      arr.push(group_id)
    }
    setChosenGroups(arr)
  }

  useEffect(() => {
    setGroups(groupData)
  }, [groupData])

  const save = () => {
    props.handleAction(sort)
    props.setSide(side)
    props.onClose()
    dispatch(setGroup(chosenGroups))
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
        <Row className="formRow">
          <h4>Groups</h4>
        </Row>
        <Row>
          <GroupButtons
            variant="4"
            buttons={groups}
            update={addGroup}
            active={chosenGroups}
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
