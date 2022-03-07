import React from 'react'
import './navigation.css'
import logo from './menuIcon.png'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { useDispatch } from 'react-redux'
import { setAction, setSide } from '../root/rootSlice'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Settings from '../settings/Settings'

const Navigation = () => {
  const dispatch = useDispatch()
  const groups = useSelector((state) => state.root.data.dataArray)
  const [modal, setModal] = useState(false)

  const closeModal = () => {
    setModal(false)
  }
  const showModal = () => setModal(true)

  const handleAction = (e) => {
    dispatch(setAction(e))
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
        collapseOnSelect={true}
      >
        <Navbar.Brand as={Link} to="/">
          <img src={logo} alt="Application logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link eventKey="1" as={Link} to="/" href="/">
              Flip
            </Nav.Link>

            <Nav.Link eventKey="2" as={Link} to="/match">
              Match
            </Nav.Link>

            <Nav.Link eventKey="3" as={Link} to="/create" href="/create">
              New
            </Nav.Link>
          </Nav>

          <Nav className="ms-auto">
            <Nav.Link eventKey="4" onClick={showModal}>
              Options
            </Nav.Link>
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
