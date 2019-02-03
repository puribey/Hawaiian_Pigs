import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { scaleBand, scaleLinear } from 'd3-scale'

import Axes from './Axes/Axes'
import Bars from './Bars/Bars'
import Button from '../Button/Button'
import ProgressBar from '../ProgressBar/ProgressBar'

import data from '../../wild-pig-data.json'
import './statics/styles.css'

class BarChart extends Component {
  constructor() {
    super()
    this.data = data['PIG POPULATIONS']
  }

  render() {
    const margins = { top: 50, right: 20, bottom: 100, left: 60 }
    const svgDimensions = { width: 800, height: 600 }

    const maxValue = Math.max(...this.data.map(d => d.pigPopulation))

    // Creating scales for x and y
    const xScale = scaleBand()
      .padding(0.4)
      .domain(this.data.map(d => d.island))
      .range([margins.left, svgDimensions.width - margins.right])
    const yScale = scaleLinear()
      .domain([0, maxValue])
      .range([svgDimensions.height - margins.bottom, margins.top])

    return (
      <div>
        <div>
          <svg width={svgDimensions.width} height={svgDimensions.height}>
            <Axes
              scales={{ xScale, yScale }}
              margins={margins}
              svgDimensions={svgDimensions}
            />
            <Bars
              scales={{ xScale, yScale }}
              margins={margins}
              data={this.data}
              maxValue={maxValue}
              svgDimensions={svgDimensions}
            />
          </svg>
        </div>
        <div className="chart-actions">
          <Button variant="outlined" color="primary" icon="play_arrow" />
          <Button variant="outlined" icon="refresh"/>
          <ProgressBar variant="determinate" color="secondary"/>
        </div>
      </div>
    )
  }
}

BarChart.propTypes = {
  parentWidth: PropTypes.string,
}

export default BarChart