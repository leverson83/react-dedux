import './content.css'
import React from 'react'
import { Container } from 'react-bootstrap'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useSelector } from 'react-redux'
import LoadBar from '../spinner/LoadBar'
import { useEffect, useState } from 'react'
import { currentAction } from '../root/rootSlice'

const Content = () => {
  const words = useSelector((state) => state.root.data.dataArray)
  const action = useSelector((state) => state.root.menu.action)
  const [loadBar, setLoadBar] = useState('show')

  useEffect(() => {
    showLoader()
  }, [words])

  const showLoader = () => {
    setTimeout(() => {
      setLoadBar('hide')
    }, 1000)
  }

  const sort = (originalArray, random) => {
    if (action == 'random') {
      let array = [].concat(originalArray)
      let currentIndex = array.length,
        temporaryValue,
        randomIndex

      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1
        temporaryValue = array[currentIndex]
        array[currentIndex] = array[randomIndex]
        array[randomIndex] = temporaryValue
      }
      return array
    } else {
      return originalArray
    }
  }

  return (
    <Container className={'contentArea'}>
      <LoadBar status={loadBar} message="Loading" />
      <Row>
        {sort(
          words.map((word) => (
            <Col
              key={word.id}
              className="col-12 col-sm-6 col-md-4 col-lg-3 text-center flashCard"
              id={'word' + word.id}
            >
              <div className="card-inner">
                <div className="side flashCardEnglish show">
                  <h4>{word.english}</h4>
                </div>
                <div className="side flashCardChinese hide">
                  <h4>{word.chinese}</h4>
                </div>
              </div>
            </Col>
          )),
        )}
      </Row>
    </Container>
  )
}

export default Content
