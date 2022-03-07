import React from 'react'
import { ButtonGroup, Button } from 'react-bootstrap'
import { useEffect, useRef, useState } from 'react'

const Score = (props) => {
  let left = props.wordsTotal - props.correctCount
  const [count, setCount] = useState(0)
  const [begin, setBegin] = useState(false)
  const intervalRef = useRef(null)
  const baseScore = props.wordsTotal * 10
  const [finalScore, setFinalScore] = useState(0)

  const gameStart = () => {
    setBegin((prev) => !prev)
    props.setStatus('start')
  }

  const gameReset = () => {
    props.reset()
    props.setStatus('idle')
    clearCounter()
    setFinalScore(0)
  }

  const gameComplete = () => {
    props.reset()
    props.setStatus('idle')
    clearCounter()
  }

  const clearCounter = () => {
    setBegin((prev) => !prev)
    setCount(0)
    intervalRef?.current && clearInterval(intervalRef.current)
  }

  useEffect(() => {
    if (left === 0) {
      setFinalScore(baseScore - count - props.errorCount * 5)
      gameComplete()
    }
  }, [left])

  useEffect(() => {
    if (begin) {
      intervalRef?.current && clearInterval(intervalRef.current)

      const intervalId = setInterval(() => {
        setCount((prev) => prev + 1)
      }, 1000)
      intervalRef.current = intervalId
    }
  }, [begin])

  useEffect(() => {
    alert(finalScore)
  }, [finalScore])

  return (
    <div className="scoreWrapper">
      <div className="score">
        <h4>Timer: {count}</h4>
        <h4>Correct: {props.correctCount}</h4>
        <h4>Incorrect: {props.errorCount}</h4>
        <h4>Words remaining: {`${props.status != 'idle' ? left : 0}`}</h4>
      </div>
      <ButtonGroup className="mb-3">
        <Button variant="success" onClick={gameStart}>
          Start
        </Button>
        <Button variant="danger" onClick={gameReset}>
          Reset
        </Button>
      </ButtonGroup>
    </div>
  )
}

export default Score
