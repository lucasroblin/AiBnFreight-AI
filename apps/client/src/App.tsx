import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import Drawer from '@mui/joy/Drawer';
import { useCallback, useEffect, useState } from 'react';
import * as api from '@/lib/api-client';
import { Offer } from '@/lib/api-client';
import { FlightPath } from './components/FlightPath';
import { OffersNotes } from './components/OffersNotes';
import { Card, CardContent } from './components/ui/card';
import { OffersWeight } from './components/OffersWeight';
import { OffersEtd } from './components/OffersETD';
import { OffersEta } from './components/OffersETA';
import { OffersAvailableWeight } from './components/OffersAvailableWeight';
import { OffersPrice } from './components/OffersPrice';
import { FloatButton } from 'antd';
import { MenuBar } from './components/MenuBar';
import { SearchBar } from './components/SearchBar';
import ModalComponent from './components/ModalComponent';
import SuccessModalComponent from './components/SuccessModalComponent';

export default function App() {
  const [data, setData] = useState<Offer[]>([]);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [drawerState, setDrawerState] = useState(false);


  async function getData() {
    const data = await api.getOffers();
    setData(data);
  }

  useEffect(() => {
    getData();
  }, []);

  const onOfferSelect = useCallback((offer: Offer) => {
    setSelectedOffer(offer);
    setDrawerState(true);
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
    setDrawerState(false);
  };
  const handleOk = () => {
    setIsModalOpen(false);

  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const showSuccessModal = () => {
    setIsSuccessModalOpen(true)
  }

  const handleSuccessOk = () => {
    setIsSuccessModalOpen(false);
  };

  const isTrue = () => { //Condition passed to modalComponent
    showSuccessModal()
  }



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

        <SearchBar></SearchBar>

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
          {data
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

              <Button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-4"
                onClick={() => {
                  showModal()
                  setDrawerState(false)
                }}
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
      {

        <SuccessModalComponent isSuccessModalOpen={isSuccessModalOpen} handleSuccessOk={handleSuccessOk} handleCancel={handleCancel} />

      }

    </>
  );
}
