import { Stack, Typography } from '@mui/joy'
import { Offer } from '../../lib/api-client'
import { IoAirplane } from 'react-icons/io5'

interface FlightPathProps {
  offer: Offer
}

export function FlightPath({ offer }: FlightPathProps) {
  return (
    <Stack direction={'row'} gap={1}>
      <Typography textAlign={'left'}>{offer.departureId}</Typography>
      <div className="flex items-center">
        <IoAirplane />
      </div>
      <Typography textAlign={'left'}>{offer.arrivalId}</Typography>
    </Stack>
  )
}
