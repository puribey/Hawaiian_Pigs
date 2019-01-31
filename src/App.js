import React, { Component } from 'react'
import pigData from './wild-pig-data.json'
import './App.css'
import Button from './components/Button/Button'

class App extends Component {
  render() {
    return (
      <div className="App">
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Button variant="outlined" color="primary" icon="play_arrow" text="play"/>
        <table>
          <tbody>
            <tr>
              <th>Year</th>
              <th>Island</th>
              <th>Population</th>
            </tr>
            {pigData['PIG POPULATIONS'].map((datum, index) => (
              <tr key={index}>
                <td>{datum.year}</td>
                <td>{datum.island}</td>
                <td>{datum.pigPopulation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default App
