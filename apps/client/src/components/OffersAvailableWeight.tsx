import { Offer } from '@/lib/api-client'

interface AvailableWeightProps {
    offer: Offer
}

export function OffersAvailableWeight({ offer }: AvailableWeightProps) {
    return (
        <div>
            <p className='font-bold text-sm'>Available Weight :</p>
            <div className='flex justify-center'>
                <p className='text-2xl'>{offer.availableWeight} Kg</p>
            </div>
        </div>
    )
}