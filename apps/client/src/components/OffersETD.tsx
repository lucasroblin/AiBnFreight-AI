import { Offer } from '@/lib/api-client'

interface EtdProps {
    offer: Offer
}

export function OffersEtd({ offer }: EtdProps) {
    return (
        <div>
            <p className='font-bold text-sm'>Estimated Time of Departure :</p>
            <div className='flex justify-center text-2xl'>
                <p>{(offer.etd.toLocaleDateString()).toString()}</p>
            </div>
        </div>
    )
}