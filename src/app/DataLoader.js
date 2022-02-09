import React from 'react'
import db from './base'

const fetchWords = async () => {
  const items = []
  const response = db.collection('words')
  const data = await response.get()

  data.docs.forEach((word) => {
    items.push({
      id: word.data().id,
      english: word.data().english,
      chinese: word.data().chinese,
    })
  })
  return items
}

export default fetchWords
