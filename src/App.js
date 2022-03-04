import './css/variables.css'
import './css/bootstrap5.css'
import './css/app.css'

import React from 'react'
import Navigation from './components/navigation/Navigation'
import FlipCards from './components/flipCards/FlipCards'
import { useEffect } from 'react'
import { loadRemote, loadGroups } from './components/root/rootSlice'
import { useDispatch, useSelector } from 'react-redux'
import db from './app/base'
import Create from './components/create/Create'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import MatchController from './components/match/MatchController'

function App() {
  const dispatch = useDispatch()
  const newData = useSelector((state) => state.root.data.loaded)

  const fetchCollection = async (collection) => {
    const items = []
    const groups = []
    const response = db.collection(`${collection}`)
    const data = await response.get()

    data.docs.forEach((word) => {
      items.push({
        group_id: word.data().group_id,
        id: word.data().id,
        english: word.data().english,
        chinese: word.data().chinese,
      })
      groups.push(word.data().group_id)
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
            <FlipCards />
          </Route>
          <Route path="/create">
            <Create />
          </Route>
          <Route path="/match">
            <MatchController />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
