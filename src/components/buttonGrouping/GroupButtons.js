import React from 'react'
import './buttonGrouping.css'

const ButtonGrouping = (props) => {
  let active = [...props.active]
  let allSelected = ''
  if (active.length === 0) {
    allSelected = 'active'
  }

  return (
    <div className={`bttn-grid-${props.variant}`}>
      {props.buttons.map((button, index) => (
        <div
          key={index}
          className={`bttn ${allSelected} ${
            active.includes(button.toString()) ? 'active' : ''
          }`}
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
