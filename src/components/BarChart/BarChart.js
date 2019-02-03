import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { scaleBand, scaleLinear } from 'd3-scale'

class BarChart extends Component {
  constructor() {
    super()
    this.xScale = scaleBand()
    this.yScale = scaleLinear()
  }

  render() {
    const svgDimensions = {
      width: Math.max(this.props.parentWidth, 300),
      height: 500,
    }

    return (
      <svg width={svgDimensions.width} height={svgDimensions.height}>
      </svg>
    )
  }
}

BarChart.propTypes = {
  parentWidth: PropTypes.string,
}

export default BarChart