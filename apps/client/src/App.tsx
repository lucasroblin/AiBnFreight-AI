import Box from '@mui/joy/Box'
import Button from '@mui/joy/Button'
import Typography from '@mui/joy/Typography'
import Stack from '@mui/joy/Stack'
import Drawer from '@mui/joy/Drawer'
import { useCallback, useEffect, useState } from 'react'
import * as api from '@/lib/api-client'
import { Offer } from '@/lib/api-client'
import { FlightPath } from './components/FlightPath'
import { OffersNotes } from './components/OffersNotes'
import { Card, CardContent } from './components/ui/card'
import { OffersWeight } from './components/OffersWeight'
import { OffersEtd } from './components/OffersETD'
import { OffersEta } from './components/OffersETA'
import { OffersAvailableWeight } from './components/OffersAvailableWeight'
import { OffersPrice } from './components/OffersPrice'

export default function App() {
  const [data, setData] = useState<Offer[]>([])
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null)
  const [loading, setLoading] = useState(true)
  const [drawerState, setDrawerState] = useState(false)

  async function getData() {
    const data = await api.getOffers()
    setData(data)
  }

  useEffect(() => {
    getData()
    setLoading(false)
  }, [])

  const onOfferSelect = useCallback((offer: Offer) => {
    setSelectedOffer(offer)
    setDrawerState(true)
  }, [])

  if (loading) {
    return <p>Loading ...</p>
  }
  return (
    <>
      <Box
        sx={{
          p: 2,
          height: '100vh',
        }}
      >
        <Stack direction={'column'} spacing={2}>
          {data
            .filter((offer) => offer.bookable)
            .map((offer) => {
              return (
                <div className='flex justify-center bg-black'>
                  <Card
                    className="py-6 hover:scale-[102%] max-w-[60%]"
                    color={'neutral'}
                    onClick={() => onOfferSelect(offer)}
                  >
                    <Stack
                      direction="row"
                      spacing={2}
                      sx={{
                        justifyContent: 'space-around',
                        alignItems: 'center',
                      }}
                    >
                      <FlightPath offer={offer} />
                      <Typography textAlign={'left'}>
                        {offer.weight} Kg
                      </Typography>
                      <Typography textAlign={'left'}>
                        {new Date(offer.etd).toLocaleDateString()}
                      </Typography>
                      <Typography textAlign={'left'}>
                        {new Date(offer.eta).toLocaleDateString()}
                      </Typography>
                      <Typography textAlign={'left'}>
                        {offer.price}€/Kg
                      </Typography>
                      <Typography textAlign={'left'}>
                        {offer.availableWeight}Kg
                      </Typography>
                      <Stack direction={'row'} spacing={0.5}>
                        <Button
                          color="neutral"
                          onClick={() => onOfferSelect(offer)}
                        >
                          Open
                        </Button>
                        <Button disabled={!offer.bookable}>Book</Button>
                      </Stack>
                    </Stack>
                  </Card>
                </div>
              )
            })}
        </Stack>

        <Drawer
          size="md"
          anchor={'right'}
          open={drawerState}
          onClose={() => setDrawerState(false)}
        >
          {selectedOffer && (
            <div className="p-6 flex flex-col gap-2">

              <Card>
                <CardContent className='pt-6'>
                  <OffersNotes offer={selectedOffer} />
                </CardContent>
              </Card>

              <Card className='min-h-28 flex justify-center items-center'>
                <CardContent className="pt-6">
                  <FlightPath offer={selectedOffer} />
                </CardContent>
              </Card>

              <Card className='min-h-28 flex justify-center items-center'>
                <CardContent className="pt-6">
                  <OffersWeight offer={selectedOffer} />
                </CardContent>
              </Card>

              <Card className='min-h-28 flex justify-center items-center'>
                <CardContent className="pt-6">
                  <OffersEtd offer={selectedOffer} />
                </CardContent>
              </Card>

              <Card className='min-h-28 flex justify-center items-center'>
                <CardContent className="pt-6">
                  <OffersEta offer={selectedOffer} />
                </CardContent>
              </Card>

              <Card className='min-h-28 flex justify-center items-center'>
                <CardContent className="pt-6">
                  <OffersAvailableWeight offer={selectedOffer} />
                </CardContent>
              </Card>

              <Card className='min-h-28 flex justify-center items-center'>
                <CardContent className="pt-6">
                  <OffersPrice offer={selectedOffer} />
                </CardContent>
              </Card>

            </div>
          )}
        </Drawer>
      </Box>
    </>
  )
}
