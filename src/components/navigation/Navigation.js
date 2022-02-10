import React from 'react'
import './navigation.css'
import logo from './menuIcon.png'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { Dropdown } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { setAction, setGroup } from '../root/rootSlice'
import { useSelector } from 'react-redux'

const Navigation = () => {
  const dispatch = useDispatch()
  const group = useSelector((state) => state.root.menu.group)

  const handleAction = (e) => {
    dispatch(setAction(e))
  }

  const handleGroup = (e) => {
    dispatch(setGroup(e))
  }

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="sm"
      fixed="top"
      onSelect={(e) => {
        handleAction(e)
      }}
    >
      <Navbar.Brand href="#home">
        <img src={logo} alt="Application logo" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <NavDropdown menuVariant="dark" title="Game" id="nav-dropdown-1">
            <NavDropdown.Item eventKey="order">Default</NavDropdown.Item>
            <NavDropdown.Item eventKey="random">Random</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown menuVariant="dark" title="Manage" id="nav-dropdown-2">
            <NavDropdown.Item eventKey="add">New</NavDropdown.Item>
            <NavDropdown.Item eventKey="view">View</NavDropdown.Item>
          </NavDropdown>
        </Nav>

        <Nav className="ms-auto">
          <NavDropdown
            id="nav-dropdown-3"
            variant="secondary"
            menuVariant="dark"
            title={group ? group : 'All'}
            onSelect={(e) => {
              handleGroup(e)
            }}
          >
            <Dropdown.Item eventKey={0}>All</Dropdown.Item>
            <Dropdown.Item eventKey={1}>1</Dropdown.Item>
            <Dropdown.Item eventKey={2}>2</Dropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigation
