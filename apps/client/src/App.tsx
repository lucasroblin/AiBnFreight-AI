import Box from '@mui/joy/Box'
import Button from '@mui/joy/Button'
import Typography from '@mui/joy/Typography'
import Stack from '@mui/joy/Stack'
import { useCallback, useEffect, useState } from 'react'
import * as api from '@/lib/api-client'
import { Offer } from '@/lib/api-client'
import { FlightPath } from './components/FlightPath'
import { Card } from './components/ui/card'
import { FloatButton } from 'antd'
import { MenuBar } from './components/MenuBar'
import { SearchBar } from './components/SearchBar'
import ModalComponent from './components/ModalComponent'
import SuccessModalComponent from './components/SuccessModalComponent'
import InfoDrawer from './components/InfoDrawer'

export default function App() {
  const [allData, setAllData] = useState<Offer[]>([])
  const [filteredData, setFilteredData] = useState<Offer[]>([])
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null)
  const [drawerState, setDrawerState] = useState(false)
  const [selectedWeight, setSelectedWeight] = useState<number>(0)

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  async function getData() {
    const data = await api.getOffers()
    setAllData(data)
    setFilteredData(data)
  }

  useEffect(() => {
    getData()
  }, [])

  const onOfferSelect = useCallback((offer: Offer) => {
    setSelectedOffer(offer)
    setDrawerState(true)
  }, [])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const showModal = () => {
    setIsModalOpen(true)
    setDrawerState(false)
  }
  const handleOk = () => {
    setIsModalOpen(false)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const showSuccessModal = () => {
    setIsSuccessModalOpen(true)
  }

  const handleSuccessOk = () => {
    setIsSuccessModalOpen(false)
  }

  const isTrue = () => {
    showSuccessModal()
  }

  async function filterFlights(departure: string, arrival: string, weight: string) {
    const parsedWeight = weight ? parseFloat(weight) : null

    const newData = allData.filter((offer) => {
      const matchesDeparture = departure ? offer.departureId === departure : true
      const matchesArrival = arrival ? offer.arrivalId === arrival : true
      const matchesWeight = parsedWeight !== null ? offer.availableWeight >= parsedWeight : true

      return matchesDeparture && matchesArrival && matchesWeight
    })

    setFilteredData(newData)
    setCurrentPage(1)
    console.log(`From ${departure || 'anywhere'} to ${arrival || 'anywhere'} with a weight of ${weight || 'any amount'}`)
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  return (
    <>
      <Box
        sx={{
          p: 2,
          height: '100vh',
        }}
      >
        <div className="flex items-center">
          <MenuBar showModal={showModal} className="z-10" />
          <p className="flex-grow text-center font-bold text-4xl">AirBnFreight.AI</p>
        </div>

        <SearchBar filterFlights={filterFlights} />
        <InfoDrawer drawerState={drawerState} setDrawerState={setDrawerState} selectedOffer={selectedOffer} selectedWeight={selectedWeight} setSelectedWeight={setSelectedWeight} />

        <div className="flex justify-center mt-4">
          <div className="grid grid-cols-4 gap-4 max-w-[70%] min-w-[70%]">
            <Typography textAlign="center" className="font-bold">
              Flight's Path
            </Typography>
            <Typography textAlign="center" className="font-bold">
              ETD
            </Typography>
            <Typography textAlign="center" className="font-bold">
              ETA
            </Typography>
            <Typography textAlign="center" className="font-bold">
              Available Weight
            </Typography>
          </div>
        </div>

        <Stack direction="column" spacing={2}>
          {paginatedData
            .filter((offer) => offer.bookable)
            .map((offer) => {
              return (
                <div className="flex justify-center">
                  <Card
                    className="py-6 hover:scale-[102%] hover:shadow-lg transition-shadow duration-300 max-w-[70%] min-w-[70%]"
                    color="neutral"
                    onClick={() => onOfferSelect(offer)}
                  >
                    <div className="grid grid-cols-4 gap-4">
                      <FlightPath offer={offer} />
                      <Typography textAlign="center">
                        {new Date(offer.etd).toLocaleDateString()}
                      </Typography>
                      <Typography textAlign="center">
                        {new Date(offer.eta).toLocaleDateString()}
                      </Typography>
                      <Typography textAlign="center">
                        {offer.availableWeight}Kg
                      </Typography>
                    </div>
                  </Card>
                </div>
              );
            })}
        </Stack>

        <div className="flex justify-center gap-4 mt-4">
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Typography className="text-lg">
            Page {currentPage} of {Math.ceil(filteredData.length / itemsPerPage)}
          </Typography>
          <Button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(filteredData.length / itemsPerPage)))
            }
            disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage)}
          >
            Next
          </Button>
        </div>
      </Box>

      <FloatButton
        className="hover:scale-[120%] font-bold"
        tooltip={<div>Create a new offer</div>}
        description="New Offer"
        shape="circle"
        style={{
          insetInlineEnd: 94,
          width: 80,
          height: 80,
          fontSize: '1.25rem',
        }}
        onClick={showModal}
      />
      <ModalComponent isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} isTrue={isTrue}></ModalComponent>
      <SuccessModalComponent isSuccessModalOpen={isSuccessModalOpen} handleSuccessOk={handleSuccessOk} handleCancel={handleCancel} />
    </>
  );
}
