import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { scaleLinear } from 'd3-scale'
import { interpolateLab } from 'd3-interpolate'

export default class Bars extends Component {
  constructor(props) {
    super(props)

    this.colorScale = scaleLinear()
      .domain([0, this.props.maxValue])
      .range(['#D1C4E9', '#512DA8'])
      .interpolate(interpolateLab)
  }

  render() {
    const { scales, margins, data, svgDimensions } = this.props
    const { xScale, yScale } = scales
    const { height } = svgDimensions

    const bars = data.map((datum,i) => (
      <rect
        key={i}
        x={xScale(datum.island)}
        y={yScale(datum.pigPopulation)}
        height={height - margins.bottom - scales.yScale(datum.pigPopulation)}
        width={xScale.bandwidth()}
        fill={this.colorScale(datum.pigPopulation)}
      />
    ))

    return <g>{bars}</g>
  }
}

Bars.propTypes = {
  scales: PropTypes.object,
  margins: PropTypes.object,
  data: PropTypes.array,
  svgDimensions: PropTypes.object,
  maxValue: PropTypes.number,
}