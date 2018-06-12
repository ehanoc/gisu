import React from 'react'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import color from './StoryBuilder/utils/color'
import green from 'material-ui/colors/green';
import CssBaseline from 'material-ui/CssBaseline'


/**
 * Optional theme with custom primary and secondary color.
 * You can read more about this on:
 *   https://material-ui-next.com/customization/themes/
 */
const theme = createMuiTheme({
  palette: {
    primary: {
      light: color.primaryLight,
      main: color.primary,
      dark: color.primaryDark,
    },
    secondary: {
      light: green[300],
      main: green[500],
      dark: green[700],
    },
  },
})


/**
 * withRoot
 *
 * High order component to wrap the application with all the global
 * scope helpers.
 */
function withRoot(Component) {
  function WithRoot(props) {
    // MuiThemeProvider makes the theme available down the React tree
    // thanks to React context.
    return (
      <MuiThemeProvider theme={theme}>
        {/* Reboot kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...props} />
      </MuiThemeProvider>
    )
  }

  return WithRoot
}


export default withRoot
