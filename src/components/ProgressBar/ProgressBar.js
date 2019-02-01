import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'
import './statics/styles.css'

const styles = {
  bar: {
    height: 8,
    width: '100%'
  }
}

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
    const { classes, color, variant, className } = this.props
    return (
      <LinearProgress
        color={color}
        variant={variant}
        value={this.state.completed}
        className={cn(classes.bar, className)}
      />
    )
  }
}

ProgressBar.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.string,
  variant: PropTypes.string,
  className: PropTypes.string
}

export default withStyles(styles)(ProgressBar)
