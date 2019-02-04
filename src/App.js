import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Main from './pages/Main/Main'

const App = () => (
  <Router>
    <Route path="/:paused?:year?" component={Main} />
  </Router>
)

export default App
