export interface Offer {
  id: number
  departureId: string
  arrivalId: string
  weight: number
  availableWeight: number
  notes: string
  etd: Date
  eta: Date
  bookable: boolean
  price: number
}

export async function getOffers() {
  const response = await fetch('http://localhost:8080/offers')
  const rawResponse = await response.json()
  const data = rawResponse.data
  data.forEach(processOffer)
  return data as Offer[]
}

function processOffer(offer: Offer) {
  offer.etd = new Date(offer.etd)
  offer.eta = new Date(offer.eta)
}
