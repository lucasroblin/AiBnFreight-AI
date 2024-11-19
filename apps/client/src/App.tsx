import Box from '@mui/joy/Box'
import Button from '@mui/joy/Button'
import Typography from '@mui/joy/Typography'
import Stack from '@mui/joy/Stack'
import Drawer from '@mui/joy/Drawer'
import { useCallback, useEffect, useState } from 'react'
import * as api from '@/lib/api-client'
import { Offer } from '@/lib/api-client'
import { FlightPath } from './components/FlightPath'
import { Card, CardContent } from './components/ui/card'

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
                <Card
                  className="py-6"
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
            <div className="p-6">
              <Card>
                <CardContent className="pt-6">
                  <FlightPath offer={selectedOffer} />
                </CardContent>
              </Card>
            </div>
          )}
        </Drawer>
      </Box>
    </>
  )
}
