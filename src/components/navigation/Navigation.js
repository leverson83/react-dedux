import React from 'react'
import './navigation.css'
import logo from './menuIcon.png'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { Dropdown } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { setAction, setGroup, setSide } from '../root/rootSlice'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Settings from '../settings/Settings'

const Navigation = () => {
  const dispatch = useDispatch()
  const group = useSelector((state) => state.root.menu.group)
  const groups = useSelector((state) => state.root.data.dataArray)
  const [modal, setModal] = useState(false)
  const history = useHistory()

  const closeModal = () => {
    setModal(false)
    history.push('/')
  }
  const showModal = () => setModal(true)

  const handleAction = (e) => {
    dispatch(setAction(e))
  }

  const handleGroup = (e) => {
    dispatch(setGroup(e))
  }

  const handleSide = (e) => {
    dispatch(setSide(e))
  }

  const getGroups = () => {
    const seen = new Set()

    let items = groups.map((item) => ({
      group: item.group_id,
    }))

    const filteredArr = items.filter((el) => {
      const duplicate = seen.has(el.group)
      seen.add(el.group)
      return !duplicate
    })

    return filteredArr
  }

  return (
    <div>
      <Navbar
        bg="dark"
        variant="dark"
        expand="sm"
        fixed="top"
        onSelect={(e) => {
          handleAction(e)
        }}
      >
        <Navbar.Brand as={Link} to="/">
          <img src={logo} alt="Application logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown menuVariant="dark" title="Manage" id="nav-dropdown-2">
              <NavDropdown.Item eventKey="add" as={Link} to="/create">
                New
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <Nav className="ms-auto">
            <Nav.Link onClick={showModal}>&#9881;</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Settings
        show={modal}
        onClose={closeModal}
        onShow={showModal}
        handleAction={handleAction}
        setSide={handleSide}
        save={closeModal}
        getGroups={getGroups}
      />
    </div>
  )
}

export default Navigation
