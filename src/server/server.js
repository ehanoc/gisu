import http from 'http'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import config from './config.json'

import api from './api'

const bundlesServer = 'http://localhost:8081'

const app = express()
app.server = http.createServer(app)

// logger
app.use(morgan('dev'))

// 3rd party middleware
app.use(cors({
	exposedHeaders: config.corsHeaders
}))

app.use(bodyParser.json({
	limit : config.bodyLimit
}))

app.set('view engine', 'pug')

app.use(express.static(`${__dirname}/static`))

app.use(api)

app.get('/', (req, res) => {
	res.render('index.pug', {
		bundlesServer,
		title: 'Story Builder'
	})
})


app.server.listen(process.env.PORT || config.port, () => {
  console.log(`Started on port ${app.server.address().port}`)
})

export default app
