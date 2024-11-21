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
import { FloatButton } from 'antd'
import { MenuBar } from './components/MenuBar'
import { SearchBar } from './components/SearchBar'
import ModalComponent from './components/ModalComponent'
import SuccessModalComponent from './components/SuccessModalComponent'

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
    setFilteredData(data) // Initially show all data
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

  function formatNumber(num: number): string {
    const numStr = num.toString()

    if (numStr.length === 3 || numStr.length === 4) {
      return (num / 100).toFixed(2)
    }

    return numStr
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

        <Drawer
          size="md"
          anchor={'right'}
          open={drawerState}
          onClose={() => setDrawerState(false)}
        >
          {selectedOffer && (
            <div className="p-6 flex flex-col gap-6 h-full">
              <div className="flex-grow">
                <Card>
                  <CardContent className="pt-6">
                    <OffersNotes offer={selectedOffer} />
                  </CardContent>
                </Card>

                <Card className="min-h-28 flex justify-center items-center">
                  <CardContent className="pt-6">
                    <FlightPath offer={selectedOffer} />
                  </CardContent>
                </Card>

                <Card className="min-h-28 flex justify-center items-center">
                  <CardContent className="pt-6">
                    <OffersWeight offer={selectedOffer} />
                  </CardContent>
                </Card>

                <Card className="min-h-28 flex justify-center items-center">
                  <CardContent className="pt-6">
                    <OffersEtd offer={selectedOffer} />
                  </CardContent>
                </Card>

                <Card className="min-h-28 flex justify-center items-center">
                  <CardContent className="pt-6">
                    <OffersEta offer={selectedOffer} />
                  </CardContent>
                </Card>

                <Card className="min-h-28 flex justify-center items-center">
                  <CardContent className="pt-6">
                    <OffersAvailableWeight offer={selectedOffer} />
                  </CardContent>
                </Card>

                <Card className="min-h-28 flex justify-center items-center">
                  <CardContent className="pt-6">
                    <OffersPrice offer={selectedOffer} />
                  </CardContent>
                </Card>
              </div>

              <div className="flex flex-col gap-4">
                <label className="font-bold">Enter Weight (Kg):</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md px-3 py-2 w-full"
                  value={selectedWeight === 0 ? '' : selectedWeight}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) {
                      const numericValue = Number(value);
                      if (numericValue <= (selectedOffer?.availableWeight || 0)) {
                        setSelectedWeight(numericValue);
                      }
                    }
                  }}
                  placeholder={`Enter weight (max ${selectedOffer?.availableWeight || 0} Kg)`}
                />
                <Typography className="text-lg font-bold text-blue-600">
                  Total Price: ${(
                    selectedWeight * parseFloat(formatNumber(selectedOffer.price || 0))
                  ).toFixed(2)}
                </Typography>
              </div>

              <Button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-4"
                onClick={() => { }}
              >
                Book
              </Button>
            </div>
          )}
        </Drawer>
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
