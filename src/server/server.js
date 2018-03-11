import http from 'http'
import express from 'express'
import config from './config.json'
import configure from './configure'

import api from './api'

// URL used to get bundles (webpack dev server)
const bundleUrl = 'http://localhost:8081/bundles'

// App creation
const app = express()
app.server = http.createServer(app)

// Configure application
configure(app)

// Setup API routes
app.use(api)

// Main route for application
app.get('/', (req, res) => {
	res.render('index.pug', {
		bundleUrl,
		title: 'Story Builder'
	})
})

// Start server
app.server.listen(process.env.PORT || config.port, () => {
  console.log(`Started on port ${app.server.address().port}`)
})

export default app
