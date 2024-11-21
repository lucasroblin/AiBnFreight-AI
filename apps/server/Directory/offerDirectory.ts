import { Booking, Offer, PrismaClient } from '@prisma/client'
import e from 'express'
const prisma = new PrismaClient()

export async function addOffer(
  departure: string,
  arrival: string,
  weight: number,
  etd: string,
  eta: string,
  price: number,
  notes: string
): Promise<void> {
  const formattedEtd =
    new Date(etd.split('-').reverse().join('-')).toISOString().split('T')[0] +
    'T12:00:00'
  const formattedEta =
    new Date(eta.split('-').reverse().join('-')).toISOString().split('T')[0] +
    'T12:00:00'
  await prisma.offer.create({
    data: {
      departureId: departure,
      arrivalId: arrival,
      weight,
      etd: formattedEtd,
      eta: formattedEta,
      price,
      availableWeight: weight,
      notes,
    },
  })
}

export async function getOffer(id: number): Promise<Offer | undefined | null> {
  return await prisma.offer.findUnique({
    where: {
      id: id,
    },
    include: {
      bookings: true,
      departure: true,
      arrival: true,
    },
  })
}

export async function getAllOffers(limit = 10, page = 0): Promise<any> {
  return await prisma.offer.findMany({
    include: {
      bookings: true,
    },
    take: limit,
    skip: page * limit,
  })
}

export async function addBooking(
  weight: number,
  status: string,
  offerId: number
): Promise<any> {
  const offerData = await prisma.offer.findUnique({
    //Get availableWeight and bookable from the needed offer
    where: {
      id: offerId,
    },
    select: {
      availableWeight: true,
      bookable: true,
    },
  })
  if (!!offerData) {
    console.log('Entered !!offerData')
    //If it's not undefined or null
    const { availableWeight, bookable } = offerData
    if (!bookable || availableWeight - weight < 0) {
      //If offer is not bookable OR weight of the booking is > to available weight of the offer, can't add booking
      return false
    }
  }
  await prisma.booking.create({
    data: {
      weight,
      status,
      offerId,
    },
  })
  await prisma.offer.update({
    //Update offer's availableWeight with the new weight from the booking
    where: {
      id: offerId,
    },
    data: {
      availableWeight: {
        decrement: weight,
      },
    },
  })
  return true
}

export async function getBooking(
  id: number
): Promise<Booking | undefined | null> {
  return await prisma.booking.findUnique({
    where: {
      id: id,
    },
    include: {
      offer: true,
    },
  })
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
