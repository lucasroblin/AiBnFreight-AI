import { addBooking, addOffer, getAllOffers, getBooking, getOffer } from "./Controllers/offerController"
import { addData } from "./Utility/ingestData"

const morgan = require('morgan')
const express = require('express')
const cors = require('cors')

const serverApp = express()

serverApp.use(morgan('dev'))
serverApp.use(cors())
serverApp.use(express.json())

// Offers handling : 
serverApp.post('/offer', addOffer)
serverApp.get('/offer/:id', getOffer)
serverApp.get('/offers', getAllOffers)

// Bookings handling :
serverApp.post('/booking', addBooking)
serverApp.get('/booking/:id',getBooking)




serverApp.get('/parsing',addData) //Test ingestData
module.exports = serverApp

