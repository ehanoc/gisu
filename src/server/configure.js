import morgan from 'morgan'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import config from './config.json'


exports default (app) => {
  // Setup logger
  app.use(morgan('dev'))

  // 3rd party middleware
  app.use(cors({
  	exposedHeaders: config.corsHeaders
  }))

  // Setup body parser
  app.use(bodyParser.json({
  	limit : config.bodyLimit
  }))

  // Set template engine
  app.set('view engine', 'pug')

  // Set static files directory
  app.use(express.static(`${__dirname}/static`))
}
