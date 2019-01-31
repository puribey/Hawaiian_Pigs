import React from 'react'
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

export default MaterialButton
