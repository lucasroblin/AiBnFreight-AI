import {
  addBooking,
  addOffer,
  getAllOffers,
  getBooking,
  getOffer,
} from './Controllers/offerController'
import { addData } from './Utility/ingestData'

const morgan = require('morgan')
const express = require('express')
const cors = require('cors')

const serverApp = express()

serverApp.use(morgan('dev'))
serverApp.use(cors())
serverApp.use(express.json())

// Offers handling :
serverApp.post('/offers', addOffer)
serverApp.get('/offers/:id', getOffer)
serverApp.get('/offers', getAllOffers)

// Bookings handling :
serverApp.post('/bookings', addBooking)
serverApp.get('/bookings/:id', getBooking)

serverApp.get('/parsing', addData) //Test ingestData
module.exports = serverApp
