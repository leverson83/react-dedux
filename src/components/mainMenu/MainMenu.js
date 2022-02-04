import React from 'react'
import '../mainMenu/mainMenu.css'
import Nav from 'react-bootstrap/Nav'
import { useSelector, useDispatch } from 'react-redux'
import { setTab, activeTab } from '../root/rootSlice'

const MainMenu = () => {
  const dispatch = useDispatch()

  const handleClick = (e) => {
    dispatch(setTab(e))
  }

  return (
    <Nav
      variant="tabs"
      activeKey={useSelector(activeTab)}
      onSelect={handleClick}
    >
      <Nav.Item>
        <Nav.Link eventKey="/link1">Link 1</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="/link2">Link 2</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="/link3">Link 3</Nav.Link>
      </Nav.Item>
    </Nav>
  )
}

export default MainMenu
