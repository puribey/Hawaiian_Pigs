import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { scaleBand, scaleLinear } from 'd3-scale'
import * as queryString from 'query-string'

import ResponsiveWrapper from './ResponsiveWrapper/ResponsiveWrapper'
import Axes from './Axes/Axes'
import Bars from './Bars/Bars'
import Button from '../Button/Button'
import ProgressBar from '../ProgressBar/ProgressBar'

import {getYears, validateYear} from './helpers'
import data from '../../wild-pig-data.json'
import './statics/styles.css'
let progressInterval

class BarChart extends Component {
  constructor() {
    super()
    this.data = data['PIG POPULATIONS']

    // get all the info I need from data
    const listOfYears = getYears(this.data)
    const totalYears = listOfYears.length
    const percentPerYear = Number((100/totalYears).toFixed(2))
    const minYear = Math.min(...listOfYears)
    const maxYear = Math.max(...listOfYears)

    this.state = {
      maxYear,
      minYear,
      progress: percentPerYear,
      percentPerYear, 
      listOfYears
    }
  }

  calculateStartPoint(yearFrom) {
    const {minYear, percentPerYear} = this.state
    const value = yearFrom - minYear + 1
    return value > 0 ? value * percentPerYear : percentPerYear
  }

  componentWillMount() {
    const {minYear} = this.state
    const {paused, year} = queryString.parse(this.props.location.search) // using queryString library to get params from url
    const yearFrom = validateYear(year, minYear) // validate param year

    const progress = this.calculateStartPoint(yearFrom) // calculate where to start in %

    const isPaused = paused ? paused === 'true' : false // check is param paused is true

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

  handleChangeDate = date => {
    this.stopProgress()
    this.setState({
      yearFrom: date,
      progress: this.calculateStartPoint(date),
      isPaused: true
    })
  }

  startProgress = () => progressInterval = setInterval(() => { this.moveGraphicOneYear() }, 2000) // moving to next year every 2 seconds
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
    const {parentWidth} = this.props
    const { isPaused, progress, yearFrom, listOfYears } = this.state

    const margins = { top: 80, right: 20, bottom: 100, left: 60 }
    const svgDimensions = { width: parentWidth, height: 500 }

    // filter years and set it equal to the year which is now selected
    const maxValue = Math.max(...this.data.filter(item => item.year === yearFrom).map(d => d.pigPopulation)) + 1000

    // creating scales for x and y with d3
    const xScale = scaleBand()
      .padding(0.5)
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
          <div className="chart-actions-progress">
            {isPaused && <Button variant="outlined" color="primary" icon="play_arrow" onClick={this.handleActionClick} />}
            {!isPaused && <Button variant="outlined" color="secondary" icon="paused" onClick={this.handleActionClick} />}
            <Button variant="outlined" icon="refresh" onClick={this.handleReset}/>
            <ProgressBar progress={progress} variant="determinate" color="secondary" className="progress-bar"/>
          </div>
          <div className="chart-actions-years">
            {listOfYears.map((item, i) => (
              <Button key={i} text={item} variant={item === yearFrom ? "contained" : "outlined"} color="primary" className="year-button" onClick={() => this.handleChangeDate(item)}/>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

BarChart.propTypes = {
  parentWidth: PropTypes.string,
}

export default ResponsiveWrapper(BarChart)