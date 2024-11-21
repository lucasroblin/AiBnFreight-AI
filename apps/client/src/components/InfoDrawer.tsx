import Drawer from '@mui/joy/Drawer'
import { OffersNotes } from './OffersNotes'
import { Card, CardContent } from './ui/card'
import { OffersWeight } from './OffersWeight'
import { OffersEtd } from './OffersETD'
import { OffersEta } from './OffersETA'
import { OffersAvailableWeight } from './OffersAvailableWeight'
import { OffersPrice } from './OffersPrice'
import { FlightPath } from './FlightPath'
import Typography from '@mui/joy/Typography'
import Button from '@mui/joy/Button'
import { Offer } from '@/lib/api-client'
import { BaseSyntheticEvent } from 'react'


function formatNumber(num: number): string {
    const numStr = num.toString()

    if (numStr.length === 3 || numStr.length === 4) {
        return (num / 100).toFixed(2)
    }

    return numStr
}



export default function InfoDrawer({
    drawerState,
    setDrawerState,
    selectedOffer,
    selectedWeight,
    setSelectedWeight
}: {
    drawerState: boolean,
    setDrawerState: (a: boolean) => void,
    selectedOffer: Offer | null,
    selectedWeight: number,
    setSelectedWeight: (a: number) => void
}) {



    function sendBooking(event: BaseSyntheticEvent) {
        event.preventDefault();
        // setDrawerState(false) What do i do when it's okay ?
        console.log('Entering sendBooking');

        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        const raw = JSON.stringify({
            weight: selectedWeight,
            offerId: selectedOffer?.id
        });

        const requestOptions: RequestInit = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };

        fetch('http://localhost:8080/bookings', requestOptions)
            .then((response) => {
                if (response.status === 201) {
                    // Wtf do i do ?
                }
                return response.json()
            })
            .then((result) => console.log(result))
            .catch((error) => console.error('error', error));

    }

    return (
        <>
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
                            onClick={sendBooking}
                        >
                            Book
                        </Button>
                    </div>
                )}
            </Drawer>
        </>
    )
}