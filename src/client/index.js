console.log(`v${BUILD_VERSION} - Built on ${BUILD_DATE}`)

import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './App'

/**
 * Client entrypoint
 *
 * Renders the application and enables hot replacement
 * for development purposes.
 */

const render = Component =>
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>
    ,
    document.getElementById('root')
  )

render(App)

if (module.hot) {
  module.hot.accept('./App', () => { render(App) })
}
