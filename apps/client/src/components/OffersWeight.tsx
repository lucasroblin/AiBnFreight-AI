import { Offer } from '@/lib/api-client'

interface WeightProps {
    offer: Offer
}

export function OffersWeight({ offer }: WeightProps) {
    return (
        <div>
            <p className='font-bold text-sm'>Offer's Weight :</p>
            <div className='flex justify-center'>
                <p className='text-2xl'>{offer.weight} Kg</p>
            </div>
        </div>
    )
}