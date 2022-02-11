import React from 'react'
import './pullDown.css'
import { useDispatch, useSelector } from 'react-redux'
import { Container } from 'react-bootstrap'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { hidePullDown } from '../root/rootSlice'
import { Button } from 'react-bootstrap'
import { useState } from 'react'
import { doc, setDoc } from 'firebase/firestore'
import db from '../../app/base'

const PullDown = () => {
  let active = useSelector((state) => state.root.content.pullDown)
  let status = active ? 'show' : 'hide'
  const dispatch = useDispatch()

  const tempWords = useSelector((state) => state.root.data.tempData)
  const [count, setCount] = useState(1)
  const [inputs, setInputs] = useState(tempWords)
  const [group, setGroup] = useState(1)

  const addRow = (e) => {
    let next_item = parseInt(e.target.id) + 1
    setCount(count + 1)
    setInputs([
      ...inputs,
      {
        group_id: group,
        id: next_item,
        english: '',
        chinese: '',
      },
    ])
  }

  const removeRow = () => {
    //To do
  }

  const sendData = async (e) => {
    e.preventDefault()
    let timeStamp = Math.floor(new Date().getTime() / 1000).toString()

    console.log(inputs)

    /*  await setDoc(doc(db, 'words', timeStamp), {
      group_id: group,
      id: 1,
      english: 'test',
      chinese: 'test',
    }) */
  }

  return (
    <div className={'pullDown ' + status}>
      <Container>
        <span
          className="pullDownClose"
          onClick={() => dispatch(hidePullDown())}
        >
          &#10006;
        </span>
        <Row>
          <form
            onSubmit={(e) => {
              sendData(e)
            }}
          >
            <Row className="formRow">
              <Col className="offset-2 col-8">
                <input
                  type="text"
                  placeholder="Grouping"
                  onInput={(e) => {
                    setGroup(e.target.value)
                  }}
                ></input>
              </Col>
            </Row>
            {inputs.map((word) => (
              <Row key={word.id} className="formRow">
                <Col className="offset-2 col-3">
                  <input
                    name="english"
                    type="text"
                    placeholder="English"
                  ></input>
                </Col>
                <Col className="col-3">
                  <input
                    name="chinese"
                    type="text"
                    placeholder="Chinese"
                  ></input>
                </Col>
                <Col className="col-2">
                  <div className="d-grid gap-2">
                    <Button
                      variant="outline-dark"
                      id={count}
                      onClick={(e) => {
                        addRow(e)
                      }}
                    >
                      &#43;
                    </Button>
                  </div>
                </Col>
              </Row>
            ))}
            <Row>
              <Col className="offset-2 col-8">
                <div className="d-grid gap-2">
                  <Button variant="outline-dark" type="submit">
                    Submit
                  </Button>
                </div>
              </Col>
            </Row>
          </form>
        </Row>
      </Container>
    </div>
  )
}

export default PullDown
