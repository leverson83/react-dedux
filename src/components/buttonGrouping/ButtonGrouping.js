import React from 'react'
import './buttonGrouping.css'

const ButtonGrouping = (props) => {
  return (
    <div className={`bttn-grid-${props.variant}`}>
      {props.buttons.map((button, index) => (
        <div
          key={index}
          className={`bttn ${props.active === button ? 'active' : ''}`}
          onClick={(e) => {
            props.update(e.target.textContent.toLowerCase())
          }}
        >
          {button}
        </div>
      ))}
    </div>
  )
}

export default ButtonGrouping
