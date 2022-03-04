import React from 'react'
import './create.css'
import { useDispatch, useSelector } from 'react-redux'
import { Container } from 'react-bootstrap'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { loadNew } from '../root/rootSlice'
import { Button } from 'react-bootstrap'
import { useState } from 'react'
import { doc, setDoc } from 'firebase/firestore'
import db from '../../app/base'
import Input from '../input/Input'
import LoadBar from '../spinner/LoadBar'
import { useHistory } from 'react-router-dom'

const Create = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  let [group, setGroup] = useState(0)
  let row = 0
  let baseData = useSelector((state) => state.root.data.tempData)
  const groups = useSelector((state) => state.root.data.dataArray)

  const [inputs, setInputs] = useState(baseData)
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [loading, setLoading] = useState('hide')

  const getGroups = () => {
    const seen = new Set()

    let items = groups.map((item) => ({
      group: item.group_id,
    }))

    const filteredArr = items.filter((el) => {
      const duplicate = seen.has(el.group)
      seen.add(el.group)
      return !duplicate
    })

    return filteredArr
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading('visible')

    let timeStamp = Math.floor(new Date().getTime() / 1000).toString()

    for (let i = 0; i < inputs.length; i++) {
      await setDoc(doc(db, 'words', `${timeStamp}-${inputs[i].id}`), {
        group_id: parseInt(group),
        id: i,
        english: inputs[i].english,
        chinese: inputs[i].chinese,
      })
    }
    dispatch(loadNew())
    setInputs([
      {
        group_id: 0,
        id: 0,
        english: '',
        chinese: '',
      },
    ])
    setLoading('hide')
    history.push('/')
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
    <div className={'pullDown show'}>
      <LoadBar status={loading} />
      <Container>
        <Row>
          <Col className="text-center">
            <span>Groups already: </span>
            {getGroups().map((group, index) => (
              <span key={index}>[{group.group}] </span>
            ))}
          </Col>
        </Row>
        <Row>
          <form
            onSubmit={(e) => {
              handleSubmit(e)
            }}
          >
            <Row className="formRow">
              <Col className="offset-sm-2 col-8">
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
                <Col className="offset-sm-1 col-sm-1 wordCount">
                  {index + 1}
                </Col>
                <Col className="col-sm-3">
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

export default Create
