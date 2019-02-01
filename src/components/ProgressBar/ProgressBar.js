import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import LinearProgress from '@material-ui/core/LinearProgress'
import './statics/styles.css'

class ProgressBar extends React.Component {
  state = {
    completed: 0
  }

  componentDidMount() {
    this.timer = setInterval(this.progress, 500)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  progress = () => {
    const { completed } = this.state
    if (completed === 100) {
      this.setState({ completed: 0 })
    } else {
      const diff = Math.random() * 10
      this.setState({ completed: Math.min(completed + diff, 100) })
    }
  }

  render() {
    const { color, variant, className } = this.props
    return (
      <LinearProgress
        color={color}
        variant={variant}
        value={this.state.completed}
        className={cn('bar', className)}
      />
    )
  }
}

ProgressBar.propTypes = {
  color: PropTypes.string,
  variant: PropTypes.string,
  className: PropTypes.string
}

export default ProgressBar
