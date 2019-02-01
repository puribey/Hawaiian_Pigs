import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'

const MaterialButton = props => {
  const { onClick, text, className, variant, color, icon } = props
  return (
    <Button
      variant={variant}
      color={color}
      onClick={onClick}
      className={className}
    >
      {text && text}
      {icon && <Icon>{icon}</Icon>}
    </Button>
  )
}

MaterialButton.propTypes = {
  color: PropTypes.string,
  variant: PropTypes.string,
  text: PropTypes.string,
  icon: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string
}

export default MaterialButton
