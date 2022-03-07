import './match.css'
import { Container, Col, Row } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { updateChinese, updateEnglish } from '../root/rootSlice'
import Score from './Score'
import Matchcard from './Matchcard'
import { useEffect, useState } from 'react'

const Match = (props) => {
  const dispatch = useDispatch()
  const selection = useSelector((state) => state.root.data.selection)
  const [disabled, setDisabled] = useState([])
  const [errors, setErrors] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    let arr = [...disabled]
    if (selection.english !== '' && selection.chinese !== '') {
      if (selection.chinese === selection.english) {
        //Correct answer
        arr.push(selection.english)
        let count = correct + 1
        setCorrect(count)
        dispatch(updateChinese(''))
        dispatch(updateEnglish(''))
      } else {
        //Wrong answer
        let count = errors + 1
        setErrors(count)
        dispatch(updateChinese(''))
        dispatch(updateEnglish(''))
      }
      setDisabled(arr)
    }
  }, [selection])

  const reset = () => {
    dispatch(updateChinese(''))
    dispatch(updateEnglish(''))
    setDisabled([])
    setCorrect(0)
    setErrors(0)
  }

  return (
    <Container>
      <Row>
        <Col className="col-sm-12">
          <div className="matchArea">
            <Score
              errorCount={errors}
              correctCount={correct}
              wordsTotal={props.words.length}
              reset={reset}
              setStatus={setStatus}
              status={status}
            />
            <div className="matchLeft">
              {props.words.map((word) => (
                <Matchcard
                  key={`chinese ${word.group_id} ${word.id}`}
                  word={word}
                  type="chinese"
                  disabled={disabled}
                  status={status}
                />
              ))}
            </div>
            <div className="matchRight">
              {props.randoms.map((word) => (
                <Matchcard
                  key={`english ${word.group_id} ${word.id}`}
                  word={word}
                  type="english"
                  disabled={disabled}
                  status={status}
                />
              ))}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Match
