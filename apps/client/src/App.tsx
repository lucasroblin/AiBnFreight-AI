import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import { VariantProp, ColorPaletteProp } from '@mui/joy/styles';
import { IoAirplane } from 'react-icons/io5';
import { Row } from 'antd';
import Drawer from '@mui/joy/Drawer';
import { useEffect, useState } from 'react';
import { boxShadow, fontWeight } from '@mui/system';



export default function App() {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    async function getData() {
        const data = await (await fetch("http://localhost:8080/offers")).json()
        setData(data.data)
    }

    useEffect(() => {
        getData()
        setLoading(false)
    }, [])

    const [drawerState, setDrawerState] = useState(false)
    if (loading) {
        return <p>Loading ...</p>
    }
    return (
        <>
            <Box sx={{
                p: 2,
                height: "100vh"
            }}>
                <Stack direction={"column"} spacing={2}>
                    {data.filter(x => x.bookable).map(myObj => {
                        return (
                            < Card variant={'outlined'} color={'neutral'} sx={{ maxWidth: '800px', '&:hover': { background: 'white', scale: 1.025 } }} onClick={() => setDrawerState(true)}>
                                <Stack
                                    direction="row"
                                    spacing={2}
                                    sx={{
                                        justifyContent: "space-around",
                                        alignItems: "center",
                                    }}
                                >
                                    <Stack direction={"row"} gap={1}>
                                        <Typography textAlign={'left'}>{myObj.departureId}</Typography>
                                        <div className="flex items-center"> <IoAirplane /> </div>
                                        <Typography textAlign={'left'}>{myObj.arrivalId}</Typography>
                                    </Stack>
                                    <Typography textAlign={'left'}>{myObj.weight} Kg</Typography>
                                    <Typography textAlign={'left'}>{new Date(myObj.etd).toLocaleDateString()}</Typography>
                                    <Typography textAlign={'left'}>{new Date(myObj.eta).toLocaleDateString()}</Typography>
                                    <Typography textAlign={'left'}>{myObj.price}€/Kg</Typography>
                                    <Typography textAlign={'left'}>{myObj.availableWeight}Kg</Typography>
                                    <Stack direction={"row"} spacing={0.5}>
                                        <Button color='neutral' onClick={() => setDrawerState(true)}>Open</Button>
                                        <Button disabled={!myObj.bookable}>Book</Button>

                                    </Stack>
                                </Stack>
                            </Card>
                        )
                    })
                    }
                </Stack>

                <Drawer size='md' anchor={"right"} open={drawerState} onClose={() => setDrawerState(false)} >
                    <Typography sx={{ fontWeight: 'bold' }}>Notes :</Typography>
                </Drawer>
            </Box >
        </>

    )
}