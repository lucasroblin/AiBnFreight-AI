import { Offer } from '@/lib/api-client'

interface PriceProps {
    offer: Offer
}

export function OffersPrice({ offer }: PriceProps) {
    return (
        <div>
            <p className='font-bold text-sm'>Price :</p>
            <div className='flex justify-center'>
                <p className='text-2xl'>{formatNumber(offer.price)} $/Kg</p>
            </div>
        </div>
    )
}

function formatNumber(num: number): string {
    const numStr = num.toString();

    if (numStr.length === 3 || numStr.length === 4) {
        return (num / 100).toFixed(2)
    }

    return numStr
}