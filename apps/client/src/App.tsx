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
import { Modal, FloatButton } from 'antd';


export default function App() {
  const [data, setData] = useState<Offer[]>([])
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null)
  const [drawerState, setDrawerState] = useState(false)

  async function getData() {
    const data = await api.getOffers()
    setData(data)
  }

  useEffect(() => {
    getData()
  }, [])

  const onOfferSelect = useCallback((offer: Offer) => {
    setSelectedOffer(offer)
    setDrawerState(true)
  }, [])

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
    setDrawerState(false)
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };



  function formatNumber(num: number): string {
    const numStr = num.toString();

    if (numStr.length === 3 || numStr.length === 4) {
      return (num / 100).toFixed(2)
    }

    return numStr
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
                <div className='flex justify-center '>
                  <Card
                    className="py-6 hover:scale-[102%] max-w-[70%] min-w-[70%]"
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
                        {formatNumber(offer.price)}€/Kg
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
                        <Button disabled={!offer.bookable} onClick={(e) => { e.preventDefault(); e.stopPropagation(); showModal() }}>Book</Button>
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


      <FloatButton className="hover:scale-[120%] font-bold" tooltip={<div>Create a new offer</div>} description="New Offer" shape="circle" style={{ insetInlineEnd: 94 }} onClick={showModal} />
      <Modal title="Enter your new offer" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div className="flex flex-col gap-">
          <div>
            <p>Departure : </p>
            <input placeholder="Enter departure airport ..."></input>
          </div>
          <div>
            <p>Arrival : </p>
            <input placeholder="Enter airport of destination ..."></input>
          </div>
          <div>
            <p>Weight : </p>
            <input placeholder="Enter chargeable weigth ..."></input>
          </div>
          <div>
            <p>ETD : </p>
            <input placeholder="Enter ETD ..."></input>
          </div>
          <div>
            <p>ETA :</p>
            <input placeholder="Enter ETA ..."></input>
          </div>
          <div>
            <p>Price :</p>
            <input placeholder="Enter price of freight ..."></input>
          </div>
        </div>

      </Modal>
    </>
  )
}
