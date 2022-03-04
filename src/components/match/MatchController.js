import React from 'react'
import Match from './Match'
import { useSelector } from 'react-redux'

const MatchController = () => {
  const words = useSelector((state) => state.root.data.dataArray)
  const group = useSelector((state) => state.root.menu.group)

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

  const sorted = () => {
    let allWords = getActiveGroups()

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

  return <Match words={getActiveGroups()} randoms={sorted()} />
}

export default MatchController
