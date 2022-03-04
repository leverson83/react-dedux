import './flipCards.css'
import React from 'react'
import { Container } from 'react-bootstrap'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const FlipCards = () => {
  const words = useSelector((state) => state.root.data.dataArray)
  const action = useSelector((state) => state.root.menu.action)
  const group = useSelector((state) => state.root.menu.group)
  const face = useSelector((state) => state.root.data.faceUp)

  useEffect(() => {
    showLoader()
  }, [words])

  const showLoader = () => {
    console.log('Loading...')
  }

  const sorted = () => {
    let allWords = getActiveGroups()

    if (action == 'order') {
      return allWords
    } else {
      let sorted = [].concat(allWords)
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
    }
  }

  const getActiveGroups = () => {
    if (group != 0) {
      let reduced = words.reduce((words, word) => {
        for (let i = 0; i < group.length; i++) {
          if (word.group_id == group[i]) {
            words.push(word)
          }
        }

        return words
      }, [])
      return reduced
    } else {
      return words
    }
  }

  return (
    <Container className={'contentArea'}>
      <Row>
        {sorted().map((word) => (
          <Col
            key={`${word.group_id}` + `${word.id}`}
            className="col-12 col-sm-6 col-md-4 col-lg-3 text-center flashCard"
            id={'word' + word.id}
          >
            <div className="card-inner">
              <div
                className={`side flashCardEnglish ${
                  face == 'english' ? 'show' : 'hide'
                }`}
              >
                <h4>{word.english}</h4>
              </div>
              <div
                className={`side flashCardChinese ${
                  face == 'chinese' ? 'show' : 'hide'
                }`}
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

export default FlipCards
