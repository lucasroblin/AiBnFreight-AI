import { Offer } from '@/lib/api-client'

interface EtaProps {
    offer: Offer
}

export function OffersEta({ offer }: EtaProps) {
    return (
        <div className='flex flex-col'>
            <p className='font-bold text-sm'>Estimated Time of Arrival :</p>
            <div className='flex justify-center text-2xl '>
                <p>{(offer.eta.toLocaleDateString()).toString()}</p>
            </div>
        </div>
    )
}