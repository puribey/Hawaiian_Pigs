import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { scaleBand, scaleLinear } from 'd3-scale'

import Axes from './Axes/Axes'
import Bars from './Bars/Bars'
import Button from '../Button/Button'
import ProgressBar from '../ProgressBar/ProgressBar'

import {getYears} from './helpers'
import data from '../../wild-pig-data.json'
import './statics/styles.css'
let progressInterval

class BarChart extends Component {
  constructor() {
    super()
    this.data = data['PIG POPULATIONS']

    // Get all the info I need from data
    const listOfYears = getYears(this.data)
    const totalYears = listOfYears.length
    const percentPerYear = Number((100/totalYears).toFixed(2))
    const minYear = Math.min(...listOfYears)
    const maxYear = Math.max(...listOfYears)

    this.state = {
      maxYear,
      minYear,
      progress: percentPerYear,
      percentPerYear
    }
  }

  calculateStartPoint(yearFrom) {
    const {minYear, progress} = this.state
    const value = yearFrom - minYear + 1
    return value > 0 ? value * progress : progress
  }

  componentWillMount() {
    const yearFrom = 2000

    const progress = this.calculateStartPoint(yearFrom) // calculate where to start in %

    const isPaused = false

    this.setState({yearFrom, isPaused, progress})
  }

  componentDidMount() {
    const {isPaused} = this.state
    if(isPaused === false) {
      this.startProgress()
    }
  }

  handleActionClick = () => {
    const {isPaused} = this.state
    console.log(isPaused)
    this.setState({isPaused: !isPaused})
    isPaused
      ? this.startProgress()
      : this.stopProgress()
  }

  handleReset = () => {
    const {percentPerYear, minYear} = this.state
    this.setState({
      yearFrom: minYear,
      progress: percentPerYear
    })
    this.stopProgress()
    this.startProgress()
  }

  startProgress = () => progressInterval = setInterval(() => { this.moveGraphicOneYear() }, 2000)
  stopProgress = () => clearTimeout(progressInterval)

  moveGraphicOneYear() {
    const {yearFrom, maxYear, progress, percentPerYear} = this.state
    if(yearFrom < maxYear) {
      this.setState({yearFrom: this.state.yearFrom + 1, progress: progress + percentPerYear })
    } else {
      this.setState({noMoreData: true, isPaused: true})
      this.stopProgress()
    }
  }

  render() {
    const { isPaused, progress } = this.state
    const margins = { top: 50, right: 20, bottom: 100, left: 60 }
    const svgDimensions = { width: 800, height: 600 }

    const maxValue = Math.max(...this.data.map(d => d.pigPopulation))

    // Creating scales for x and y with d3
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
          {isPaused && <Button variant="outlined" color="primary" icon="play_arrow" onClick={this.handleActionClick} />}
          {!isPaused && <Button variant="outlined" color="secondary" icon="paused" onClick={this.handleActionClick} />}
          <Button variant="outlined" icon="refresh" onClick={this.handleReset}/>
          <ProgressBar progress={progress} variant="determinate" color="secondary"/>
        </div>
      </div>
    )
  }
}

BarChart.propTypes = {
  parentWidth: PropTypes.string,
}

export default BarChart