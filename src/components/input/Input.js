import { LoadBundleTask } from 'firebase/firestore'
import React from 'react'
import { useState } from 'react'

const Input = (props) => {
  const handleInput = (e) => {
    props.updateRow(props.row, props.type, e.target.value)
  }

  return (
    <input
      type="text"
      placeholder={props.type}
      onChange={(e) => {
        handleInput(e)
      }}
    ></input>
  )
}

export default Input
