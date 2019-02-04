import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'

const styles = {
  bar: {
    height: 8,
    width: '100%'
  }
}

class ProgressBar extends React.Component {
  render() {
    const { classes, color, variant, className, progress } = this.props
    
    return (
      <LinearProgress
        color={color}
        variant={variant}
        value={progress}
        className={cn(classes.bar, className)}
      />
    )
  }
}

ProgressBar.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.string,
  variant: PropTypes.string,
  className: PropTypes.string,
  progress: PropTypes.number
}

export default withStyles(styles)(ProgressBar)
