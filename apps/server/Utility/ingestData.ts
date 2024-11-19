import { Request, Response } from 'express'
import mockData from './files/mock_data.json'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function addData(req?: Request, res?: Response): Promise<void> {
  await prisma.offer.deleteMany({})
  await prisma.booking.deleteMany({})
  await prisma.airport.deleteMany({})

  const { airports, offers, bookings } = mockData

  //Adding airports
  const modelAirports = airports.map((airport) => ({
    iata: airport.code,
    name: airport.name,
    city: airport.city,
    country: airport.country,
  }))
  await prisma.airport.createMany({
    data: modelAirports,
  })

  //Adding models
  const modelOffers = offers.map((offer) => ({
    departureId: offer.departure,
    arrivalId: offer.arrival,
    weight: offer.weight_limit,
    etd: offer.etd,
    eta: offer.eta,
    bookable: offer.bookable,
    notes: offer.notes,
    price: offer.price,
    availableWeight: offer.weight_limit,
  }))

  await prisma.offer.createMany({
    data: modelOffers,
  })

  // Adding bookings
  const modelBookings = bookings.map((booking) => ({
    weight: booking.weight,
    status: booking.status,
    timestamp: new Date(booking.timestamp.split('T')[0]),
    offerId: booking.offer_id,
  }))

  await prisma.booking.createMany({
    data: modelBookings,
  })

  if (res) {
    res.json('Data added sucessfully')
  }
}
