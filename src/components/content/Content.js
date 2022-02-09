import './content.css'
import React from 'react'
import { Container } from 'react-bootstrap'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useSelector } from 'react-redux'
import LoadBar from '../spinner/LoadBar'
import { useEffect, useState } from 'react'

const Content = () => {
  const words = useSelector((state) => state.root.data.dataArray)
  const [loadBar, setLoadBar] = useState('show')

  useEffect(() => {
    showLoader()
  }, [words])

  const showLoader = () => {
    setTimeout(() => {
      setLoadBar('hide')
    }, 1000)
  }

  return (
    <Container className={'contentArea'}>
      <LoadBar status={loadBar} message="Loading" />
      <Row>
        {words.map((word) => (
          <Col
            key={word.id}
            className="col-4 text-center p-1"
            id={'word' + word.id}
          >
            <div className="border border-info">{word.english}</div>
            <div className="border border-info mb-3">{word.chinese}</div>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default Content
