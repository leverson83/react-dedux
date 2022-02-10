import './content.css'
import React from 'react'
import { Container } from 'react-bootstrap'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useSelector } from 'react-redux'
import LoadBar from '../spinner/LoadBar'
import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import { setAction } from '../root/rootSlice'
import { useDispatch } from 'react-redux'

const Content = () => {
  const dispatch = useDispatch()
  const words = useSelector((state) => state.root.data.dataArray)
  const action = useSelector((state) => state.root.menu.action)
  const group = useSelector((state) => state.root.menu.group)
  const flip = useSelector((state) => state.root.data.showEnglish)
  const [loadBar, setLoadBar] = useState('show')

  useEffect(() => {
    showLoader()
  }, [words])

  const handleAction = (e) => {
    dispatch(setAction('flip'))
  }

  const showLoader = () => {
    setTimeout(() => {
      setLoadBar('hide')
    }, 1000)
  }

  const sorted = () => {
    let reduced = ''
    if (group != 0) {
      reduced = words.reduce((words, word) => {
        if (word.group_id == group) {
          words.push(word)
        }
        return words
      }, [])
    } else {
      reduced = words
    }

    if (group === 0 && action == 'order') {
      console.log('Group 0')
      return words
    } else if (group === 0 && action == 'random') {
      console.log('Random')
      let sorted = [].concat(words)
      let currentIndex = sorted.length,
        temporaryValue,
        randomIndex

      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1
        temporaryValue = sorted[currentIndex]
        sorted[currentIndex] = sorted[randomIndex]
        sorted[randomIndex] = temporaryValue
      }
      return sorted
    } else if (action == 'random') {
      console.log('Random')
      let sorted = [].concat(reduced)
      let currentIndex = sorted.length,
        temporaryValue,
        randomIndex

      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1
        temporaryValue = sorted[currentIndex]
        sorted[currentIndex] = sorted[randomIndex]
        sorted[randomIndex] = temporaryValue
      }
      return sorted
    } else {
      console.log('Standard')
      return reduced
    }
  }

  return (
    <Container className={'contentArea'}>
      <LoadBar status={loadBar} message="Loading" />
      <Row>
        <Col className="mb-5 text-center">
          <Button variant="primary" onClick={handleAction}>
            Flip
          </Button>
        </Col>
      </Row>
      <Row>
        {sorted().map((word) => (
          <Col
            key={`${word.group_id}` + `${word.id}`}
            className="col-12 col-sm-6 col-md-4 col-lg-3 text-center flashCard"
            id={'word' + word.id}
          >
            <div className="card-inner">
              <div
                className={`side flashCardEnglish ${flip ? 'show' : 'hide'}`}
              >
                <h4>{word.english}</h4>
              </div>
              <div
                className={`side flashCardChinese ${flip ? 'hide' : 'show'}`}
              >
                <h4>{word.chinese}</h4>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default Content
