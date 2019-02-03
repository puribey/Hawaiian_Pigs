import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core'
import { deepPurple, teal } from '@material-ui/core/colors'

const theme = createMuiTheme({
  typography: {
    fontFamily: ['Roboto', 'Arial', 'sans-serif'].join(','),
    useNextVariants: true
  },
  palette: {
    primary: {
      light: deepPurple[100],
      main: deepPurple[500],
      dark: deepPurple[700]
    },
    secondary: {
      main: teal[500]
    }
  }
})

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById('root')
)
