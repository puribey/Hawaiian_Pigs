import React from 'react'
import BarChart from '../../components/BarChart/BarChart'

import './statics/styles.css'

const Main = props => {
  return (
    <div className="main-container">
      <div className="main-info">
        <div className="main-header">
          <h1>Hawaiian Pig Visualization</h1>
          <p>By PuriBey</p>
        </div>
        <div>
        <BarChart {...props}/>
        </div>
      </div>
    </div>
  )
}

export default Main
