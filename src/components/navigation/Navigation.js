import React from 'react'
import './navigation.css'
import logo from './menuIcon.png'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { Dropdown } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { setAction, setGroup, showPullDown } from '../root/rootSlice'
import { useSelector } from 'react-redux'
import DropdownItem from 'react-bootstrap/esm/DropdownItem'
import { Link } from 'react-router-dom'

const Navigation = () => {
  const dispatch = useDispatch()
  const group = useSelector((state) => state.root.menu.group)
  const groups = useSelector((state) => state.root.data.dataArray)

  const handleAction = (e) => {
    dispatch(setAction(e))
  }

  const handleGroup = (e) => {
    dispatch(setGroup(e))
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
    <Navbar
      bg="dark"
      variant="dark"
      expand="sm"
      fixed="top"
      onSelect={(e) => {
        handleAction(e)
      }}
    >
      <Navbar.Brand>
        <Link to="/">
          <img src={logo} alt="Application logo" />
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <NavDropdown menuVariant="dark" title="Game" id="nav-dropdown-1">
            <NavDropdown.Item eventKey="order" as={Link} to="/">
              Default
            </NavDropdown.Item>
            <NavDropdown.Item eventKey="random" as={Link} to="/">
              Random
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown menuVariant="dark" title="Manage" id="nav-dropdown-2">
            <NavDropdown.Item eventKey="add" as={Link} to="/create">
              New
            </NavDropdown.Item>
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
            {getGroups().map((group) => (
              <Dropdown.Item key={group.group} eventKey={group.group}>
                {group.group}
              </Dropdown.Item>
            ))}
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigation
