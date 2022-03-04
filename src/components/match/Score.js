import React from 'react'
import { Button } from 'react-bootstrap'

const Score = (props) => {
  let left = props.wordsTotal - props.correctCount

  return (
    <div className="score">
      <h4>Timer: 0</h4>
      <h4>Correct: {props.correctCount}</h4>
      <h4>Incorrect: {props.errorCount}</h4>
      <h4>Words remaining: {left}</h4>
      <Button variant="dark" onClick={props.reset}>
        Reset
      </Button>
    </div>
  )
}

export default Score
