import React from 'react'
import './buttonGrouping.css'
import { useState } from 'react'

const ButtonGrouping = (props) => {
  const [buttonActive, setButtonActive] = useState(props.buttons[0])
  return (
    <div
      className={`bttn-grid-${props.variant}`}
      onClick={(e) => {
        setButtonActive(e.target.textContent.toLowerCase())
      }}
    >
      {props.buttons.map((button) => (
        <div className={`bttn ${buttonActive === button ? 'active' : ''}`}>
          {button}
        </div>
      ))}
    </div>
  )
}

export default ButtonGrouping
