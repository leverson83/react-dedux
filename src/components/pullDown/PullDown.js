import React from 'react'
import './pullDown.css'
import { useDispatch, useSelector } from 'react-redux'
import { Container } from 'react-bootstrap'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { hidePullDown, loadNew } from '../root/rootSlice'
import { Button } from 'react-bootstrap'
import { useState } from 'react'
import { doc, setDoc } from 'firebase/firestore'
import db from '../../app/base'
import Input from '../input/Input'

const PullDown = () => {
  let active = useSelector((state) => state.root.content.pullDown)
  let status = active ? 'show' : 'hide'
  const dispatch = useDispatch()
  let [group, setGroup] = useState(0)
  let row = 0
  let baseData = useSelector((state) => state.root.data.tempData)

  const [inputs, setInputs] = useState(baseData)
  const [buttonDisabled, setButtonDisabled] = useState(true)

  const handleSubmit = async (e) => {
    e.preventDefault()
    let timeStamp = Math.floor(new Date().getTime() / 1000).toString()

    for (let i = 0; i < inputs.length; i++) {
      await setDoc(doc(db, 'words', `${timeStamp}${inputs[i].id}`), {
        group_id: group,
        id: i,
        english: inputs[i].english,
        chinese: inputs[i].chinese,
      })
    }
    dispatch(hidePullDown())
    dispatch(loadNew())
    setInputs([
      {
        group_id: 0,
        id: 0,
        english: '',
        chinese: '',
      },
    ])
  }

  const handleUpdate = (id, type, data) => {
    let temp = [...inputs]
    let item = { ...temp[id] }
    item.group_id = group
    item.id = id
    type === 'english' ? (item.english = data) : (item.chinese = data)
    temp[id] = item
    setInputs(temp)
  }

  const addRow = () => {
    let temp = [...inputs]
    temp.push({ group_id: '', id: inputs.length, english: '', chinese: '' })
    setInputs(temp)
  }

  const captureGroup = (e) => {
    setButtonDisabled(false)
    setGroup(e)
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
              handleSubmit(e)
            }}
          >
            <Row className="formRow">
              <Col className="offset-2 col-8">
                <input
                  type="text"
                  placeholder="Grouping"
                  onInput={(e) => {
                    captureGroup(e.target.value)
                  }}
                ></input>
              </Col>
            </Row>
            {inputs.map((word, index) => (
              <Row key={`word${index}`} className="formRow">
                <Col className="offset-sm-2 col-sm-3">
                  <Input
                    row={word.id}
                    type="english"
                    updateRow={handleUpdate}
                  />
                </Col>
                <Col className="col-sm-3">
                  <Input
                    row={word.id}
                    type="chinese"
                    updateRow={handleUpdate}
                  />
                </Col>
                <Col className="col-sm-2">
                  <div className="d-grid gap-2">
                    <Button
                      variant="outline-dark"
                      id={row}
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
                  <Button
                    variant="outline-dark"
                    type="submit"
                    disabled={buttonDisabled}
                  >
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
