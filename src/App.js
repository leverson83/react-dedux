import './css/variables.css'
import './css/bootstrap5.css'
import './css/app.css'

import React from 'react'
import Navigation from './components/navigation/Navigation'
import Content from './components/content/Content'

function App() {
  return (
    <div className="App">
      <Navigation />
      <Content />
    </div>
  )
}

export default App
