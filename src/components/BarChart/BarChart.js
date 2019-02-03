import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { scaleBand, scaleLinear } from 'd3-scale'

import Axes from './Axes/Axes'
import Bars from './Bars/Bars'
import data from '../../wild-pig-data.json'

class BarChart extends Component {
  constructor() {
    super()
    this.xScale = scaleBand()
    this.yScale = scaleLinear()
    this.data = data['PIG POPULATIONS']
    console.log(this.data)
  }

  render() {
    const margins = { top: 50, right: 20, bottom: 100, left: 60 }
    const svgDimensions = { width: 800, height: 500 }

    const maxValue = Math.max(...this.data.map(d => d.pigPopulation))
    console.log(maxValue)
    const xScale = this.xScale
      .padding(0.5)
      .domain(this.data.map(d => d.island))
      .range([margins.left, svgDimensions.width - margins.right])
    const yScale = this.yScale
      .domain([0, maxValue])
      .range([svgDimensions.height - margins.bottom, margins.top])

    return (
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
    )
  }
}

BarChart.propTypes = {
  parentWidth: PropTypes.string,
}

export default BarChart