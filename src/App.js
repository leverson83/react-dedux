import './css/variables.css'
import './css/bootstrap5.css'
import './css/app.css'

import React from 'react'
import Navigation from './components/navigation/Navigation'
import Content from './components/content/Content'
import { useEffect } from 'react'
import { loadRemote } from './components/root/rootSlice'
import { useDispatch, useSelector } from 'react-redux'
import db from './app/base'
import PullDown from './components/pullDown/PullDown'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

function App() {
  const dispatch = useDispatch()
  const newData = useSelector((state) => state.root.data.loaded)
  const fetchCollection = async (collection) => {
    const items = []
    const response = db.collection(`${collection}`)
    const data = await response.get()

    data.docs.forEach((word) => {
      items.push({
        group_id: word.data().group_id,
        id: word.data().id,
        english: word.data().english,
        chinese: word.data().chinese,
      })
    })
    dispatch(loadRemote(items))
  }

  useEffect(() => {
    fetchCollection('words')
  }, [newData])

  return (
    <Router>
      <div className="App">
        <Navigation />
        <Switch>
          <Route exact path="/">
            <Content />
          </Route>
          <Route path="/create">
            <PullDown />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
