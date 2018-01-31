const http = require('http')
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const config = require('./config.json')

const api = require('./api')

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
  res.redirect('/story-builder/')
})

app.get('/story-builder/', (req, res) => {
  res.render('story-builder.pug', { title: 'Story Builder' })
})


app.server.listen(process.env.PORT || config.port, () => {
  console.log(`Started on port ${app.server.address().port}`)
})

module.exports = app
