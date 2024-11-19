import { Request, Response } from 'express'
import * as OfferRepository from '../Directory/offerDirectory'
import { Booking, Offer } from '@prisma/client'

export async function addOffer(req: Request, res: Response): Promise<void> {
  const { departure, arrival, weight, etd, eta, price, notes } = req.body
  await OfferRepository.addOffer(
    departure,
    arrival,
    weight,
    etd,
    eta,
    price,
    notes
  )
  res.status(201).json({ statusCode: 201, message: 'Offer added' })
}

export async function getOffer(req: Request, res: Response): Promise<void> {
  const { id } = req.params
  const offer = await OfferRepository.getOffer(Number(id))
  if (!!offer) {
    res.status(201)
    res.json({
      statusCode: 201,
      data: offer,
    })
  } else {
    res.status(404)
    res.json('Offer not found')
  }
}

function computeAvailableWeight(
  totalWeight: number,
  bookings: Booking[]
): number {
  const relevantBooking = bookings.filter(
    (booking) => booking.status !== 'canceled'
  )
  const totalBookedWeight = relevantBooking.reduce(
    (acc, booking) => acc + booking.weight,
    0
  )
  return totalWeight - totalBookedWeight
}

export async function getAllOffers(req: Request, res: Response): Promise<void> {
  const query = req.query
  const page = Number(query.page) || 0
  const limit = Number(query.limit) || 10
  const allOffers = await OfferRepository.getAllOffers(limit, page)
  const enhancedOffers = allOffers?.map((offer: any) => ({
    id: offer.id,
    departureId: offer.departureId,
    arrivalId: offer.arrivalId,
    weight: offer.weight,
    availableWeight: computeAvailableWeight(offer.weight, offer.bookings),
    etd: offer.etd,
    eta: offer.eta,
    bookable: offer.bookable,
    price: offer.price,
    notes: offer.notes,
  }))
  res.status(201)
  res.json({
    statusCode: 201,
    data: enhancedOffers,
    page,
    nextPage: req.path + `?page=${Number(page) + 1}`,
  })
}

export async function addBooking(req: Request, res: Response): Promise<void> {
  const { weight, status, offerId } = req.body
  const adding = await OfferRepository.addBooking(weight, status, offerId)
  if (!adding) {
    res.status(400).json({
      statuscode: 400,
      message: 'Not enough space available or offer non-bookable',
    })
    return
  } else {
    res.status(201).json({ statusCode: 201, message: 'Booking added' })
  }
}

export async function getBooking(req: Request, res: Response): Promise<void> {
  const { id } = req.params
  const booking = await OfferRepository.getBooking(Number(id))
  if (!!booking) {
    res.status(201)
    res.json({
      statusCode: 201,
      data: booking,
    })
  } else {
    res.status(404)
    res.json('Booking not found')
  }
}
