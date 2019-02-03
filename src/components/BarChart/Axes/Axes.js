import React from 'react'
import PropTypes from 'prop-types'
import Axis from '../Axis/Axis'

const Axes = (props) => {
  const { scales, margins, svgDimensions } = props
  const { height, width } = svgDimensions

  const xProps = {
    orient: 'Bottom',
    scale: scales.xScale,
    translate: `translate(0, ${height - margins.bottom})`,
    tickSize: height - margins.top - margins.bottom,
  }

  const yProps = {
    orient: 'Left',
    scale: scales.yScale,
    translate: `translate(${margins.left}, 0)`,
    tickSize: width - margins.left - margins.right,
  }

  return (
    <g>
      <Axis {...xProps} />
      <Axis {...yProps} />
    </g>
  )
}

Axes.propTypes = {
  scales: PropTypes.object,
  margins: PropTypes.object,
  svgDimensions: PropTypes.object,
}

export default Axes
