import React from 'react'
import './navigation.css'
import logo from './menuIcon.png'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { useDispatch } from 'react-redux'
import { setAction } from '../root/rootSlice'

const Navigation = () => {
  const dispatch = useDispatch()

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="sm"
      fixed="top"
      onSelect={(e) => {
        dispatch(setAction(e))
      }}
    >
      <Navbar.Brand href="#home">
        <img src={logo} alt="Application logo" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <NavDropdown menuVariant="dark" title="File" id="basic-nav-dropdown">
            <NavDropdown.Item eventKey="new">New</NavDropdown.Item>
            <NavDropdown.Item eventKey="load">Load</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigation
