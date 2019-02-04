import React, {Component} from 'react'
import BarChart from '../../components/BarChart/BarChart'

import './statics/styles.css'

class Main extends Component {
  render() {
    return (
      <div className="main-container">
        <div className="main-info">
          <div className="main-header">
            <h1>Hawaiian Pig Visualization</h1>
            <p>By PuriBey</p>
          </div>
          <div className="main-chart">
          <BarChart {...this.props}/>
          </div>
        </div>
      </div>
    )
  }
}

export default Main
